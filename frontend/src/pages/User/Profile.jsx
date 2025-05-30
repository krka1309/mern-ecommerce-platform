import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useProfileMutation } from "../../redux/api/userApiSlice";
import { Link } from "react-router";
import { toast } from "react-toastify";
import { setCredentials } from "../../redux/features/auth/authSlice";
const Profile = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();
  const dispatch = useDispatch();
  useEffect(() => {
    setUserName(userInfo.userName);
    setEmail(userInfo.email);
  }, [userInfo.userName, userInfo.email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Password does not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          userName,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
        toast.success("User updated successfully");
      } catch (error) {
        toast.error(error?.data?.message || error.data);
      }
    }

    console.log("Hi");
  };
  return (
    <div className="container mx-auto p-4 mt-[10rem]">
      <div className="flex justify-center align-center md:flex md:space-x-4">
        <div className="md:w-1/3">
          <h2 className="text-2xl font-semibold mb-4">Update Profile</h2>
          <form action="" onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="userName" className="block text-white mb-2">
                Username
              </label>
              <input
                className="form-input p-4 rounded-sm w-full"
                type="text"
                value={userName}
                placeholder="Enter your name"
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white mb-2">
                Email
              </label>
              <input
                className="form-input p-4 rounded-sm w-full"
                type="email"
                value={email}
                placeholder="Enter your email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white mb-2">
                Password
              </label>
              <input
                className="form-input p-4 rounded-sm w-full"
                type="password"
                value={password}
                placeholder="Enter your password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="confirmPass" className="block text-white mb-2">
                Confirm Password
              </label>
              <input
                className="form-input p-4 rounded-sm w-full"
                type="password"
                value={confirmPassword}
                placeholder="Enter your confirm password"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
            <div className="flex justify-between">
              <button
                className="bg-pink-500 my-[1rem] px-4 py-2 rounded cursor-pointer text-white"
                type="submit"
              >
                Update
              </button>

              <Link className="bg-pink-500 my-[1rem] px-4 py-2 rounded cursor-pointer text-white">
                {loadingUpdateProfile ? "Updating" : "My Orders"}
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
