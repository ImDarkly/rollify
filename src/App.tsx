import "./App.css";
import AddDice from "./components/add-dice";
import BottomBar from "./components/bottom-bar";
import Dice from "./components/dice";
import useDiceStore from "@/zustand/store";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "./components/top-bar";

function App() {
    const dice = useDiceStore((state) => state.dice);

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="h-svh flex flex-col items-center">
                <TopBar />
                <div className="flex-grow flex flex-wrap justify-center items-center content-center gap-2 overflow-auto max-w-screen-lg p-4">
                    {Object.keys(dice).map((key) => {
                        const diceId = parseInt(key, 10); // Convert key to a number
                        const { min, max, value } = dice[diceId];
                        return (
                            <Dice
                                key={diceId}
                                id={diceId}
                                min={min}
                                max={max}
                                value={value}
                            />
                        );
                    })}
                    <AddDice />
                </div>
                <BottomBar />
            </div>
        </ThemeProvider>
    );
}

export default App;
