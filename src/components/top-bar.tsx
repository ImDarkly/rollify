import { motion } from "framer-motion";
import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "./ui/tooltip";

const version = __APP_VERSION__;

const TopBar = () => {
    return (
        <div className="w-full h-24 flex flex-row justify-center absolute items-center">
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
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
                    </TooltipTrigger>
                    <TooltipContent>
                        <p>{version}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <ModeToggle />
        </div>
    );
};

export default TopBar;
