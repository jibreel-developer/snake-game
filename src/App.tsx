import Board from "./components/Board";
import Dice from "./components/Dice";
import History from "./components/History";
import { SnakeHead, SnakeTail } from "./components/Snake";
import { WinAlert } from "./components/WinAlert";

function App() {
  return (
    <div className="p-4 container relative mx-auto">
      <div className="flex flex-col items-center justify-center max-w-full gap-4">
        <div>
          <Board />
          <div className="flex gap-4 py-3">
            <div className="flex gap-2 items-center">
              Snake Head: <SnakeHead />
            </div>
            <div className="flex gap-2 items-center">
              Snake Tail: <SnakeTail />
            </div>
          </div>
        </div>
        <Dice />
        <WinAlert />
        <History />
      </div>
    </div>
  );
}

export default App;
