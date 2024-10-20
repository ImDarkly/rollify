import BottomBar from "./components/bottom-bar";
import { ThemeProvider, useTheme } from "@/components/theme-provider";
import TopBar from "./components/top-bar";
import { Toaster } from "./components/ui/toaster";
import DiceGrid from "./components/dice-grid";
import { TooltipProvider } from "./components/ui/tooltip";
import FallingLeaves from "./components/falling-leaves";
import { getDefaultTheme } from "./lib/utils";

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
  const { theme } = useTheme();

  return (
    <>
      <div className="h-svh flex flex-col items-center">
        <TopBar />
        <div className="flex flex-grow items-center">
          <DiceGrid />
        </div>
        <BottomBar />
        {theme === "pumpkin" && <FallingLeaves />}
      </div>
      <Toaster />
    </>
  );
}

export default App;
