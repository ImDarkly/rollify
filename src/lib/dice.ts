import { DieType } from "./types";

export const rollDice = (die: DieType): number => {
  const { min, max, multiplier } = die.config;
  return (Math.floor(Math.random() * (max - min + 1)) + min) * multiplier;
};
