import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ThemeContext } from "../common/Context";

import AuthService from "../services/auth.service";

const Register = (props) => {
  const theme = useContext(ThemeContext);

  const currentUser = AuthService.getCurrentUser();

  let navigate = useNavigate();
  if (currentUser) {
    navigate("/chat");
  }

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cmPassword, setCmPassword] = useState("");
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const onChangeCmPassword = (e) => {
    const cmPassword = e.target.value;
    setCmPassword(cmPassword);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    AuthService.register(username, email, password).then(
      (response) => {
        console.log("response: ", response);
        setMessage(response.data.message);
        setSuccessful(true);
        navigate("/login");
      },
      (error) => {
        const resMessage =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();
        setMessage(resMessage);
        setSuccessful(false);
      }
    );
    console.log(successful);
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
          >
            <p className="text-center text-lg font-medium">
              Sign up to your account
            </p>

            <div>
              <label htmlFor="username">
                <span className="">Username</span>
                <input
                  type="text"
                  name="username"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm peer"
                  placeholder="Enter username"
                  onChange={onChangeUsername}
                  required
                />
                <span className="mt-2 ml-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a username
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="email">
                <span className="">Email</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm peer"
                  placeholder="Enter email"
                  required
                  onChange={onChangeEmail}
                  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                />
                <span className="mt-2 ml-2 hidden text-sm text-red-500 peer-[&:not(:placeholder-shown):not(:focus):invalid]:block">
                  Please enter a valid email address
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="password">
                <span className="">Password</span>
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm peer"
                  placeholder="Enter password"
                  onChange={onChangePassword}
                  required
                  pattern=".{8,}"
                />
              </label>
            </div>

            <div>
              <label htmlFor="confirmPassword">
                <span className="">Confirm Password</span>
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm peer"
                  placeholder="Enter password"
                  onChange={onChangeCmPassword}
                  required
                  pattern=".{8,}"
                />
              </label>
            </div>

            <button
              type="submit"
              className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white group-invalid:pointer-events-none group-invalid:opacity-50"
              onClick={handleRegister}
              disabled={password !== cmPassword}
            >
              REGISTER
            </button>

            <p className="text-center text-sm text-gray-500">
              Already have an account?&nbsp;
              <Link to="/login" className="text-blue-800">
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
