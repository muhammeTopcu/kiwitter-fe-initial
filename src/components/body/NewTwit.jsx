import { useForm } from "react-hook-form";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import axios from "axios";

export default function NewTwit({ replyTo = null }) {
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const { user } = useContext(UserContext);

  // const endPoint = replyTo
  //   ? `https://kiwitter-node-77f5acb427c1.herokuapp.com/twits/${replyTo}/replies`
  //   : "https://kiwitter-node-77f5acb427c1.herokuapp.com/twits";

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (newTwitData) => {
  //     return axios.post(endPoint, newTwitData, {
  //       headers: {
  //         Authorization: localStorage.getItem("kiwitter_user"),
  //       },
  //     });
  //   },
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: replyTo ? ["twitDetail", String(replyTo)] : ["mainPageTwits"],
  //     });
  //   },
  // });

  const contentText = watch("content");

  // const sendTwit = (data) => {
  //   const newTwitData = {
  //     author_id: user.id,
  //     ...data,
  //     replyTo: replyTo,
  //   };
  //   mutation.mutate(newTwitData);
  //   reset();
  // };

  const sendTwit = (data) => {
    if (!user) return;

    const newTwit = {
      id: Date.now(),
      content: data.content,
      user: user,
      replyTo: replyTo,
      createdAt: new Date().toISOString(),
    };

    const existingTwits = JSON.parse(localStorage.getItem("twits")) || [];

    const updatedTwits = [newTwit, ...existingTwits];

    localStorage.setItem("twits", JSON.stringify(updatedTwits));

    reset();
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <p className="text-xl">Ne düşünüyorsun?</p>
      <form onSubmit={handleSubmit(sendTwit)}>
        <textarea
          {...register("content")}
          className="w-full h-20 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-lime-500 transition duration-200 ease-in-out block mt-1 mb-2 p-2 text-sm resize-none"
          placeholder="Düşüncelerini buraya yaz..."
        ></textarea>
        <div className="flex items-center justify-between">
          <span
            className={`text-xs font-medium ${
              contentText.length > 160 ? "text-red-500" : "text-gray-600"
            }`}
          >
            {160 - contentText.length} karakter kaldı
          </span>
          <button
            className="h-8 px-4 rounded-md bg-lime-600 text-white font-medium transition duration-200 ease-in-out hover:bg-lime-700 disabled:opacity-70 disabled:cursor-not-allowed text-sm"
            disabled={contentText.length === 0 || contentText.length > 160}
          >
            Gönder
          </button>
        </div>
      </form>
    </div>
  );
}
