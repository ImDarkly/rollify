//dice-dialog.tsx
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
import { ReactNode, useEffect, useState } from "react";
import useDiceStore from "@/zustand/diceStore";
import DiceForm from "./dice-form";

interface AddDiceDialogProps {
    children: ReactNode;
    diceId?: number;
}

const DiceDialog: React.FC<AddDiceDialogProps> = ({ diceId, children }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);

    const { diceSettings, updateDiceSettings, createDice, updateDice } =
        useDiceStore();
    const { values } = diceSettings;

    const handleDialogClick = () => {
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
        setIsButtonDisabled(values.maximum <= values.minimum);
    }, [values.minimum, values.maximum]);

    useEffect(() => {
        if (diceId) {
            updateDiceSettings({
                values: { minimum: 1, maximum: 6 },
                multiplier: 1,
            });
        }
    }, [open, diceId]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="flex-grow">{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        {diceId ? "Edit dice" : "Add new dice"}
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Please choose the range.
                    </DialogDescription>
                </DialogHeader>
                <DiceForm diceId={diceId} />
                <div className="flex justify-end mt-4">
                    <DialogClose asChild>
                        <Button
                            onClick={handleDialogClick}
                            disabled={isButtonDisabled}
                        >
                            {diceId ? "Edit" : "Add"}
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default DiceDialog;
