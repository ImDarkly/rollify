import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

const TopBar = () => {
    return (
        <div className="w-full h-24 flex flex-row justify-center absolute items-center">
            <motion.div
                className="absolute left-4 top-7"
                whileHover={{
                    opacity: 1,
                }}
                initial={{
                    opacity: 0,
                }}
            >
                <Button variant="ghost">
                    <a
                        href="https://github.com/ImDarkly/roller"
                        target="_blank"
                    >
                        View Source Code
                    </a>
                </Button>
            </motion.div>
            <ModeToggle />
        </div>
    );
};

export default TopBar;
