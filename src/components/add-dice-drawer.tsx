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
import { ScrollArea } from "./ui/scroll-area";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import useDiceStore from "@/zustand/diceStore";
import AddDiceForm from "./add-dice-form";

const AddDiceDrawer = () => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const { diceSettings, updateDiceSettings, createDice } = useDiceStore();

    const handleAddDice = () => {
        createDice();
        updateDiceSettings({
            values: {
                minimum: 1,
                maximum: 6,
            },
            multiplier: 1,
        });
    };

    useEffect(() => {
        setIsButtonDisabled(
            diceSettings.values.maximum <= diceSettings.values.minimum
        );
    }, [diceSettings.values.minimum, diceSettings.values.maximum]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
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
                    <AddDiceForm />
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                onClick={handleAddDice}
                                disabled={isButtonDisabled}
                            >
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
};

export default AddDiceDrawer;
