import React, { useState } from "react";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/outline";
import AuthHeader from "../components/AuthHeader";
import axiosInstance from "../utils/axios";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

const LoginPage = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO: check validation here
    try {
      const response = await axiosInstance.post("/api/v1/user/login", form);
      console.log(response.data);
      dispatch(setUser({ name: "Mayank" }));
      navigate("/");
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <AuthHeader />
      <div className="flex items-center justify-center min-h-[calc(100vh-4rem)]">
        <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
            Login
          </h2>
          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Email
              </label>
              <div className="relative">
                <EnvelopeIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 font-medium mb-1">
                Password
              </label>
              <div className="relative">
                <LockClosedIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded-md hover:bg-purple-700 transition duration-200"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
