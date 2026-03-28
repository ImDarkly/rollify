export type DiceType = {
  id: number;
  value: number;
  isLocked: boolean;
  config: DiceConfig;
};

export type DiceConfig = {
  min: number;
  max: number;
  multiplier: number;
  title: string;
};

export type DiceState = {
  dice: Dice[];
};

export type DiceActions = {
  createDice: (config: DiceConfig) => void;
  removeDice: (id: number) => void;
  updateDice: (id: number, updates: Partial<Dice>) => void;
};
