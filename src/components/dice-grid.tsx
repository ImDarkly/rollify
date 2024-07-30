import { AnimatePresence, motion } from "framer-motion";
import AddDice from "./add-dice";
import Dice from "./dice";
import useDiceStore from "@/zustand/store";

const DiceGrid = () => {
    const dice = useDiceStore((state) => state.dice);

    return (
        <div className="flex-grow flex flex-wrap justify-center items-center content-center gap-2 overflow-hidden max-w-screen-lg p-4">
            <AnimatePresence>
                {Object.keys(dice).map((key) => {
                    const diceId = parseInt(key, 10);
                    const { min, max, value, isLocked } = dice[diceId];
                    return (
                        <motion.div
                            key={diceId}
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.1 }}
                        >
                            <Dice
                                id={diceId}
                                min={min}
                                max={max}
                                value={value}
                                isLocked={isLocked}
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
                    <AddDice />
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default DiceGrid;
