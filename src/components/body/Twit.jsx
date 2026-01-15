import { Link } from "react-router-dom";
import {
  Heart,
  ChatTeardropText,
  DotsThreeOutline,
  Trash,
} from "@phosphor-icons/react";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function Twit({ item, twitType = "main" }) {
  const { user } = useContext(UserContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (favTwit) => {
      return axios.post(
        `https://kiwitter-node-77f5acb427c1.herokuapp.com/twits/${item.id}/likes`,
        favTwit,
        {
          headers: {
            Authorization: localStorage.getItem("kiwitter_user"),
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "",
      });
    },
  });

  // twitType === "main" ? ["mainPageTwits"] : ["twitDetail",${item.id}]

  const mutationDelete = useMutation({
    mutationFn: (item) => {
      return axios.delete(
        `https://kiwitter-node-77f5acb427c1.herokuapp.com/twits/${item.id}`,
        item,
        {
          headers: {
            Authorization: localStorage.getItem("kiwitter_user"),
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: "",
      });
    },
  });

  const handleFav = () => {
    const favTwit = {
      user_id: String(user.id),
    };
    mutation.mutate(favTwit);
  };

  const handleTwitDelete = () => {
    mutationDelete.mutate(item);
    console.log(item);
    console.log(user);
  };

  return (
    <div
      key={item.author_id}
      className={`px-6 py-7 border-b border-gray-300 last:border-b-0 flex gap-6 items-start ${
        twitType === "reply" ? "bg-gray-100" : ""
      }`}
    >
      <div className="rounded-full bg-gray-200 text-gray-600 font-black text-2xl text-center p-6 size-20 shrink-0">
        {item.user?.name
          ?.split(" ")
          .map((a) => a[0])
          .join("")}
      </div>
      <div>
        <Link
          to={`/profile/${item.user?.nickname}`}
          className="flex gap-2 pt-1"
        >
          <span className="font-bold">{item.user?.name || "Anonim"}</span>
          <span className="text-gray-600">@{item.user?.nickname}</span>
        </Link>
        <p className="mt-1">{item.content}</p>
        <div className="flex gap-2 mt-2 items-center">
          {user ? (
            <button
              className="flex gap-1 text-sm items-center bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-all py-1.5 px-2 rounded-lg"
              onClick={handleFav}
            >
              <Heart weight="regular" size={20} />
              {item.likes !== "0" && item.likes}
            </button>
          ) : (
            <Link
              to={`/detail/${item.id}`}
              className="flex gap-1 text-sm items-center bg-gray-100 border border-gray-300 hover:bg-gray-200 transition-all py-1.5 px-2 rounded-lg"
            >
              <Heart weight="regular" size={20} />
              {item.likes !== "0" && item.likes}
            </Link>
          )}
          {twitType === "main" && (
            <>
              <Link
                to={`/detail/${item.id}`}
                className="flex gap-1 text-sm items-center bg-gray-100 border-gray-300 border hover:bg-gray-200 transition-all py-1.5 px-2 rounded-lg"
              >
                <ChatTeardropText size={20} />
                {item.replies !== "0" && item.replies}
              </Link>
              <Link to={`/detail/${item.id}`} className="p-2">
                <DotsThreeOutline size={20} />
              </Link>
            </>
          )}
          {user ? (
            user.role === "ADMIN" ? (
              <button onClick={handleTwitDelete}>
                <Trash size={20} />
              </button>
            ) : user.id === item.author_id ? (
              <button onClick={handleTwitDelete}>
                <Trash size={20} />
              </button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </div>

        <p className="font-bold text-gray-600 text-xs">
          {new Date(item.createdat).toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          })}
        </p>
      </div>
    </div>
  );
}
