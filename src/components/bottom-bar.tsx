import { Button } from "./ui/button";
import useDiceStore from "@/zustand/store";

const BottomBar = () => {
    const generateRandomValue = useDiceStore(
        (state) => state.generateRandomValue
    );
    const dice = useDiceStore((state) => state.dice);

    const handleRoll = () => {
        Object.keys(dice).forEach((key) => {
            const diceId = parseInt(key, 10);
            generateRandomValue(diceId);
        });
    };

    const noDicesAvailable = Object.keys(dice).length === 0;

    return (
        <div className="w-full h-24 bg-gradient-to-t from-background to-transparent absolute left-0 bottom-0 flex flex-row justify-center items-center">
            <Button onClick={handleRoll} disabled={noDicesAvailable}>
                Roll
            </Button>
        </div>
    );
};

export default BottomBar;
