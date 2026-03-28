import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { DiceType } from "@/lib/types";
import { easeOut } from "framer-motion";
import MotionNumber from "motion-number";

interface DiceProps {
  dice: DiceType;
}

const Dice = ({ dice }: DiceProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: dice.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 1000 : "auto",
    position: "relative" as const,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex select-none justify-center items-center flex-col z-50 size-16 bg-secondary rounded-2xl"
    >
      <p className="text-xs text-secondary-foreground/60 whitespace-normal text-center">
        {dice.config.title}
      </p>
      <p className="text-xl font-bold">
        <MotionNumber
          value={dice.value}
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
  );
};

export default Dice;
