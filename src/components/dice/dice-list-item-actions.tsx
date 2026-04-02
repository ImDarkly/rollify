import { DieType } from "@/lib/types";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { SidebarMenuAction } from "../ui/sidebar";
import { MoreHorizontal } from "lucide-react";
import useDiceStore from "@/zustand/diceStore";

interface DiceListItemActionsProps {
  die: DieType;
}

export default function DiceListItemActions({ die }: DiceListItemActionsProps) {
  const { updateDice, removeDice } = useDiceStore((state) => ({
    updateDice: state.updateDice,
    removeDice: state.removeDice,
  }));

  const handleLockDice = () => {
    updateDice(die.id, { isLocked: !die.isLocked });
  };

  const handleEditDice = () => {};

  const handleDeleteDice = () => {
    removeDice(die.id);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuAction showOnHover>
          <MoreHorizontal />
        </SidebarMenuAction>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleLockDice}>
          {die.isLocked ? "Unlock" : "Lock"}
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleEditDice}>Edit</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleDeleteDice}>Delete</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
