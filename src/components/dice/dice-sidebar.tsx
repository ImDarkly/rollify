import useDiceStore from "@/zustand/diceStore";
import AppFooterLinks from "../app-footer-links";
import { ModeToggle } from "../mode-toggle";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "../ui/sidebar";
import DiceForm from "./dice-form";
import DiceList from "./dice-list";

export default function DiceSidebar() {
  const { createDice } = useDiceStore((state) => ({
    createDice: state.createDice,
  }));

  return (
    <Sidebar variant="inset" collapsible="offcanvas">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <ModeToggle />
          </SidebarMenuItem>
        </SidebarMenu>
        <DiceForm onSubmit={(config) => createDice(config)} />
      </SidebarHeader>
      <SidebarContent className="overlay-scroll">
        <SidebarGroup>
          <SidebarGroupLabel>Collection</SidebarGroupLabel>
          <SidebarGroupContent>
            <DiceList />
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <AppFooterLinks />
      </SidebarFooter>
    </Sidebar>
  );
}
