import { BOARD_SIZE, SNAKE_COUNT } from "./constant";
import randomNumber from "./randomNumber";

export interface Snake {
  id: number;
  start: number;
  end: number;
}

export default function generateSnakes() {
  const count = SNAKE_COUNT;
  const boardSize = BOARD_SIZE;

  const endOfBoard = boardSize * boardSize;

  const snakes: Snake[] = [];

  for (let i = 0; i < count; i++) {
    let start = 0;

    do {
      start = randomNumber(boardSize, endOfBoard - 1);
    } while (snakes.findIndex((s) => s.start == start) != -1);

    const end = randomNumber(0, start - 2);
    snakes.push({ id: i + 1, start, end });
  }

  return snakes;
}
