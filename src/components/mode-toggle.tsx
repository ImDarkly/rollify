import { Button } from "@/components/ui/button";
import { useTheme } from "@/components/theme-provider";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";

export function ModeToggle() {
    const { theme, setTheme } = useTheme();
    const MotionButton = motion(Button);

    const handleToggle = () => {
        if (theme === "light") {
            setTheme("dark");
        } else {
            setTheme("light");
        }
    };

    const diceMotion = {
        rest: {
            rotate: 0,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 250,
                damping: 20,
                duration: 1,
            },
        },
        tap: {
            rotate: 180,
            scale: 0,
        },
    };

    return (
        <MotionButton
            variant="ghost"
            size="icon"
            onClick={handleToggle}
            initial="tap"
            whileTap="tap"
            animate="rest"
        >
            <motion.div variants={diceMotion}>
                <Icon icon="ri:dice-line" className="size-6" />
            </motion.div>
        </MotionButton>
    );
}