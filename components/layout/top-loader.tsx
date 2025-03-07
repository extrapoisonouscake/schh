import NextTopLoader from "nextjs-toploader";
import resolveConfig from "tailwindcss/resolveConfig";
import tailwindConfig from "../../tailwind.config";

const fullConfig = resolveConfig(tailwindConfig);
const colors = fullConfig.theme?.colors;
const primaryColor = colors?.brand?.DEFAULT;
export function TopLoader() {
  return (
    <NextTopLoader
      zIndex={40}
      shadow={false}
      color={primaryColor}
      showSpinner={false}
    />
  );
}
