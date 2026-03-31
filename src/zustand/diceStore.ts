import { create } from "zustand";
import { temporal } from "zundo";
import { persist } from "zustand/middleware";
import { DiceActions, DiceConfig, DiceState, DiceType } from "@/lib/types";
import { generateDiceColor } from "@/lib/diceColor";

const useDiceStore = create<DiceState & DiceActions>()(
  temporal(
    persist(
      (set) => ({
        dice: [],
        createDice: (config: DiceConfig) =>
          set((state) => {
            const newId = Math.max(0, ...state.dice.map((d) => d.id)) + 1;
            return {
              dice: [
                ...state.dice,
                {
                  id: newId,
                  value: 0,
                  isLocked: false,
                  config,
                  hue: generateDiceColor(state.dice.map((d) => d.hue)),
                },
              ],
            };
          }),

        removeDice: (id) =>
          set((state) => ({
            dice: state.dice.filter((d) => d.id !== id),
          })),

        updateDice: (id, updates) =>
          set((state) => ({
            dice: state.dice.map((d) =>
              d.id === id ? { ...d, ...updates } : d,
            ),
          })),
        setDice: (dice: DiceType[]) => set({ dice }),
      }),
      {
        name: "diceState",
        partialize: (state) => ({
          dice: state.dice,
        }),
      },
    ),
    {
      partialize: (state) => ({
        dice: state.dice,
      }),
    },
  ),
);

export default useDiceStore;
