// add-dice.tsx
import useMediaQuery from "@/hooks/useMediaQuery";
import { ReactNode } from "react";
import DiceDialog from "./dice-dialog";
import React from "react";
import DiceDrawer from "./dice-drawer";

interface UpdateDiceProps {
    children: ReactNode;
    diceId?: number;
}

const UpdateDice: React.FC<UpdateDiceProps> = ({ diceId, children }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? (
        <DiceDialog diceId={diceId}>{children}</DiceDialog>
    ) : (
        <DiceDrawer diceId={diceId}>{children}</DiceDrawer>
    );
};

export default UpdateDice;
