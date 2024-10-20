import { Button } from "@/components/ui/button";
import { Theme, useTheme } from "@/components/theme-provider";
import { Icon } from "@iconify/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuRadioGroup,
} from "./ui/dropdown-menu";
import { Badge } from "./ui/badge";

export function ModeToggle() {
  const { theme, setTheme } = useTheme();
  const version = __APP_VERSION__;
  const isProduction = import.meta.env.MODE === "production";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Icon icon="ri:dice-line" className="size-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Switch Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup
          value={theme}
          onValueChange={(newTheme) => setTheme(newTheme as Theme)}
        >
          <DropdownMenuRadioItem value="light">Light</DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
          <DropdownMenuRadioItem className="gap-2" value="pumpkin">
            Pumpkin <Badge>New</Badge>
          </DropdownMenuRadioItem>
          <DropdownMenuRadioItem value="system">System</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSeparator />
        {/* Footer Section */}
        <div className="px-4 py-2 text-xs items-center flex flex-col">
          <a
            href="https://github.com/ImDarkly/rollify"
            className="hover:decoration-solid hover:underline  text-foreground/75 hover:text-foreground"
            target="_blank"
          >
            Rollify v{`${version}${isProduction ? null : "dev"}`}
          </a>
          <a
            href="https://github.com/ImDarkly"
            className="hover:decoration-solid hover:underline  text-foreground/75 hover:text-foreground"
            target="_blank"
          >
            by ImDarkly
          </a>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
