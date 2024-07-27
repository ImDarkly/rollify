import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Icon } from "@iconify/react";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();

    const handleToggle = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    return (
        <Button variant="ghost" size="icon" onClick={handleToggle}>
            <Icon icon="ri:dice-line" className="size-6" />
        </Button>
    );
}
