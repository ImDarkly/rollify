import useDiceStore from "@/zustand/store";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useHistoryState } from "@uidotdev/usehooks";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";

type DiceProps = {
    id: number;
    min: number;
    max: number;
    value: number;
    isLocked: boolean;
};

const Dice = ({ id, min, max, value, isLocked }: DiceProps) => {
    const toggleLock = useDiceStore((state) => state.toggleLock);
    const removeDice = useDiceStore((state) => state.removeDice);
    const { toast } = useToast();
    const { undo } = useDiceStore.temporal.getState();

    const handleClick = (id: number) => {
        removeDice(id);
        toast({
            title: "Dice Removed",
            description: `Dice with value ${value} and range ${min}-${max} has been removed.`,
            action: (
                <ToastAction
                    altText="Undo"
                    onClick={() => {
                        undo();
                    }}
                >
                    Undo
                </ToastAction>
            ),
        });
    };

    return (
        <Button
            onClick={() => handleClick(id)}
            size={"icon"}
            variant={"secondary"}
            className="size-16 relative overflow-clip"
        >
            <div>
                <p className="text-xs">{`${min}-${max}`}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
            <AnimatePresence>
                {isLocked && (
                    <motion.div
                        key="lock-icon"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.1 }}
                        className="absolute bg-secondary h-full w-full flex justify-center items-center backdrop-blur-sm"
                    >
                        <Icon icon="heroicons:lock-closed-16-solid" />
                    </motion.div>
                )}
            </AnimatePresence>
        </Button>
    );
};

export default Dice;
