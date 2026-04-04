import { DieType } from "@/lib/types";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import DiceListItemActions from "./dice-list-item-actions";
import DiceListItemPreview from "./dice-list-item-preview";
import { useState } from "react";
import ResponsiveEditDice from "./responsive-edit-dice";

interface DiceListItemProps {
  die: DieType;
}

export default function DiceListItem({ die }: DiceListItemProps) {
  const [editOpen, setEditOpen] = useState(false);

  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <DiceListItemPreview
          isLocked={die.isLocked}
          value={die.value}
          hue={die.hue}
        />
        {die.config.title}
      </SidebarMenuButton>
      <DiceListItemActions die={die} onEdit={() => setEditOpen(true)} />
      <ResponsiveEditDice
        die={die}
        open={editOpen}
        onClose={() => setEditOpen(false)}
      />
    </SidebarMenuItem>
  );
}
