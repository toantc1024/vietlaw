import { redirect } from "react-router-dom";

import React, { useEffect, useState } from "react";
import { useUserStore } from "../../app/store";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const { user, login, setError } = useUserStore();

  useEffect(() => {
    setError(false);
    console.log({ user });
  }, []);
  const navigate = useNavigate();

  useEffect(() => {
    if (user && user.token) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md border-[1px] lg:max-w-sm">
        <h1 className="text-3xl font-semibold text-center text-blue-700 ">
          Sign in
        </h1>
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            try {
              await login(username, password);
            } catch (error) {}

            // send Resposne to login

            // if login success redi

            // if login fail show error message

            // Redirect to dashboard use react-router-dom function
          }}
          className="mt-6"
        >
          <div className="mb-2">
            <label
              for="email"
              className="block text-sm font-semibold text-gray-800"
            >
              Username
            </label>
            <input
              value={username}
              onChange={(e) => {
                let newUsername = e.target.value;
                setUsername(newUsername);
              }}
              // type="email"
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <div className="mb-2">
            <label
              for="password"
              className="block text-sm font-semibold text-gray-800"
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                let newPassword = e.target.value;
                setPassword(newPassword);
              }}
              className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
            />
          </div>
          <a href="#" className="text-xs text-blue-600 hover:underline">
            Forget Password?
          </a>
          <div className="mt-6">
            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
              Login
            </button>
          </div>
        </form>

        <p className="mt-8 text-xs font-light text-center text-gray-700">
          {" "}
          Don't have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:underline">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
