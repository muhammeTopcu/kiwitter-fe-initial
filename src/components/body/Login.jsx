import queryString from "query-string";
import AuthLayout from "../layout/AuthLayout";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

export default function Login() {
  // const { search } = useLocation();
  // const values = queryString.parse(search);
  // console.log(values.expiresIn, "***");

  const { setUser } = useContext(UserContext);
  let history = useHistory();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
  });

  function handleLogin(data) {
    console.log(data, "---");
    axios({
      method: "post",
      url: "https://kiwitter-node-77f5acb427c1.herokuapp.com/login",
      data: data,
    })
      .then((response) => {
        const token = response.data.token;
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        console.log(decodedUser, "*****");
        localStorage.setItem("kiwitter_user", token);

        toast.success(
          `Welcome ${decodedUser.nickname}! I redirect to the home page.`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          }
        );

        setTimeout(() => {
          history.push("/");
        }, 2000);
      })
      .catch(() =>
        toast.error("No Such User Found!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      );
  }

  return (
    <AuthLayout>
      <h1 className="text-3xl text-center font-semibold tracking-tighter text-lime-700">
        Giriş Yap
      </h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="nickname">Kullanıcı adı</label>
            <span className="text-sm font-medium text-red-600">
              {errors.nickname && errors.nickname.message.toString()}
            </span>
          </div>
          <input
            type="text"
            id="nickname"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("nickname", { required: "Bu alan zorunlu" })}
          />
        </div>

        <div className="pt-4">
          <div className="flex justify-between gap-2 items-baseline pb-1">
            <label htmlFor="password">Şifre</label>
            <span className="text-sm font-medium text-red-600">
              {errors.password && errors.password.message.toString()}
            </span>
          </div>
          <input
            type="password"
            id="password"
            className="w-full h-10 px-2 border rounded-md border-gray-300"
            {...register("password", { required: "Bu alan zorunlu" })}
          />
        </div>
        <div className="pt-4">
          <button
            type="submit"
            className="h-12 text-center block w-full rounded-lg bg-lime-700 text-white font-bold "
          >
            GİRİŞ
          </button>
        </div>
      </form>
    </AuthLayout>
  );
}
