import { ModeToggle } from "../mode-toggle";
import {
  Sidebar,
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
            <span className="text-base font-semibold">Rollify</span>
          </SidebarMenuItem>
        </SidebarMenu>
        <DiceForm />
      </SidebarHeader>
    </Sidebar>
  );
}
