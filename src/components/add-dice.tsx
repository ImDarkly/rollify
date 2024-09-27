// add-dice.tsx
import useMediaQuery from "@/hooks/useMediaQuery";
import { ReactNode } from "react";
import DiceDialog from "./dice-dialog";
import React from "react";
import DiceDrawer from "./dice-drawer";

interface AddDiceProps {
    children: ReactNode;
}

const AddDice: React.FC<AddDiceProps> = ({ children }) => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? (
        <DiceDialog>{children}</DiceDialog>
    ) : (
        <DiceDrawer>{children}</DiceDrawer>
    );
};

export default AddDice;
