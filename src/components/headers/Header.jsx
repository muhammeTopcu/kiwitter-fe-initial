import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../../public/kiwitter.png";
import login from "../../../public/login.png";
import logout from "../../../public/logout.png";
import { UserContext } from "../context/UserContextProvider";
import { useContext, useState } from "react";
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
          <div className="text-lg font-bold text-lime-800">
            <div className="flex items-center">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full sm:w-64 py-2 px-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
                placeholder="Search Kiwitter..."
              />
            </div>
          </div>
          <div className="flex gap-5 items-center">
            {user ? (
              <span className="text-lg font-bold text-lime-800">
                My Account
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
