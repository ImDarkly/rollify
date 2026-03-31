export type DiceType = {
  id: number;
  value: number;
  isLocked: boolean;
  config: DiceConfig;
  hue: number;
};

export type DiceConfig = {
  min: number;
  max: number;
  multiplier: number;
  title: string;
};

export type DiceState = {
  dice: DiceType[];
};

export type DiceActions = {
  createDice: (config: DiceConfig) => void;
  removeDice: (id: number) => void;
  updateDice: (id: number, updates: Partial<DiceType>) => void;
  setDice: (dice: DiceType[]) => void;
};
