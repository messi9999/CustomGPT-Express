import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import AuthService from "../services/auth.service";

const Register = (props) => {
  const currentUser = AuthService.getCurrentUser();

  let navigate = useNavigate();
  if (currentUser) {
    navigate("/chat");
  }

  const [successful, setSuccessful] = useState(false);
  const [errors, setErrors] = useState({});

  const [fields, setFields] = useState({});

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  const handleInputChange = (field, e) => {
    let newFields = fields;
    newFields[field] = e.target.value;
    handleValidation();
    setFields(newFields);
  };

  const handleValidation = () => {
    let errors = {};
    let formIsValid = true;

    if (!fields["username"]) {
      formIsValid = false;
      errors["username"] = "Cannot be empty";
    }

    if (!validateEmail(fields["email"])) {
      formIsValid = false;
      errors["email"] = "Invalid email address";
    }

    if (!fields["password"] || fields["password"].length < 8) {
      formIsValid = false;
      errors["password"] = "Password must be at least 8 characters";
    }

    if (fields["cmpassword"] !== fields["password"]) {
      formIsValid = false;
      errors["cmpassword"] = "Passwords do not match";
    }

    setErrors(errors);
    return formIsValid;
  }

  const isAllValidate = () => {
    return Object.keys(errors).length === 0;
  }

  const handleRegister = (e) => {
    e.preventDefault();
    setSuccessful(false);

    if(handleValidation()) {

      let { username, email, password } = fields; 

      AuthService.register(username, email, password).then(
        () => {
          setSuccessful(true);
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
          alert(resMessage)
          setSuccessful(false);
        }
      );
      console.log(successful);
    }
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
            className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-lg sm:p-8 lg:p-8"
            onSubmit={handleRegister}
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
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter username"
                  onChange={(e) => handleInputChange("username", e)}
                  required
                />
                <span className="mt-2 ml-2 text-sm text-red-500">
                  {errors.username}
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="email">
                <span className="">Email</span>
                <input
                  type="email"
                  name="email"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter email"
                  required
                  onChange={(e) => handleInputChange("email", e)}
                />
                <span className="mt-2 ml-2 text-sm text-red-500">
                  {errors.email}
                </span>
              </label>
            </div>

            <div>
              <label htmlFor="password">
                <span className="">Password</span>
                <input
                  type="password"
                  name="password"
                  className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
                  placeholder="Enter password"
                  onChange={(e) => handleInputChange("password", e)}
                  required
                />
                <span className="mt-2 ml-2 text-sm text-red-500">
                  {errors.password}
                </span>
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
                  onChange={(e) => handleInputChange("cmpassword", e)}
                  required
                />
                <span className="mt-2 ml-2 text-sm text-red-500">
                  {errors.cmpassword}
                </span>
              </label>
            </div>

            <button
              type="submit"
              className={`block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white ${isAllValidate() ? "opacity-100" : "opacity-50"}`}
              disabled={!isAllValidate()}
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
