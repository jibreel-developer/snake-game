import Board from "./components/Board";
import Dice from "./components/Dice";

function App() {
  return (
    <div className="p-4 overflow-hidden">
      <div className="flex flex-col items-center justify-center max-w-full gap-4">
        <div>
          <Board />
        </div>
        <Dice />
      </div>
    </div>
  );
}

export default App;
