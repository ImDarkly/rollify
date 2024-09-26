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
    updateDice: (id: number, updates: Partial<Dice>) => void;
};

const loadStateFromLocalStorage = (): DiceState => {
    const storedState = localStorage.getItem('diceState');
    if (storedState) {
        return JSON.parse(storedState);
    }
    return {
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
};

const saveStateToLocalStorage = (state: DiceState) => {
    localStorage.setItem('diceState', JSON.stringify(state));
};

const useDiceStore = create<DiceState & DiceActions>()(
    temporal((set) => {
        const initialState = loadStateFromLocalStorage();

        return {
            ...initialState,

            createDice: () => set((state) => {
                const { minimum, maximum } = state.diceSettings.values;
                const { multiplier, title } = state.diceSettings;
                const newId = state.nextId;
                const newDice = {
                    ...state.dice,
                    [newId]: { 
                        min: minimum, 
                        max: maximum, 
                        value: 0, 
                        isLocked: false, 
                        multiplier, 
                        title 
                    }
                };
                const newState = { ...state, dice: newDice, nextId: newId + 1 };
                saveStateToLocalStorage(newState);
                return newState;
            }),

            generateRandomValue: (id) => set((state) => {
                const dice = state.dice[id];
                if (!dice || dice.isLocked) return state;

                const { min, max, multiplier } = dice;
                const value = (Math.floor(Math.random() * (max - min + 1)) + min) * multiplier;
                const newDice = { ...state.dice, [id]: { ...dice, value } };
                const newState = { ...state, dice: newDice };
                saveStateToLocalStorage(newState);
                return newState;
            }),

            removeDice: (id) => set((state) => {
                const newDice = { ...state.dice };
                delete newDice[id];
                const newState = { ...state, dice: newDice };
                saveStateToLocalStorage(newState);
                return newState;
            }),

            toggleLock: (id) => set((state) => {
                const dice = state.dice[id];
                if (!dice) return state;
                const newDice = { ...state.dice, [id]: { ...dice, isLocked: !dice.isLocked } };
                const newState = { ...state, dice: newDice };
                saveStateToLocalStorage(newState);
                return newState;
            }),

            updateDiceSettings: (updates) => set((state) => {
                const newState = {
                    diceSettings: {
                        ...state.diceSettings,
                        ...updates,
                        values: {
                            ...state.diceSettings.values,
                            ...(updates.values || {})
                        }
                    }
                };
                saveStateToLocalStorage({ ...state, ...newState });
                return newState;
            }),

            updateDice: (id, updates) => set((state) => {
                const dice = state.dice[id];
                if (!dice) return state;
                const updatedDice = { ...dice, ...updates };
                const newDice = { ...state.dice, [id]: updatedDice };
                const newState = { ...state, dice: newDice };
                saveStateToLocalStorage(newState);
                return newState;
            }),
        };
    })
);

// Ensure that undo also updates the local storage
useDiceStore.subscribe((state) => saveStateToLocalStorage(state));

export default useDiceStore;
