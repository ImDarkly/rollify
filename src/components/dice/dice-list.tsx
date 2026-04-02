import useDiceStore from "@/zustand/diceStore";
import DiceListItem from "./dice-list-item";
import { SidebarMenu } from "../ui/sidebar";

export default function DiceList() {
  const { dice } = useDiceStore((state) => ({
    dice: state.dice,
  }));

  const diceItems = dice.map((die) => <DiceListItem key={die.id} die={die} />);

  return <SidebarMenu>{diceItems}</SidebarMenu>;
}
