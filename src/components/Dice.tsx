import { useSnapshot } from "valtio";
import { rollDice, store } from "../utils/store";

export default function Dice() {
  const storeSnapshot = useSnapshot(store);

  if (storeSnapshot.player.isWined) return null;

  if (storeSnapshot.dice.rolling) {
    return (
      <div className="animate-spin border-4 size-6 border-r-gray-400 border-b-gray-400 rounded-md" />
    );
  }

  return (
    <div className="flex flex-col items-center gap-1">
      <button onClick={rollDice} className="rounded-md text-sm size-8 border-2">
        {storeSnapshot.dice.value}
      </button>
      <p className="text-xs">Click to roll</p>
    </div>
  );
}
