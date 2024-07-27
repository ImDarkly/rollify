import useDiceStore from "@/zustand/store";
import { Button } from "./ui/button";

type DiceProps = {
    id: number;
    min: number;
    max: number;
    value: number;
};

const Dice = ({ id, min, max, value }: DiceProps) => {
    const removeDice = useDiceStore((state) => state.removeDice);

    return (
        <Button
            onClick={() => removeDice(id)}
            size={"icon"}
            variant={"secondary"}
            className="size-16"
        >
            <div>
                <p className="text-xs ">{`${min}-${max}`}</p>
                <p className="text-xl font-bold">{value}</p>
            </div>
        </Button>
    );
};

export default Dice;
