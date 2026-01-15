import { useParams } from "react-router-dom";
import axios from "axios";
import PageLayout from "../layout/PageLayout";
import Twit from "./Twit";
import { useQuery } from "@tanstack/react-query";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";

export default function UserTwits() {
  let { nickname } = useParams();
  // const [userTw, setUserTw] = useState([]);
  const { setSearch } = useContext(UserContext);
  const { data, isSuccess } = useQuery({
    queryKey: ["userTwits", nickname],
    queryFn: () =>
      axios.get(
        `https://kiwitter-node-77f5acb427c1.herokuapp.com/users/${nickname}/twits``https://kiwitter-node-77f5acb427c1.herokuapp.com/users/${nickname}/twits`
      ),
  });
  setSearch("");
  return (
    <PageLayout>
      <div className="bg-white rounded-xl shadow-xl">
        {isSuccess ? (
          data.data.data.length === 0 ? (
            <div className="p-6 text-center">Henüz twit yok.</div>
          ) : (
            data.data.data.map((twit) => <Twit key={twit.id} item={twit} />)
          )
        ) : (
          <div className="p-6 text-center">Yükleniyor</div>
        )}
      </div>
    </PageLayout>
  );
}
