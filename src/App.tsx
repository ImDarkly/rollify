import BottomBar from "./components/bottom-bar";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "./components/top-bar";
import { Toaster } from "./components/ui/toaster";
import DiceGrid from "./components/dice-grid";

function App() {
    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="h-svh flex flex-col items-center">
                <TopBar />
                <DiceGrid />
                <BottomBar />
            </div>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
