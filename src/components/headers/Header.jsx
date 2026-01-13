import { Link } from "react-router-dom/cjs/react-router-dom.min";
import logo from "../../../public/kiwitter.png";
import login from "../../../public/login.png";
import logout from "../../../public/logout.png";
import { UserContext } from "../../context/UserContextProvider";
import { useContext } from "react";
import { toast } from "react-toastify";

export default function Header() {
  const { user, setUser } = useContext(UserContext);

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
    <div className="container mx-auto sticky top-0 bg-white shadow-md">
      <header className="mx-auto p-6">
        <nav className="flex justify-around items-center">
          <div className="w-16 h-16">
            <Link to="/">
              <span className="text-lg font-bold text-lime-800">Kiwitter</span>
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <Link to="/">
            <div className="text-lg font-bold text-lime-800">Home Page</div>
          </Link>
          <div className="flex gap-5 items-center">
            {user ? (
              <span className="text-lg font-bold text-lime-800">
                My Account
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
