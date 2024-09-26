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
import AddDiceForm from "./add-dice-form";
import { ReactNode, useEffect, useState } from "react";
import useDiceStore from "@/zustand/diceStore";
import DiceForm from "./dice-form";

interface AddDiceDialogProps {
    children: ReactNode;
    diceId: number;
}

const AddDiceDialog: React.FC<AddDiceDialogProps> = ({ diceId, children }) => {
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [open, setOpen] = useState(false);

    const { diceSettings, updateDiceSettings, createDice } = useDiceStore();
    const { values } = diceSettings;

    const handleAddDice = () => {
        createDice();
        updateDiceSettings({ values: { minimum: 1, maximum: 6 } });
        updateDiceSettings({ multiplier: 1 });
    };

    useEffect(() => {
        setIsButtonDisabled(values.maximum <= values.minimum);
    }, [values.minimum, values.maximum]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>{children}</DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="text-left">
                        Add new dice
                    </DialogTitle>
                    <DialogDescription className="text-left">
                        Please choose the range.
                    </DialogDescription>
                </DialogHeader>
                <DiceForm diceId={diceId} />
                <div className="flex justify-end mt-4">
                    <DialogClose asChild>
                        <Button
                            onClick={handleAddDice}
                            disabled={isButtonDisabled}
                        >
                            Add
                        </Button>
                    </DialogClose>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default AddDiceDialog;
