import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { useToast } from "./ui/use-toast";
import { ToastAction } from "./ui/toast";
import MotionNumber from "motion-number";
import { easeOut } from "framer-motion";
import useDiceStore from "@/zustand/diceStore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Icon } from "@iconify/react/dist/iconify.js";
import UpdateDice from "./update-dice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useRef, useState } from "react";

interface DiceProps {
  id: number;
  min: number;
  max: number;
  value: number;
  multiplier: number;
  isLocked: boolean;
  title: string;
}

const Dice = ({
  id,
  min,
  max,
  value,
  multiplier,
  isLocked,
  title,
}: DiceProps) => {
    const { toggleLock, removeDice } = useDiceStore();
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const { toast } = useToast();
    const { undo } = useDiceStore.temporal.getState();
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        zIndex: isDragging ? 1000 : "auto",
        position: "relative" as const,
    };

  const handleRemove = (id: number) => {
    removeDice(id);
    toast({
      title: "Dice Removed",
      description: `Dice with value ${value} and range ${min}-${max} ${
        multiplier > 1 ? `×${multiplier}` : ""
      } has been removed.`,
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

    const handleOpenChange = (open: boolean) => {
        if (!isDragging) {
            if (open) {
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
                timeoutRef.current = setTimeout(() => setIsOpen(open), 200);
            } else {
                setIsOpen(false);
                if (timeoutRef.current) clearTimeout(timeoutRef.current);
            }
        } else {
            setIsOpen(false);
        }
    };

    useEffect(() => {
        if (isDragging) {
            setIsOpen(false);
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        }
    }, [isDragging]);

    return (
        <DropdownMenu open={isOpen} onOpenChange={handleOpenChange}>
            <DropdownMenuTrigger asChild>
                <motion.div
                    animate={{ opacity: isLocked ? 0.3 : 1 }}
                    transition={{ duration: 0.3 }}
                    ref={setNodeRef}
                    style={style}
                    {...attributes}
                    {...listeners}
                    tabIndex={undefined}
                >
                    <Button
                        size={"icon"}
                        variant={"secondary"}
                        className={`size-16 relative bg-secondary/80 hover:bg-secondary ${
                            isOpen ? "bg-secondary" : ""
                        } ${
                            isDragging
                                ? "bg-secondary z-50 ring-accent ring-2"
                                : ""
                        }`}
                    >
                        <div className="flex justify-center items-center flex-col z-50">
                            <p className="text-xs text-secondary-foreground/60 whitespace-normal text-center">
                                {title}
                            </p>
                            <p className="text-xl font-bold select-none">
                                <MotionNumber
                                    value={value}
                                    format={{ notation: "compact" }}
                                    transition={{
                                        layout: {
                                            type: "spring",
                                            duration: isDragging ? 0 : 0.3,
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
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>Manage</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    onSelect={(e) => {
                        e.preventDefault();
                    }}
                    className="p-0"
                >
                    <UpdateDice diceId={id}>
                        <div className="flex items-center gap-2 p-2 flex-grow">
                            <Icon icon="heroicons:pencil-square-16-solid" />
                            Edit
                        </div>
                    </UpdateDice>
                </DropdownMenuItem>
                <DropdownMenuItem
                    onSelect={() => toggleLock(id)}
                    className="gap-2"
                >
                    {isLocked ? (
                        <>
                            <Icon icon="heroicons:lock-open-16-solid" />
                            <p>Unlock</p>
                        </>
                    ) : (
                        <>
                            <Icon icon="heroicons:lock-closed-20-solid" />
                            <p>Lock</p>
                        </>
                    )}
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 focus:bg-red-600/25 focus:text-red-600 gap-2"
                    onSelect={() => handleRemove(id)}
                >
                    <Icon icon="heroicons:trash-20-solid" />
                    <p>Remove</p>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default Dice;
