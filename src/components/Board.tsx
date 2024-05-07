import { Cell, Row } from "../types";
import generateBoard from "../utils/generateBoard";

interface BoardCellProps {
  cell: Cell;
}

function BoardCell(props: BoardCellProps) {
  const { cell } = props;

  return (
    <div className="size-6 md:size-12 relative">
      <span className="absolute bottom-0 right-1 text-xs">{cell.id}</span>
    </div>
  );
}

interface BoardRowProps {
  row: Row;
}

function BoardRow(props: BoardRowProps) {
  const { row } = props;

  return (
    <div className="divide-x flex">
      {row.cells.map((cell) => (
        <BoardCell key={cell.id} cell={cell} />
      ))}
    </div>
  );
}

export default function Board() {
  const board = generateBoard(10);

  return (
    <div className="aspect-square divide-y max-w-fit border">
      {board.map((row) => (
        <BoardRow key={row.id} row={row} />
      ))}
    </div>
  );
}
