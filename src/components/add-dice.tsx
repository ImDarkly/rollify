// add-dice.tsx
import { useEffect, useState } from "react";
import useDiceStore from "@/zustand/store";
import useMediaQuery from "@/hooks/useMediaQuery";
import AddDiceDialog from "./add-dice-dialog";
import AddDiceDrawer from "./add-dice-drawer";

const AddDice = () => {
    const [minValue, setMinValue] = useState<number>(1);
    const [maxValue, setMaxValue] = useState<number>(6);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");
    const [multiplier, setMultiplier] = useState<number>(1);

    const createDice = useDiceStore((state) => state.createDice);

    useEffect(() => {
        setIsButtonDisabled(maxValue <= minValue);
    }, [minValue, maxValue]);

    const handleAdd = () => {
        createDice(minValue, maxValue, multiplier);
        setMinValue(1);
        setMaxValue(6);
        setMultiplier(1);
    };

    const handleSliderChange = (values: [number, number]) => {
        setMinValue(values[0]);
        setMaxValue(values[1]);
    };

    return isDesktop ? (
        <AddDiceDialog
            open={open}
            onOpenChange={setOpen}
            minValue={minValue}
            maxValue={maxValue}
            multiplier={multiplier}
            isButtonDisabled={isButtonDisabled}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setMultiplier={setMultiplier}
            handleAdd={handleAdd}
            onSliderChange={handleSliderChange}
        />
    ) : (
        <AddDiceDrawer
            open={open}
            onOpenChange={setOpen}
            minValue={minValue}
            maxValue={maxValue}
            multiplier={multiplier}
            isButtonDisabled={isButtonDisabled}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            setMultiplier={setMultiplier}
            handleAdd={handleAdd}
            onSliderChange={handleSliderChange}
        />
    );
};

export default AddDice;
