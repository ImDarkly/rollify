// add-dice.tsx
import useMediaQuery from "@/hooks/useMediaQuery";
import AddDiceDrawer from "./add-dice-drawer";
import { ReactNode } from "react";
import DiceDialog from "./dice-dialog";
import React from "react";

interface AddDiceProps {
    children: ReactNode;
    diceId?: number;
}

const AddDice: React.FC<AddDiceProps> = ({ diceId, children }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? (
        <DiceDialog diceId={diceId}>{children}</DiceDialog>
    ) : (
        <AddDiceDrawer>{children}</AddDiceDrawer>
    );
};

export default AddDice;
