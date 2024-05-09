export interface Snake {
  id: number;
  start: number;
  end: number;
}

// generate number between range
function randomNumberWithRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

interface GenerateSnakesOpts {
  count: number;
  boardSize: number;
}

export function generateSnakes(opts: GenerateSnakesOpts) {
  const { count, boardSize } = opts;
  const endOfBoard = boardSize * boardSize;

  const snakes: Snake[] = [];

  for (let i = 0; i < count; i++) {
    let start = 0;

    do {
      start = randomNumberWithRange(boardSize, endOfBoard);
    } while (snakes.findIndex((s) => s.start == start) != -1);

    const end = randomNumberWithRange(0, start - 1);
    snakes.push({ id: i + 1, start, end });
  }

  return snakes;
}
