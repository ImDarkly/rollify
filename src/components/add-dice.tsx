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

    const setDiceRange = useDiceStore((state) => state.setDiceRange);

    useEffect(() => {
        setIsButtonDisabled(maxValue <= minValue);
    }, [minValue, maxValue]);

    const handleAdd = () => {
        setDiceRange(minValue, maxValue);
        setMinValue(1);
        setMaxValue(6);
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
            isButtonDisabled={isButtonDisabled}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            handleAdd={handleAdd}
            onSliderChange={handleSliderChange}
        />
    ) : (
        <AddDiceDrawer
            open={open}
            onOpenChange={setOpen}
            minValue={minValue}
            maxValue={maxValue}
            isButtonDisabled={isButtonDisabled}
            setMinValue={setMinValue}
            setMaxValue={setMaxValue}
            handleAdd={handleAdd}
            onSliderChange={handleSliderChange}
        />
    );
};

export default AddDice;
