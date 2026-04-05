const version = __APP_VERSION__;
const isProduction = import.meta.env.MODE === "production";

export default function AppFooterLinks() {
  return (
    <div className="px-4 py-2 text-xs items-center flex flex-col">
      <a
        href="https://github.com/ImDarkly/rollify"
        className="hover:decoration-solid hover:underline  text-foreground/75 hover:text-foreground"
        target="_blank"
      >
        Rollify v{`${version}${isProduction ? "" : "dev"}`}
      </a>
      <a
        href="https://github.com/ImDarkly"
        className="hover:decoration-solid hover:underline  text-foreground/75 hover:text-foreground"
        target="_blank"
      >
        by ImDarkly
      </a>
    </div>
  );
}
