import PageLayout from "../layout/PageLayout";
import Twit from "./Twit";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import NewTwit from "./NewTwit";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";
import Search from "./Search";

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["mainPageTwits"],
    queryFn: () =>
      axios.get("https://kiwitter-node-77f5acb427c1.herokuapp.com/twits"),
  });

  const { user, search } = useContext(UserContext);

  const filteredUser =
    data?.data?.data?.filter((user) =>
      user.name.toLowerCase().includes(search.toLowerCase())
    ) || [];

  return (
    <PageLayout>
      {user ? (
        <div className="top-20 mb-6 mx-0 sm:-mx-8">
          <NewTwit />
        </div>
      ) : (
        ""
      )}
      <div className="bg-white rounded-xl shadow-xl">
        {search.length === 0 ? (
          data ? (
            data.data.data.map((twit) => <Twit key={twit.id} item={twit} />)
          ) : (
            <div className="p-6 text-center">Yükleniyor</div>
          )
        ) : data ? (
          filteredUser?.map((user) => <Search key={user.id} item={user} />)
        ) : (
          <div className="p-6 text-center">Yükleniyor</div>
        )}
      </div>
    </PageLayout>
  );
}
