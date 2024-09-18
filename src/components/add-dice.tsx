import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import useDiceStore from "@/zustand/store";
import useMediaQuery from "@/hooks/useMediaQuery";
import { ScrollArea } from "./ui/scroll-area";
import { RangeSlider } from "./ui/range-slider";

interface AddDiceProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    minValue: number;
    maxValue: number;
    isButtonDisabled: boolean;
    setMinValue: Dispatch<SetStateAction<number>>;
    setMaxValue: Dispatch<SetStateAction<number>>;
    handleAdd: () => void;
}

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

const AddDiceDialog = ({
    open,
    onOpenChange,
    minValue,
    maxValue,
    isButtonDisabled,
    setMinValue,
    setMaxValue,
    handleAdd,
    onSliderChange,
}: AddDiceProps & { onSliderChange: (values: [number, number]) => void }) => (
    <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="size-16">
                <Icon icon="heroicons:plus-16-solid" />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-left">Add new dice</DialogTitle>
                <DialogDescription className="text-left">
                    Please choose the range.
                </DialogDescription>
            </DialogHeader>
            <div className="flex flex-row gap-2">
                <Input
                    type="number"
                    placeholder="Minimal value"
                    value={minValue}
                    onChange={(e) => setMinValue(Number(e.target.value))}
                    className="text-md"
                    onFocus={(e) => e.target.select()}
                />
                <RangeSlider
                    value={[minValue, maxValue]}
                    max={20}
                    step={1}
                    onValueChange={onSliderChange}
                />
                <Input
                    type="number"
                    placeholder="Maximum value"
                    value={maxValue}
                    onChange={(e) => setMaxValue(Number(e.target.value))}
                    className="text-md"
                    onFocus={(e) => e.target.select()}
                />
            </div>
            <div className="flex justify-end mt-4">
                <DialogClose asChild>
                    <Button onClick={handleAdd} disabled={isButtonDisabled}>
                        Add
                    </Button>
                </DialogClose>
            </div>
        </DialogContent>
    </Dialog>
);

const AddDiceDrawer = ({
    open,
    onOpenChange,
    minValue,
    maxValue,
    isButtonDisabled,
    setMinValue,
    setMaxValue,
    handleAdd,
    onSliderChange,
}: AddDiceProps & { onSliderChange: (values: [number, number]) => void }) => (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="size-16">
                <Icon icon="heroicons:plus-16-solid" />
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <ScrollArea className="overflow-y-scroll">
                <DrawerHeader>
                    <DrawerTitle className="text-left">
                        Add new dice
                    </DrawerTitle>
                    <DrawerDescription className="text-left">
                        Please choose the range.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col px-4 gap-4 p-4">
                    <div className="flex justify-between">
                        <Input
                            type="number"
                            placeholder="Minimal value"
                            value={minValue}
                            onChange={(e) =>
                                setMinValue(Number(e.target.value))
                            }
                            className="text-md"
                            onFocus={(e) => e.target.select()}
                        />
                        <Input
                            type="number"
                            placeholder="Maximum value"
                            value={maxValue}
                            onChange={(e) =>
                                setMaxValue(Number(e.target.value))
                            }
                            className="text-md"
                            onFocus={(e) => e.target.select()}
                        />
                    </div>
                    <RangeSlider
                        value={[minValue, maxValue]}
                        max={20}
                        step={1}
                        onValueChange={onSliderChange}
                    />
                </div>
                <DrawerFooter>
                    <DrawerClose asChild>
                        <Button onClick={handleAdd} disabled={isButtonDisabled}>
                            Add
                        </Button>
                    </DrawerClose>
                    <DrawerClose asChild>
                        <Button variant="ghost">Cancel</Button>
                    </DrawerClose>
                </DrawerFooter>
            </ScrollArea>
        </DrawerContent>
    </Drawer>
);

export default AddDice;
