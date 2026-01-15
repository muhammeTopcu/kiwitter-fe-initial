import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PageLayout from "../layout/PageLayout";
import Twit from "./Twit";
import NewTwit from "./NewTwit";
import { UserContext } from "../context/UserContextProvider";

export default function HomePage() {
  const { user } = useContext(UserContext);

  const [twits, setTwits] = useState([]);

  useEffect(() => {
    const storedTwits = localStorage.getItem("twits");
    if (storedTwits) {
      setTwits(JSON.parse(storedTwits));
    }
  }, []);

  return (
    <PageLayout>
      {user && (
        <div className="top-20 mb-6 mx-0 sm:-mx-8">
          <NewTwit />
        </div>
      )}

      <div className="bg-white rounded-xl shadow-xl">
        {/* Header */}
        <div className="p-6 bg-gray-100 rounded-t-xl">
          <div className="flex justify-between">
            <Link to="/">
              <h2 className="text-xl font-bold text-lime-800 mb-4">
                Tüm Twitler
              </h2>
            </Link>
          </div>
        </div>

        {/* Twit List */}
        {twits.length > 0 ? (
          twits.map((twit) => <Twit key={twit.id} item={twit} />)
        ) : (
          <div className="p-6 text-center text-gray-500">Henüz twit yok</div>
        )}
      </div>
    </PageLayout>
  );
}
