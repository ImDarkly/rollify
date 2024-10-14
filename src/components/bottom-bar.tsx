import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import useDiceStore from "@/zustand/diceStore";

const BottomBar = () => {
  const generateRandomValue = useDiceStore(
    (state) => state.generateRandomValue
  );
  const dice = useDiceStore((state) => state.dice);
  const [, setIsBouncing] = useState(false);

  const handleRoll = () => {
    Object.keys(dice).forEach((key) => {
      const diceId = parseInt(key, 10);
      generateRandomValue(diceId);
    });

    setIsBouncing(true);

    setTimeout(() => {
      setIsBouncing(false);
    }, 1000);
  };

  const noDicesAvailable =
    Object.keys(dice).length === 0 ||
    Object.values(dice).every((dice) => dice.isLocked);

  return (
    <div className="w-full h-36 bg-gradient-to-t from-background to-transparent absolute left-0 bottom-0 flex flex-row justify-center items-center">
      {!noDicesAvailable ? (
        <motion.div
          animate={{ scale: 1 }}
          whileTap={{ scale: 0.95 }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            repeatDelay: 1,
            type: "spring",
            stiffness: 20,
            damping: 15,
            mass: 2,
            scale: {
              type: "spring",
              stiffness: 300,
              damping: 5,
              mass: 0.5,
            },
          }}
        >
          <Button size="lg" onClick={handleRoll} disabled={noDicesAvailable}>
            Roll
          </Button>
        </motion.div>
      ) : (
        <div>
          <Button size="lg" onClick={handleRoll} disabled={noDicesAvailable}>
            Roll
          </Button>
        </div>
      )}
    </div>
  );
};

export default BottomBar;
