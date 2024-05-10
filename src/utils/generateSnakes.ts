import randomNumber from "./randomNumber";

export interface Snake {
  id: number;
  start: number;
  end: number;
}

interface GenerateSnakesOpts {
  count: number;
  boardSize: number;
}

export default function generateSnakes(opts: GenerateSnakesOpts) {
  const { count, boardSize } = opts;
  const endOfBoard = boardSize * boardSize;

  const snakes: Snake[] = [];

  for (let i = 0; i < count; i++) {
    let start = 0;

    do {
      start = randomNumber(boardSize, endOfBoard);
    } while (snakes.findIndex((s) => s.start == start) != -1);

    const end = randomNumber(0, start - 1);
    snakes.push({ id: i + 1, start, end });
  }

  return snakes;
}
