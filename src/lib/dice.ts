import { Dice } from "./types";

export const rollDice = (dice: Dice): number => {
  const { min, max, multiplier } = dice.config;
  return (Math.floor(Math.random() * (max - min + 1)) + min) * multiplier;
};
