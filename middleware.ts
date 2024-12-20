import { decodeJwt, UnsecuredJWT } from "jose";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { NextRequest, NextResponse } from "next/server";
import { LoginSchema, loginSchema } from "./app/login/validation";
import {
  COOKIE_MAX_AGE,
  SESSION_TTL,
  shouldSecureCookies,
} from "./constants/auth";
import {
  MYED_AUTHENTICATION_COOKIES_NAMES,
  MYED_SESSION_COOKIE_NAME,
} from "./constants/myed";
import { getFullCookieName } from "./helpers/getFullCookieName";
import { isUserAuthenticated } from "./helpers/isUserAuthenticated";
import { MyEdCookieStore } from "./helpers/MyEdCookieStore";
import {
  deleteSessionAndLogOut,
  fetchAuthCookiesAndUserID,
} from "./lib/auth/helpers";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const cookieStore = new MyEdCookieStore(response.cookies);
  const isAuthenticated = isUserAuthenticated(request.cookies);
  const isOnLoginPage = request.nextUrl.pathname.startsWith("/login");
  if (isAuthenticated) {
    if (isOnLoginPage) {
      return Response.redirect(new URL("/", request.url));
    } else {
      if (
        !isValidSession(
          request.cookies.get(getFullCookieName(MYED_SESSION_COOKIE_NAME))
        )
      ) {
        const formData = {
          username: request.cookies.get(getFullCookieName("username"))?.value,
          password: request.cookies.get(getFullCookieName("password"))?.value,
        } as LoginSchema;

        try {
          loginSchema.parse(formData);
          const cookieStore = new MyEdCookieStore(response.cookies);

          for (const name of MYED_AUTHENTICATION_COOKIES_NAMES) {
            cookieStore.delete(name);
          }

          const { cookies: cookiesToAdd, userID } =
            await fetchAuthCookiesAndUserID(
              formData.username,
              formData.password
            );
          for (const entry of cookiesToAdd) {
            const name = entry[0];
            let value = entry[1];
            if (name === MYED_SESSION_COOKIE_NAME) {
              value = new UnsecuredJWT({ session: value, userID })
                .setIssuedAt()
                .setExpirationTime(SESSION_TTL)
                .encode();
            }
            cookieStore.set(name, value || "", {
              secure: shouldSecureCookies,
              httpOnly: true,
              maxAge: COOKIE_MAX_AGE,
            });
          }
        } catch (e) {
          await deleteSessionAndLogOut(response.cookies);
        }
      }
    }
  } else {
    if (!isOnLoginPage) {
      return Response.redirect(new URL("/login", request.url));
    }
  }
  return response;
}
function isValidSession(session?: RequestCookie) {
  if (!session) return false;
  try {
    const decodedToken = decodeJwt(session.value);

    return !decodedToken.exp || (decodedToken.exp - 10) * 1000 > Date.now();
  } catch {
    return false;
  }
}
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|public).*)"],
};
