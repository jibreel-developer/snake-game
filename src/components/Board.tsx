import { useSnapshot } from "valtio";
import { Cell, Row } from "../utils/generateBoard";
import Player from "./Player";
import { store } from "../utils/store";
import { useProxy } from "valtio/utils";
import { SnakeHead, SnakeTail } from "./Snake";

interface BoardCellProps {
  cell: Cell;
}

function BoardCell(props: BoardCellProps) {
  const storeSnapshot = useSnapshot(store);
  const { cell } = props;

  const snakeHeads = storeSnapshot.snakes.filter((s) => s.start == cell.id);
  const snakeTails = storeSnapshot.snakes.filter((s) => s.end == cell.id);

  return (
    <div className="size-6 md:size-12 relative">
      <div className="absolute top-0 left-0 p-1">
        {storeSnapshot.player.position == cell.id && <Player />}
      </div>
      {snakeHeads.map((s) => (
        <SnakeHead key={s.id} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{s.id}</SnakeHead>
      ))}
      {snakeTails.map((s) => (
        <SnakeTail key={s.id} className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2">{s.id}</SnakeTail>
      ))}
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
  const storeSnapshot = useProxy(store);

  return (
    <div className="aspect-square divide-y max-w-fit border">
      {storeSnapshot.board.map((row) => (
        <BoardRow key={row.id} row={row} />
      ))}
    </div>
  );
}
