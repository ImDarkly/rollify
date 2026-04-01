import { DieType } from "@/lib/types";
import { SidebarMenuButton, SidebarMenuItem } from "../ui/sidebar";

interface DiceListItemProps {
  die: DieType;
}

export default function DiceListItem({ die }: DiceListItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>{die.config.title}</SidebarMenuButton>
    </SidebarMenuItem>
  );
}
