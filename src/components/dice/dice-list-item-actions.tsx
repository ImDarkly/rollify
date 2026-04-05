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
import { useState } from "react";
import { toast } from "sonner";

interface DiceListItemActionsProps {
  die: DieType;
  onEdit: () => void;
}

export default function DiceListItemActions({
  die,
  onEdit,
}: DiceListItemActionsProps) {
  const { updateDice, removeDice } = useDiceStore((state) => ({
    updateDice: state.updateDice,
    removeDice: state.removeDice,
  }));
  const [pendingEdit, setPendingEdit] = useState(false);
  const undo = useDiceStore.temporal.getState().undo;

  const handleLockDice = () => {
    updateDice(die.id, { isLocked: !die.isLocked });
  };

  const handleEditDice = () => setPendingEdit(true);

  const handleDeleteDice = () => {
    removeDice(die.id);
    toast.warning(`Deleted ${die.config.title}`, {
      action: {
        label: "Undo",
        onClick: () => undo(),
      },
    });
  };

  return (
    <DropdownMenu
      onOpenChange={(open) => {
        if (!open && pendingEdit) {
          setPendingEdit(false);
          onEdit();
        }
      }}
    >
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
