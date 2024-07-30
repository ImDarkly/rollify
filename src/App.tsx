import "./App.css";
import AddDice from "./components/add-dice";
import BottomBar from "./components/bottom-bar";
import Dice from "./components/dice";
import useDiceStore from "@/zustand/store";
import { ThemeProvider } from "@/components/theme-provider";
import TopBar from "./components/top-bar";
import { AnimatePresence, motion } from "framer-motion";
import { Toaster } from "./components/ui/toaster";

function App() {
    const dice = useDiceStore((state) => state.dice);

    return (
        <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <div className="h-svh flex flex-col items-center">
                <TopBar />
                <div className="flex-grow flex flex-wrap justify-center items-center content-center gap-2 overflow-hidden max-w-screen-lg p-4">
                    <AnimatePresence>
                        {Object.keys(dice).map((key) => {
                            const diceId = parseInt(key, 10); // Convert key to a number
                            const { min, max, value, isLocked } = dice[diceId];
                            return (
                                <motion.div
                                    key={diceId}
                                    layout
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    transition={{ duration: 0.1 }}
                                >
                                    <Dice
                                        id={diceId}
                                        min={min}
                                        max={max}
                                        value={value}
                                        isLocked={isLocked}
                                    />
                                </motion.div>
                            );
                        })}
                        <motion.div
                            layout
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.1 }}
                        >
                            <AddDice />
                        </motion.div>
                    </AnimatePresence>
                </div>
                <BottomBar />
            </div>
            <Toaster />
        </ThemeProvider>
    );
}

export default App;
