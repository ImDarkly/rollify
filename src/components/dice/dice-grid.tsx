import { AnimatePresence } from "framer-motion";
import Dice from "./dice";
import useDiceStore from "@/zustand/diceStore";
import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { useEffect, useState } from "react";

const DiceGrid = () => {
  const { dice, setDice } = useDiceStore();
  const [isTouch, setIsTouch] = useState(false);

  const isTouchDevice = () => {
    return window.matchMedia("(pointer: coarse)").matches;
  };

  const sensor = useSensor(isTouch ? TouchSensor : PointerSensor, {
    activationConstraint: {
      distance: 10,
    },
  });

  const sensors = useSensors(sensor);

  useEffect(() => {
    setIsTouch(isTouchDevice());
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = dice.findIndex((d) => d.id === active.id);
      const newIndex = dice.findIndex((d) => d.id === over.id);
      setDice(arrayMove(dice, oldIndex, newIndex));
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragEnd={handleDragEnd}
      onDragStart={(e) => console.log("drag start", e)}
      onDragMove={(e) => console.log("drag move", e.delta)}
    >
      <div className="flex-grow w-full flex flex-wrap content-center justify-center items-center gap-2 p-4 bg-card rounded-xl">
        <AnimatePresence>
          <SortableContext items={dice.map((d) => d.id)}>
            {dice.map((d) => (
              <Dice key={d.id} dice={d} />
            ))}
          </SortableContext>
        </AnimatePresence>
      </div>
    </DndContext>
  );
};

export default DiceGrid;
