import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/range-slider";
import { Icon } from "@iconify/react";

interface AddDiceDialogProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    minValue: number;
    maxValue: number;
    isButtonDisabled: boolean;
    setMinValue: (value: number) => void;
    setMaxValue: (value: number) => void;
    handleAdd: () => void;
    onSliderChange: (values: [number, number]) => void;
}

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
}: AddDiceDialogProps) => (
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

export default AddDiceDialog;
