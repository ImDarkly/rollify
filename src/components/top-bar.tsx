import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import HaloweenModeSwitcher from "./halloween-mode-switcher";

const isProduction = import.meta.env.MODE === "production";
const version = __APP_VERSION__;

const TopBar = () => {
    return (
        <div className="w-full h-24 flex flex-row justify-center absolute items-center">
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
                    <p>{`${version}${isProduction ? "" : "dev"}`}</p>
                </TooltipContent>
            </Tooltip>
            <HaloweenModeSwitcher />
        </div>
    );
};

export default TopBar;
