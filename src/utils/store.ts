import { proxy } from "valtio";
import delay from "./delay";
import generateBoard, { Cell, Row } from "./generateBoard";
import { BOARD_SIZE, SNAKE_COUNT, WINNING_CELL } from "./constant";
import generateSnakes, { Snake } from "./generateSnakes";
import randomNumber from "./randomNumber";

interface Dice {
  value: number;
  rolling: boolean;
  crooked: boolean;
}

const dice = proxy<Dice>({
  value: 1,
  rolling: false,
  crooked: Math.random() < 0.5,
});

interface Player {
  position: Cell["id"];
  readonly isWined: boolean;
}

const player = proxy<Player>({
  position: 0,
  get isWined() {
    return this.position == WINNING_CELL;
  },
});

interface History {
  id: number;
  message: string;
}

const history = proxy<History[]>([]);

export interface Store {
  board: Row[];
  snakes: Snake[];
  dice: Dice;
  player: Player;
  history: History[];
}

export const store = proxy<Store>({
  board: generateBoard(BOARD_SIZE),
  snakes: generateSnakes({ count: SNAKE_COUNT, boardSize: BOARD_SIZE }),
  dice,
  player,
  history,
});

// mutations
function movePlayer() {
  if (player.position == 0) {
    if (dice.value == 6) player.position = 1;
    return;
  }

  if (player.position + dice.value > WINNING_CELL) return;

  player.position += dice.value;

  const snake = store.snakes.find((s) => s.start == player.position);
  if (snake) {
    player.position = snake.end;
  }
}

export async function rollDice() {
  if (player.position == WINNING_CELL) return;

  dice.rolling = true;
  await delay(1000);

  if (dice.crooked) {
    dice.value = randomNumber(1, 3) * 2;
  } else {
    dice.value = randomNumber(1, 6);
  }

  dice.crooked = dice.crooked ? false : Math.random() < 0.5;
  dice.rolling = false;

  const prevPosition = player.position;

  movePlayer();

  const currentPosition = player.position;

  const playerMoveHistory = (() => {
    if (prevPosition == currentPosition) {
      return `Player stayed at ${currentPosition}`;
    }

    if (player.isWined) {
      return `Player won at ${currentPosition}`;
    }

    if (currentPosition < prevPosition) {
      return `Bitten by a snake, player moved from ${prevPosition} to ${currentPosition}`;
    }

    return `Player moved from ${prevPosition} to ${currentPosition}`;
  })();

  history.unshift({
    id: history.length + 1,
    message: `Dice rolled ${dice.value}, ${playerMoveHistory}`,
  });
}

export function resetGame() {
  player.position = 0;
  store.snakes = generateSnakes({ count: SNAKE_COUNT, boardSize: BOARD_SIZE });
}
