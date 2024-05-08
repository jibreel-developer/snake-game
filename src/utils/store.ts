import { proxy } from "valtio";
import delay from "./delay";
import { Cell } from "../types";

interface Dice {
  value: number;
  rolling: boolean;
}

const dice = proxy<Dice>({ value: 1, rolling: false });

interface Player {
  position: Cell["id"];
  readonly isWined: boolean;
}

const player = proxy<Player>({
  position: 50,
  get isWined() {
    return this.position == 100;
  },
});

interface History {
  id: number;
  message: string;
}

const history = proxy<History[]>([]);

export interface Store {
  dice: Dice;
  player: Player;
  history: History[];
}

export const store = proxy<Store>({ dice, player, history });

// mutations
function movePlayer() {
  if (player.position == 0) {
    if (dice.value == 6) player.position = 1;
    return;
  }

  if (player.position + dice.value > 100) return;

  player.position += dice.value;
}

export async function rollDice() {
  if (player.position == 100) return;

  dice.rolling = true;
  await delay(1000);
  dice.value = Math.floor(Math.random() * 6) + 1;
  dice.rolling = false;

  const prevPosition = player.position;

  movePlayer();

  const currentPosition = player.position;

  const playerMoveHistory = (() => {
    if (prevPosition == currentPosition) {
      return `Player stayed at ${currentPosition}`;
    }

    if (player.isWined) return `Player won at ${currentPosition}`;

    return `Player moved from ${prevPosition} to ${currentPosition}`;
  })();

  history.unshift({
    id: history.length + 1,
    message: `Dice rolled ${dice.value}, ${playerMoveHistory}`,
  });
}

export function resetGame() {
  player.position = 0;
}
