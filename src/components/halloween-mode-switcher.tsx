import { useTheme } from "./theme-provider";
import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

const HaloweenModeSwitcher = () => {
    const { theme, setTheme } = useTheme();
    const MotionButton = motion.create(Button);
    const [isHalloween, setIsHalloween] = useState(theme === "pumpkin");

    useEffect(() => {
        setIsHalloween(theme === "pumpkin");
    }, [theme]);

    const handleToggle = () => {
        if (isHalloween) {
            setTheme("dark");
        } else {
            setTheme("pumpkin");
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
        <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
                <MotionButton
                    variant="ghost"
                    size="icon"
                    onClick={handleToggle}
                    initial="tap"
                    whileTap="tap"
                    animate="rest"
                >
                    <motion.div variants={diceMotion}>
                        <Icon
                            icon={`mingcute:pumpkin-lantern-${
                                isHalloween ? "fill" : "line"
                            }`}
                            className="size-6 "
                        />
                    </motion.div>
                </MotionButton>
            </TooltipTrigger>
            <TooltipContent>
                <p>Trick or Treat</p>
            </TooltipContent>
        </Tooltip>
    );
};

export default HaloweenModeSwitcher;
