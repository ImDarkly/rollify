import { create } from "zustand";
import { temporal } from 'zundo';

type Dice = {
    min: number;
    max: number;
    value: number;
    isLocked: boolean;
    multiplier?: number;
};

type DiceState = {
    dice: Record<number, Dice>;
    nextId: number;
    createDice: (min: number, max: number, multiplier?: number) => void;
    generateRandomValue: (id: number) => void;
    removeDice: (id: number) => void; 
    toggleLock: (id: number) => void;
};

const useDiceStore = create<DiceState>()(
    temporal((set) => ({
        dice: {},
        nextId: 1,
        createDice: (min: number, max: number, multiplier: number = 1) => set((state) => {
            const newId = state.nextId;
            return {
                dice: {
                    ...state.dice,
                    [newId]: { min, max, value: 0, isLocked: false, multiplier: multiplier > 0 ? multiplier : 1 },
                },
                nextId: newId + 1,
            };
        }),
        generateRandomValue: (id) => set((state) => {
            const dice = state.dice[id];
            if (!dice || dice.isLocked) return state;

            const { min, max, multiplier } = dice;
            const value = Math.floor(Math.random() * (max - min + 1)) + min;
            const multipliedValue = multiplier ? value * multiplier : value;
            return {
                dice: {
                    ...state.dice,
                    [id]: { ...dice, value: multipliedValue },
                },
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
                    [id]: { ...dice, isLocked: !dice.isLocked },
                },
            };
        }),
    }))
);

export default useDiceStore;
