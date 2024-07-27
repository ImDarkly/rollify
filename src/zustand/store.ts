import { create } from "zustand";

type DiceState = {
    dice: Record<number, { min: number; max: number; value: number }>;
    nextId: number; // Track the next unique ID
    setDiceRange: (min: number, max: number) => void; // Add dice with a unique ID
    generateRandomValue: (id: number) => void; // Generate random value for a dice
    removeDice: (id: number) => void; // Remove dice based on id
};

const useDiceStore = create<DiceState>((set) => ({
    dice: {},
    nextId: 1, // Initialize with 1 or another starting value
    setDiceRange: (min, max) => set((state) => {
        const newId = state.nextId;
        return {
            dice: {
                ...state.dice,
                [newId]: { min, max, value: 0 },
            },
            nextId: newId + 1, // Increment ID for the next dice
        };
    }),
    generateRandomValue: (id) => set((state) => {
        const dice = state.dice[id];
        if (!dice) return state;

        const { min, max } = dice;
        const value = Math.floor(Math.random() * (max - min + 1)) + min;
        return {
            dice: {
                ...state.dice,
                [id]: { ...dice, value },
            },
        };
    }),
    removeDice: (id) => set((state) => {
        const newDice = { ...state.dice };
        delete newDice[id];
        return { dice: newDice };
    }),
}));

export default useDiceStore;
