import { Link } from "react-router-dom";

export default function Search({ item }) {
  return (
    <div
      key={item.id}
      className="px-6 py-7 border-b border-gray-300 last:border-b-0 flex gap-6 items-start bg-gray-100"
    >
      <div className="rounded-full bg-gray-200 text-gray-600 font-black text-2xl text-center p-6 size-20 shrink-0">
        {item.name.split(" ").map((a) => a[0])}
      </div>

      <div>
        <Link to={`/profile/${item.nickname}`} className="flex gap-2 pt-1">
          <span className="font-bold">{item.name}</span>
        </Link>
        <Link to={`/profile/${item.nickname}`} className="flex gap-2 pt-1">
          <span className="text-gray-600">@{item.nickname}</span>
        </Link>
      </div>
    </div>
  );
}
