import { Row } from "../types";

export default function generateBoard(size: number) {
  const boardRows: Row[] = [];

  for (let i = 0; i < size; i++) {
    boardRows[i] = {
      id: i,
      cells: Array.from({ length: size }).map((_, idx) => ({
        id: i * size + 1 + idx,
      })),
    };

    if (i % 2 !== 0) {
      boardRows[i].cells.reverse();
    }
  }

  return boardRows.reverse();
}
