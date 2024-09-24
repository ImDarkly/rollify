import { create } from "zustand";
import { temporal } from 'zundo';

type Dice = {
    min: number;
    max: number;
    value: number;
    isLocked: boolean;
    multiplier: number;
    title: string;
};

type DiceSettings = {
    values: {
        minimum: number;
        maximum: number;
    };
    multiplier: number;
    title: string;
};

type DiceState = {
    dice: Record<number, Dice>;
    nextId: number;
    diceSettings: DiceSettings;
};

type DiceActions = {
    createDice: () => void;
    generateRandomValue: (id: number) => void;
    removeDice: (id: number) => void;
    toggleLock: (id: number) => void;
    updateDiceSettings: (updates: Partial<DiceSettings>) => void;
};

const initialState: DiceState = {
    dice: {},
    nextId: 1,
    diceSettings: {
        values: {
            minimum: 1,
            maximum: 6,
        },
        multiplier: 1,
        title: "1 - 6",
    },
};

const useDiceStore = create<DiceState & DiceActions>()(
    temporal((set) => ({
        ...initialState,

        createDice: () => set((state) => {
            const { minimum, maximum } = state.diceSettings.values;
            const { multiplier, title } = state.diceSettings;
            const newId = state.nextId;
            return {
                dice: {
                    ...state.dice,
                    [newId]: { 
                        min: minimum, 
                        max: maximum, 
                        value: 0, 
                        isLocked: false, 
                        multiplier, 
                        title 
                    }
                },
                nextId: newId + 1,
            };
        }),

        generateRandomValue: (id) => set((state) => {
            const dice = state.dice[id];
            if (!dice || dice.isLocked) return state;

            const { min, max, multiplier } = dice;
            const value = (Math.floor(Math.random() * (max - min + 1)) + min) * multiplier;
            return {
                dice: {
                    ...state.dice,
                    [id]: { ...dice, value }
                }
            };
        }),

        removeDice: (id) => set((state) => {
            const newDice = { ...state.dice };
            delete newDice[id];
            return { dice: newDice };
        }),

        toggleLock: (id) => set((state) => {
            const dice = state.dice[id];
            if (!dice) return state;
            return {
                dice: {
                    ...state.dice,
                    [id]: { ...dice, isLocked: !dice.isLocked }
                }
            };
        }),

        updateDiceSettings: (updates) => set((state) => ({
            diceSettings: {
                ...state.diceSettings,
                ...updates,
                values: {
                    ...state.diceSettings.values,
                    ...(updates.values || {})
                }
            }
        })),
    }))
);

export default useDiceStore;