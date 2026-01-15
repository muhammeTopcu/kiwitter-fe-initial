import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../../public/kiwitter.png";
import login from "../../../public/login.png";
import logout from "../../../public/logout.png";
import { UserContext } from "../context/UserContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const { user, setUser, search, setSearch } = useContext(UserContext);

  const handleLogout = () => {
    localStorage.removeItem("kiwitter_user");
    setUser(null);

    toast.success("Successful exit.", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  return (
    <div className="container mx-auto top-0 bg-white shadow-md">
      <header className="mx-auto p-6">
        <nav className="flex justify-around items-center">
          <div className="w-16 h-16">
            <Link to="/">
              <span className="text-lg font-bold text-lime-800">Kiwitter</span>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="flex justify-center py-4">
            <div className="relative w-full sm:w-80 md:w-96">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full py-3 px-5 pr-12 rounded-full border border-gray-300 shadow-lg transition duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                placeholder={
                  search.length === 0 ? "Search Kiwitter..." : search
                }
              />
              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-green-500">
                <svg
                  className="h-5 w-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 4a7 7 0 100 14 7 7 0 000-14zm1 0h.01M15.86 15.86l3.44 3.44M8.88 8.88l3.44-3.44"
                  />
                </svg>
              </span>
            </div>
          </div>
          <div className="flex gap-5 items-center">
            {user ? (
              <span className="text-lg font-bold text-lime-800">
                <Link to={`/profile/${user.nickname}`}>My Account</Link>
              </span>
            ) : (
              <Link to="/signup">
                <span className="text-lg font-bold text-lime-800">Sign Up</span>
              </Link>
            )}
            ||
            {user ? (
              <button onClick={handleLogout}>
                <img className="w-12 h-12" src={logout} alt="logout" />
              </button>
            ) : (
              <Link to="/login">
                <img className="w-12 h-8" src={login} alt="login" />
              </Link>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
}
