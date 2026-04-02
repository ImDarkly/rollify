import { DieType } from "@/lib/types";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";
import DiceListItemActions from "./dice-list-item-actions";
import DiceListItemPreview from "./dice-list-item-preview";

interface DiceListItemProps {
  die: DieType;
}

export default function DiceListItem({ die }: DiceListItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        <DiceListItemPreview value={die.value} hue={die.hue} />
        {die.config.title}
      </SidebarMenuButton>
      <DiceListItemActions die={die} />
    </SidebarMenuItem>
  );
}
