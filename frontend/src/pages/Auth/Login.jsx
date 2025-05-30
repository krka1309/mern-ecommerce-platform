import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
// import { register } from "module";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { search } = useLocation();
  const { userInfo } = useSelector((state) => state.auth);
  const [login, { isLoading }] = useLoginMutation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [redirect, userInfo, navigate]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      console.log(res);
      dispatch(setCredentials({ ...res }));
      navigate(redirect);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="">
      <section className="pl-[10rem] flex flex-wrap">
        <div className="mr-[4rem] mt-[5rem]">
          <h1 className="text-2xl font-semibold mb-4">Sign In</h1>
          <form onSubmit={handleSubmit} className="container w-[40rem]">
            <div className="my-[2rem]">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white"
              >
                Email Address
              </label>
              <input
                type="email"
                value={email}
                id="email"
                className="mt-2 p-2 border rounded w-full mt-2"
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mt-2"
              >
                Password
              </label>
              <input
                type="password"
                value={password}
                className="mt-2 p-2 border rounded w-full"
                placeholder="Enter a password"
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                disabled={isLoading}
                type="submit"
                className="bg-pink-500 text-white px-4 py-2 rounded cursor-pointer my-[1rem]"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
              {isLoading && <Loader />}
            </div>
          </form>
          <div className="mt-4">
            <p className="text-white">
              New Customer?{" "}
              <Link
                to={redirect ? `/register?redirect=${redirect}` : "/register"}
                className="text-pink-500 hover-underline"
              >
                Register
              </Link>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
