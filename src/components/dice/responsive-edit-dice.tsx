import useMediaQuery from "@/hooks/useMediaQuery";
import { DiceConfig, DieType } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DiceForm from "./dice-form";
import useDiceStore from "@/zustand/diceStore";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";

interface ResponsiveEditDiceProps {
  die: DieType;
  open: boolean;
  onClose: () => void;
}

export default function ResponsiveEditDice({
  die,
  open,
  onClose,
}: ResponsiveEditDiceProps) {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const { updateDice } = useDiceStore((state) => ({
    updateDice: state.updateDice,
  }));

  const handleSubmit = (config: DiceConfig) => {
    updateDice(die.id, { config });
    onClose();
  };

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {die.config.title}</DialogTitle>
          </DialogHeader>
          <DiceForm
            initialConfig={die.config}
            onSubmit={handleSubmit}
            renderSubmit={(submit) => (
              <DialogFooter>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
                <Button onClick={submit}>Save</Button>
              </DialogFooter>
            )}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={(o) => !o && onClose()}>
      <DrawerContent className="px-4">
        <DrawerHeader>
          <DrawerTitle>Edit {die.config.title}</DrawerTitle>
        </DrawerHeader>
        <DiceForm
          initialConfig={die.config}
          onSubmit={handleSubmit}
          renderSubmit={(submit) => (
            <DrawerFooter className="px-0">
              <Button onClick={submit}>Save</Button>
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </DrawerFooter>
          )}
        />
      </DrawerContent>
    </Drawer>
  );
}
