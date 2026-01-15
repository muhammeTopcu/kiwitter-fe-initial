import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import PageLayout from "../layout/PageLayout";
import Twit from "./Twit";
import { UserContext } from "../context/UserContextProvider";

export default function UserTwits() {
  const { nickname } = useParams();
  const { setSearch } = useContext(UserContext);

  const [twits, setTwits] = useState([]);

  useEffect(() => {
    setSearch("");

    const storedTwits = JSON.parse(localStorage.getItem("twits")) || [];
    const filtered = storedTwits.filter(
      (twit) => twit.user?.nickname === nickname
    );

    setTwits(filtered);
  }, [nickname, setSearch]);

  return (
    <PageLayout>
      <div className="bg-white rounded-xl shadow-xl">
        {twits.length === 0 ? (
          <div className="p-6 text-center">Henüz twit yok.</div>
        ) : (
          twits.map((twit) => <Twit key={twit.id} item={twit} />)
        )}
      </div>
    </PageLayout>
  );
}
