// AddDice.tsx

import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
import {
    Dialog,
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
import { toast } from "sonner";
import useDiceStore from "@/zustand/store";
import useMediaQuery from "@/hooks/useMediaQuery";

interface AddDiceProps {
    open: boolean;
    onOpenChange: Dispatch<SetStateAction<boolean>>;
    minValue: string;
    maxValue: string;
    isButtonDisabled: boolean;
    setMinValue: Dispatch<SetStateAction<string>>;
    setMaxValue: Dispatch<SetStateAction<string>>;
    handleAdd: () => void;
}

const AddDice = () => {
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const isDesktop = useMediaQuery("(min-width: 768px)");

    const setDiceRange = useDiceStore((state) => state.setDiceRange);

    useEffect(() => {
        if (minValue !== "" && maxValue !== "") {
            if (parseInt(maxValue) <= parseInt(minValue)) {
                toast.error(
                    "Maximum value must be greater than minimum value."
                );
                setIsButtonDisabled(true);
            } else {
                setIsButtonDisabled(false);
            }
        } else {
            setIsButtonDisabled(true);
        }
    }, [minValue, maxValue]);

    const handleAdd = () => {
        const min = parseInt(minValue);
        const max = parseInt(maxValue);
        setDiceRange(min, max);
        setMinValue("");
        setMaxValue("");
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
}: AddDiceProps) => (
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
                    placeholder="Minimal value"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                />
                <Input
                    placeholder="Maximum value"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                />
            </div>
            <div className="flex justify-end mt-4">
                <Button onClick={handleAdd} disabled={isButtonDisabled}>
                    Add
                </Button>
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
}: AddDiceProps) => (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="size-16">
                <Icon icon="heroicons:plus-16-solid" />
            </Button>
        </DrawerTrigger>
        <DrawerContent>
            <DrawerHeader>
                <DrawerTitle className="text-left">Add new dice</DrawerTitle>
                <DrawerDescription className="text-left">
                    Please choose the range.
                </DrawerDescription>
            </DrawerHeader>
            <div className="flex flex-row gap-2 px-4">
                <Input
                    placeholder="Minimal value"
                    value={minValue}
                    onChange={(e) => setMinValue(e.target.value)}
                />
                <Input
                    placeholder="Maximum value"
                    value={maxValue}
                    onChange={(e) => setMaxValue(e.target.value)}
                />
            </div>
            <DrawerFooter>
                <Button onClick={handleAdd} disabled={isButtonDisabled}>
                    Add
                </Button>
                <DrawerClose>
                    <Button variant="ghost">Cancel</Button>
                </DrawerClose>
            </DrawerFooter>
        </DrawerContent>
    </Drawer>
);

export default AddDice;
