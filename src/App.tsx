import BottomBar from "./components/bottom-bar";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "./components/top-bar";
import { Toaster } from "./components/ui/toaster";
import DiceGrid from "./components/dice-grid";
import { TooltipProvider } from "./components/ui/tooltip";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <TooltipProvider delayDuration={300}>
                <div className="h-svh flex flex-col  items-center">
                    <TopBar />
                    <div className="flex flex-grow items-center">
                        <DiceGrid />
                    </div>
                    <BottomBar />
                </div>
                <Toaster />
            </TooltipProvider>
        </ThemeProvider>
    );
}

export default App;
