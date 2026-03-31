import { ModeToggle } from "../mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import DiceForm from "./dice-form";

export default function DiceSidebar() {
  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Create</SidebarGroupLabel>
          <div className="px-2">
            <DiceForm />
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Collection</SidebarGroupLabel>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
