import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../services/operations/authApi";
import { IoEye, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import IconBtn from "../components/common/IconBtn";

const Login = () => {
  const navigate = useNavigate();
  const loading = useSelector((state) => state.auth.loading);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(formData.email, formData.password, navigate));
  };

  return (
    <div className="flex mt-3 justify-center min-h-screen bg-richblack-900 px-2 sm:px-4 py-8">
      {loading ? (
        <div className="text-white">Loading...</div>
      ) : (
        <div className="flex flex-col w-full max-w-xl bg-richblack-800 rounded-lg shadow-lg">
          <div className="w-full p-6">
            <h1 className="text-2xl font-bold text-center text-white mb-4">
              Welcome Back!
            </h1>
            <p className="text-sm text-gray-400 text-center mb-6">
              Discover the easiest way to buy and sell Used items within your
              campus!
            </p>
            <form onSubmit={handleOnSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Email Address
                </label>
                <input
                  required
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnChange}
                  placeholder="Enter email address"
                  className="mt-1 w-full p-3 text-white bg-richblack-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="relative">
                <label className="block text-sm font-medium text-gray-300">
                  Password
                </label>
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleOnChange}
                  placeholder="Enter Password"
                  className="mt-1 w-full p-3 text-white bg-richblack-700 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 cursor-pointer"
                >
                  {showPassword ? <IoEye fontSize={24} /> : <IoEyeOffOutline fontSize={24} />}
                </span>
              </div>
              <IconBtn
                text="Sign In"
                type="submit"
                customClasses="w-full flex justify-center items-center"
              />
            </form>
            <div
              className="mt-3 text-center text-gray-300 cursor-pointer hover:text-gray-200"
              onClick={() => navigate("/forgot-password")}
            >
              Forgot Password?
            </div>
            <div className="text-sm text-gray-400 text-center mt-3">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-blue-400 cursor-pointer hover:text-blue-300 transition-all duration-300"
              >
                Sign up here.
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
