import React from "react";
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userApiSlice";
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  const { userInfo } = useSelector((state) => state.auth);
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      // toast.error("Password does not match");
      console.log("Password does not match");
    } else {
      try {
        const res = await register({ userName, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User registerd successfully");
      } catch (error) {
        console.log(error.data);
      }
    }
  };
  return (
    <section className="pl-[10rem] flex flex-wrap">
      <div className="mr-[4rem] mt-[5rem]">
        <h1 className="text-2xl font-semibold mb-4">Register</h1>
        <form onSubmit={handleSubmit} className="container w-[40rem]">
          <div className="my-[2rem]">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-white mt-2"
            >
              Name
            </label>
            <input
              type="text"
              value={userName}
              placeholder="Enter your name"
              onChange={(e) => setUserName(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <label
              htmlFor="email"
              className="block text-sm font-medium text-white mt-2"
            >
              Email
            </label>
            <input
              type="email"
              value={email}
              placeholder="Enter your email"
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
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
              placeholder="Enter your Password"
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <label
              htmlFor="confirmPass"
              className="block text-sm font-medium text-white mt-2"
            >
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              placeholder="Confirm Password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-2 p-2 border rounded w-full"
            />
            <button
              // disabled={isLoading}
              type="submit"
              className="bg-pink-500 my-[1rem] px-4 py-2 rounded cursor-pointer text-white"
            >
              {isLoading ? "Registering..." : "Register"}
            </button>
          </div>
          {/* {isLoading && <Loader />} */}
        </form>
        <div>
          <p>
            Already have an account ? {"  "}
            <Link
              to={redirect ? `/login?redirect=${redirect}` : "/login"}
              className="text-pink-500 hover:underline cursor-pointer"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
