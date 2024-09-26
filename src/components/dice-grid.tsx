import { AnimatePresence, motion } from "framer-motion";
import AddDice from "./add-dice";
import Dice from "./dice";
import useDiceStore from "@/zustand/diceStore";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";

const DiceGrid = () => {
    const dice = useDiceStore((state) => state.dice);

    return (
        <div className="flex-grow flex flex-wrap content-center justify-center items-center content-centergap-2 gap-2 overflow-hidden max-w-screen-lg p-4">
            <AnimatePresence>
                {Object.keys(dice).map((key) => {
                    const diceId = parseInt(key, 10);
                    const { min, max, value, multiplier, isLocked, title } =
                        dice[diceId];
                    return (
                        <motion.div
                            className="overflow-hidden"
                            key={diceId}
                            layout
                            initial={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            animate={{
                                opacity: 1,
                                scale: 1,
                            }}
                            exit={{
                                opacity: 0,
                                scale: 0.8,
                            }}
                            transition={{
                                duration: 0.1,
                            }}
                        >
                            <Dice
                                id={diceId}
                                min={min}
                                max={max}
                                value={value}
                                multiplier={multiplier}
                                isLocked={isLocked}
                                title={title}
                            />
                        </motion.div>
                    );
                })}
                <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.1 }}
                >
                    <AddDice>
                        <Button
                            size={"icon"}
                            variant={"outline"}
                            className="size-16"
                        >
                            <Icon icon="heroicons:plus-16-solid" />
                        </Button>
                    </AddDice>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default DiceGrid;
