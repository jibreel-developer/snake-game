import { useSnapshot } from "valtio";
import { store } from "../utils/store";

export default function History() {
  const storeSnapshot = useSnapshot(store);

  return (
    <div className="w-full">
      <h2 className="font-semibold text-lg">Game History</h2>
      <ul className="text-sm divide-y">
        {storeSnapshot.history.map((history) => (
          <li key={history.id} className="py-1">
            <span className="font-semibold">{history.id}:</span>{" "}
            {history.message}
          </li>
        ))}
      </ul>
    </div>
  );
}
