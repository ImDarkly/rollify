// add-dice-drawer.tsx
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
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { RangeSlider } from "./ui/range-slider";
import { ScrollArea } from "./ui/scroll-area";
import { Icon } from "@iconify/react";

interface AddDiceDrawerProps {
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
}: AddDiceDrawerProps) => (
    <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerTrigger asChild>
            <Button size={"icon"} variant={"outline"} className="size-16">
                <Icon icon="heroicons:plus-16-solid" />
            </Button>
        </DrawerTrigger>
        <DrawerContent onOpenAutoFocus={(event) => event.preventDefault()}>
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

export default AddDiceDrawer;
