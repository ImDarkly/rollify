import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useLongPress } from "@uidotdev/usehooks";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import MotionNumber from "motion-number";
import { easeOut } from "framer-motion";
import useDiceStore from "@/zustand/diceStore";

interface DiceProps {
    id: number;
    min: number;
    max: number;
    value: number;
    isLocked: boolean;
    title: string;
}

const Dice = ({ id, min, max, value, isLocked, title }: DiceProps) => {
    const toggleLock = useDiceStore((state) => state.toggleLock);
    const removeDice = useDiceStore((state) => state.removeDice);
    const { toast } = useToast();
    const { undo } = useDiceStore.temporal.getState();

    const longPressProps = useLongPress(
        () => {
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
        },
        {
            threshold: 300,
        }
    );

    const handleClick = (id: number) => {
        toggleLock(id);
    };

    return (
        <motion.div
            animate={{ opacity: isLocked ? 0.3 : 1 }}
            transition={{ duration: 0.3 }}
        >
            <Button
                onClick={() => handleClick(id)}
                size={"icon"}
                variant={"secondary"}
                className="size-16 relative overflow-clip"
                {...longPressProps}
            >
                <div className="flex justify-center items-center flex-col">
                    <p className="text-xs text-muted-foreground whitespace-normal overflow-hidden text-center">
                        {title}
                    </p>
                    <p className="text-xl font-bold select-none">
                        <MotionNumber
                            value={value}
                            format={{ notation: "compact" }}
                            transition={{
                                layout: {
                                    type: "spring",
                                    duration: 0.3,
                                    bounce: 0,
                                },
                                y: {
                                    type: "spring",
                                    duration: 1.5,
                                    bounce: 0.25,
                                },
                                opacity: {
                                    duration: 1,
                                    ease: easeOut,
                                    times: [0, 0.3],
                                },
                            }}
                        />
                    </p>
                </div>
            </Button>
        </motion.div>
    );
};

export default Dice;
