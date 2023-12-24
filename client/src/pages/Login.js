import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";
import { ReactComponent as GoogleIcon } from "assets/icons/google.svg";

const Login = () => {
  const currentUser = AuthService.getCurrentUser();

  let navigate = useNavigate();
  if (currentUser) {
    navigate("/chat");
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setIsLoading(true);

    AuthService.login(email, password).then(
      () => {
        navigate("/create");
        window.location.reload();
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setIsLoading(false);
        setMessage(resMessage);
        alert(resMessage);
      }
    );
    console.log(message);
  };

  return (
    <div
      className={`w-screen h-screen flex justify-center items-center bg-[#fcf4e6]`}
    >
      <div
        className={`mx-auto w-[600px] sm:w-[100%] px-4 py-16 sm:px-6 lg:px-8`}
      >
        <div className="mx-auto max-w-lg">
          <form
            className="mb-0 mt-6 space-y-8 rounded-lg p-4 shadow-lg sm:p-8 lg:p-8 group"
            noValidate
            onSubmit={handleLogin}
          >
            <p className="text-center text-lg font-medium">
              Sign in to your account
            </p>

            <div>
              <label htmlFor="email">
                <span>Email</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm peer"
                  placeholder="Enter email"
                  required
                  onChange={onChangeUsername}
                />
                <span className="mt-2 ml-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid email address
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="password">
                <span className="mb-2">Password</span>
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm peer"
                  placeholder="Enter password"
                  required
                  onChange={onChangePassword}
                  pattern=".{1,}"
                />
                <span className="mt-2 ml-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Your password must be at least 8 characters long
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white group-invalid:pointer-events-none group-invalid:opacity-50"
              onClick={handleLogin}
              disabled={isLoading}
            >
              LOG IN
            </button>

            <hr className="my-6 border-gray-300 w-full"></hr>

            <button
              type="button"
              className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-gray-900 font-semibold rounded-lg px-4 py-3 border border-gray-300"
            >
              <div className="flex items-center justify-center">
                <GoogleIcon />
                <span className="ml-4">Log in with Google</span>
              </div>
            </button>

            <p className="text-center text-sm text-gray-500">
              No account?&nbsp;
              <Link to="/register" className="text-blue-800">
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
