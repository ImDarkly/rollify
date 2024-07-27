import { useEffect, useState } from "react";
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
import { Input } from "./ui/input";
import useDiceStore from "@/zustand/store";

const AddDice = () => {
    const [minValue, setMinValue] = useState("");
    const [maxValue, setMaxValue] = useState("");
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const [error, setError] = useState("");

    const setDiceRange = useDiceStore((state) => state.setDiceRange);

    useEffect(() => {
        if (minValue !== "" && maxValue !== "") {
            const min = parseInt(minValue, 10);
            const max = parseInt(maxValue, 10);
            if (max <= min) {
                setError("Maximum value must be greater than minimum value.");
                setIsButtonDisabled(true);
            } else {
                setError("");
                setIsButtonDisabled(false);
            }
        } else {
            setIsButtonDisabled(true);
            setError("");
        }
    }, [minValue, maxValue]);

    const handleAdd = () => {
        const min = parseInt(minValue, 10);
        const max = parseInt(maxValue, 10);
        setDiceRange(min, max);
        setMinValue("");
        setMaxValue("");
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button size={"icon"} variant={"outline"} className="size-16">
                    <Icon icon="heroicons:plus-16-solid" />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Add new dice
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Please choose the range.
                    </DialogDescription>
                </DialogHeader>
                <div className="flex flex-row gap-2">
                    <Input
                        type="number"
                        placeholder="Minimal value"
                        value={minValue}
                        onChange={(e) => setMinValue(e.target.value)}
                    />
                    <Input
                        type="number"
                        placeholder="Maximum value"
                        value={maxValue}
                        onChange={(e) => setMaxValue(e.target.value)}
                    />
                </div>
                {error && <div className="text-red-500 mt-2">{error}</div>}
                <div className="flex justify-end mt-4">
                    <Button onClick={handleAdd} disabled={isButtonDisabled}>
                        Add
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddDice;
