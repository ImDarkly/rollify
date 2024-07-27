import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Icon } from "@iconify/react";
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

const AddDice = () => {
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);

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

    return (
        <Drawer>
            <DrawerTrigger>
                <Button size={"icon"} variant={"outline"} className="size-16">
                    <Icon icon="heroicons:plus-16-solid" />
                </Button>
            </DrawerTrigger>
            <DrawerContent>
                <DrawerHeader>
                    <DrawerTitle className="text-left">
                        Add new dice
                    </DrawerTitle>
                    <DrawerDescription className="text-left">
                        Please choose the range.
                    </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-row gap-2 px-4">
                    <Input
                        placeholder="Minimal value"
                        autoFocus
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
};

export default AddDice;
