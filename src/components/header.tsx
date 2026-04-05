import useDiceStore from "@/zustand/diceStore";
import { Button } from "./ui/button";
import { SidebarTrigger } from "./ui/sidebar";
import { rollDice } from "@/lib/dice";

const Header = () => {
  const { dice, updateDice } = useDiceStore((state) => ({
    dice: state.dice,
    updateDice: state.updateDice,
  }));

  const rollAll = () => {
    dice.forEach((die) => {
      if (!die.isLocked) {
        updateDice(die.id, { value: rollDice(die) });
      }
    });
  };

  return (
    <div className="w-full h-16 flex flex-row justify-between absolute items-center px-4">
      <SidebarTrigger className="-ml-1" />
      <Button onClick={rollAll}>Roll</Button>
    </div>
  );
};

export default Header;
