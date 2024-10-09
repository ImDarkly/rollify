import BottomBar from "./components/bottom-bar";
import { ThemeProvider, useTheme } from "@/components/theme-provider"; // Import your own useTheme hook
import TopBar from "./components/top-bar";
import { Toaster } from "./components/ui/toaster";
import DiceGrid from "./components/dice-grid";
import { TooltipProvider } from "./components/ui/tooltip";
import FallingLeaves from "./components/falling-leaves";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <TooltipProvider delayDuration={300}>
                <MainContent />
            </TooltipProvider>
        </ThemeProvider>
    );
}

function MainContent() {
    const { theme } = useTheme();

    return (
        <div className="h-svh flex flex-col items-center">
            <TopBar />
            <div className="flex flex-grow items-center">
                <DiceGrid />
            </div>
            <BottomBar />
            <Toaster />
            {theme === "pumpkin" ? <FallingLeaves /> : null}
        </div>
    );
}

export default App;
