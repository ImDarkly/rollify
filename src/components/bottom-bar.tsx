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

    return (
        <div className="w-full h-20 bg-gradient-to-t from-slate-50 to-transparent absolute left-0 bottom-0 flex flex-row justify-center items-center">
            <Button onClick={handleRoll}>Roll</Button>
        </div>
    );
};

export default BottomBar;
