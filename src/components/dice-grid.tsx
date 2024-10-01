import { AnimatePresence, motion } from "framer-motion";
import AddDice from "./add-dice";
import Dice from "./dice";
import useDiceStore from "@/zustand/diceStore";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import {
    DndContext,
    PointerSensor,
    TouchSensor,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const DiceGrid = () => {
    const dice = useDiceStore((state) => state.dice);
    const [isTouch, setIsTouch] = useState(false);
    const diceArray = Object.entries(useDiceStore.getState().dice).map(
        ([id, dice]) => ({
            id: Number(id),
            ...dice,
        })
    );

    const isTouchDevice = () => {
        return window.matchMedia("(pointer: coarse)").matches;
    };

    const sensor = useSensor(isTouch ? TouchSensor : PointerSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    useEffect(() => {
        setIsTouch(isTouchDevice());
    }, []);

    return (
        <DndContext sensors={useSensors(sensor)}>
            <div className="flex-grow flex flex-wrap content-center justify-center items-center content-centergap-2 gap-2 max-w-screen-lg p-4">
                <AnimatePresence>
                    <SortableContext items={diceArray}>
                        {Object.keys(dice).map((key) => {
                            const diceId = parseInt(key, 10);
                            const {
                                min,
                                max,
                                value,
                                multiplier,
                                isLocked,
                                title,
                            } = dice[diceId];
                            return (
                                <motion.div
                                    key={diceId}
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
                    </SortableContext>
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
        </DndContext>
    );
};

export default DiceGrid;
