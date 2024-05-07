import { proxy } from "valtio";
import delay from "./delay";

interface Dice {
  value: number;
  rolling: boolean;
}

const dice = proxy<Dice>({ value: 1, rolling: false });

export async function rollDice() {
  dice.rolling = true;
  await delay(1000);
  dice.value = Math.floor(Math.random() * 6) + 1;
  dice.rolling = false;
}

export interface Store {
  dice: Dice;
}

export const store = proxy<Store>({ dice });
