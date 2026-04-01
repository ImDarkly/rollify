import BottomBar from "./components/bottom-bar";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import TopBar from "./components/header";
import { Toaster } from "./components/ui/toaster";
import DiceGrid from "./components/dice/dice-grid";
import { TooltipProvider } from "./components/ui/tooltip";
import { getDefaultTheme } from "./lib/utils";
import DiceSidebar from "./components/dice/dice-sidebar";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";

function App() {
  const defaultTheme = getDefaultTheme();

  return (
    <ThemeProvider defaultTheme={defaultTheme} storageKey="vite-ui-theme">
      <TooltipProvider delayDuration={300}>
        <MainContent />
      </TooltipProvider>
    </ThemeProvider>
  );
}

function MainContent() {
  return (
    <>
      <SidebarProvider defaultOpen={false}>
        <DiceSidebar />
        <SidebarInset>
          <TopBar />
          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <DiceGrid />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </>
  );
}

export default App;
