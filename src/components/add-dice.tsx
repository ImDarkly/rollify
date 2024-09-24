// add-dice.tsx
import useMediaQuery from "@/hooks/useMediaQuery";
import AddDiceDialog from "./add-dice-dialog";
import AddDiceDrawer from "./add-dice-drawer";

const AddDice = () => {
    const isDesktop = useMediaQuery("(min-width: 768px)");

    return isDesktop ? <AddDiceDialog /> : <AddDiceDrawer />;
};

export default AddDice;
