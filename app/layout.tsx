import { AppSidebarWrapper } from "@/components/layout/app-sidebar-wrapper";
import { TopLoader } from "@/components/layout/top-loader";
import { Toaster } from "@/components/ui/sonner";
import { WEBSITE_TITLE } from "@/constants/website";
import { cn } from "@/helpers/cn";
import { GeistSans } from "geist/font/sans";
import { Metadata, Viewport } from "next";
import { ReactNode } from "react";
import "./globals.css";
import { Providers } from "./providers";
export const metadata: Metadata = {
  title: {
    default: WEBSITE_TITLE,
    template: `%s | ${WEBSITE_TITLE}`,
  },
};
export const viewport: Viewport = { maximumScale: 1 };
export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body
          className={cn("flex justify-center min-h-full", GeistSans.className)}
        >
          <Providers>
            <Toaster />
            <AppSidebarWrapper>
              <TopLoader />
              {children}
            </AppSidebarWrapper>
          </Providers>
        </body>
      </html>
    </>
  );
}
