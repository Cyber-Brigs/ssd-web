import React, { useState } from "react";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  setRefreshToken,
  setAccessToken,
  setLoggedInUserRef,
} from "../../features/user/userSlice";
import { requestToken } from "../../api/users/users";
import jwt_decode from "jwt-decode";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { CircularProgress, Box } from "@mui/material";
import Copyright from "../utilities/Copyright";

const LogIn = () => {
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [accActiveErrorMessage, setAccActiveErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [user_code, setUserCode] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const { username, password } = values;

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleTogglePassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setIsSubmitting(true);
    requestToken(username, password)
      .then((response) => {
        if (response.status === 200) {
          // decodes JWT to determine user role and reference
          setSuccessMessage("Login successful!");
          setValues({
            username: "",
            password: "",
          });
          setIsSubmitting(false);
          const decodedToken = jwt_decode(response.data.access);

          dispatch(setAccessToken({ accessToken: response.data.access }));
          dispatch(
            setLoggedInUserRef({ loggedInUserRef: decodedToken.user_id })
          );
          dispatch(setRefreshToken({ refreshToken: response.data.refresh }));
          navigate("/user");
        }
      })
      .catch((err) => {
        console.log(err);

        if (err.response && err.response.data) {
          if (err.response.data.error) {
            setErrorMessage(err.response.data.error);
          } else if (err.response.data.message) {
            setAccActiveErrorMessage(err.response.data.message);
            setUserCode(err.response.data.user_id);
          }
        }

        setIsSubmitting(false);
        setValues({
          username: "",
          password: "",
        });
      });
  };
  const handleHover = () => {
    if (isSubmitting) {
      return "cursor-not-allowed";
    } else {
      return "cursor-pointer hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue";
    }
  };

  return (
    <div>
      <Navbar />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
        marginX={{ xs: 2, sm: 0 }}
      >
        <Box
          bgcolor="white"
          p={2}
          borderRadius={1}
          boxShadow={3}
          border={1}
          borderColor="primary.main"
          width="100%"
          maxWidth="600px"
        >
          <h2 className="mb-6 font-semibold">
            Login to the CYBER-BRIGS NLP platform
          </h2>
          {successMessage && (
            <div className="mt-2 text-green-600 mb-3 text-sm">
              {successMessage}
            </div>
          )}
          {errorMessage && (
            <div className="mt-2 text-red-600 mb-3 text-sm">{errorMessage}</div>
          )}
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="mb-4">
              <label className="block md:text-[16px] mb-2 text-[10px]">
                Username
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-grey-600 rounded text-xs"
                placeholder="Pschirano"
                value={username}
                onChange={handleChange("username")}
              />
              <label className="block  mb-2 mt-2 text-[10px] md:text-[16px]">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  className="w-full px-3 py-2 border border-grey-600 rounded text-[10px] md:text-[16px]"
                  placeholder="******"
                  value={password}
                  onChange={handleChange("password")}
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm focus:outline-none"
                >
                  {showPassword ? <FiEye size={15} /> : <FiEyeOff size={15} />}
                </button>
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`${handleHover()} w-full text-[13px] md:text-[16px] bg-custom-blue text-white py-2 mt-4 rounded hover:bg-white hover:text-custom-blue hover:border-2 hover:border-custom-blue`}
              >
                {isSubmitting ? (
                  <>
                    <CircularProgress sx={{ color: "white" }} size={20} />{" "}
                    Authenticating Credentials...
                  </>
                ) : (
                  "Sign me in"
                )}
              </button>
              <p className="mt-5 md:text-[16px] text-gray-600 text-[10px]">
                Don't have a platform account
                <Link
                  to={"/sign-up"}
                  className="text-custom-blue ml-1 md:text-[16px] text-[10px]"
                >
                  Sign up here
                </Link>
              </p>
            </div>
          </form>
        </Box>
      </Box>
      <Copyright />
    </div>
  );
};

export default LogIn;
