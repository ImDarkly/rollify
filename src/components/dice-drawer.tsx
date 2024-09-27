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
import { ReactNode, useEffect, useState } from "react";
import useDiceStore from "@/zustand/diceStore";
import DiceForm from "./dice-form";

interface DiceDrawerProps {
    children: ReactNode;
    diceId?: number;
}

const DiceDrawer: React.FC<DiceDrawerProps> = ({ diceId, children }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);
    const { diceSettings, updateDiceSettings, createDice, updateDice } =
        useDiceStore();

    const handleDrawerClick = () => {
        if (diceId) {
            updateDice(diceId, {
                min: diceSettings.values.minimum,
                max: diceSettings.values.maximum,
                multiplier: diceSettings.multiplier,
                title: diceSettings.title,
            });
        } else {
            createDice();
            updateDiceSettings({
                values: { minimum: 1, maximum: 6 },
                multiplier: 1,
            });
        }
    };

    useEffect(() => {
        setIsButtonDisabled(
            diceSettings.values.maximum <= diceSettings.values.minimum
        );
    }, [diceSettings.values.minimum, diceSettings.values.maximum]);

    useEffect(() => {
        if (diceId) {
            updateDiceSettings({
                values: { minimum: 1, maximum: 6 },
                multiplier: 1,
            });
        }
    }, [open, diceId]);

    return (
        <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>{children}</DrawerTrigger>
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
                    <DiceForm diceId={diceId} />
                    <DrawerFooter>
                        <DrawerClose asChild>
                            <Button
                                onClick={handleDrawerClick}
                                disabled={isButtonDisabled}
                            >
                                {diceId ? "Edit" : "Add"}
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

export default DiceDrawer;
