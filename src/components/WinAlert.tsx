import { useSnapshot } from "valtio";
import { resetGame, store } from "../utils/store";

export function WinAlert() {
  const storeSnapshot = useSnapshot(store);

  if (!storeSnapshot.player.isWined) return null;

  return (
    <div className="flex flex-col gap-2 items-center">
      <p>You Win</p>
      <button
        className="bg-gray-300 hover:bg-gray-400 px-3 py-1"
        onClick={resetGame}
      >
        Restart
      </button>
    </div>
  );
}
