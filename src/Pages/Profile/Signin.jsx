import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { sign_in } from "../../Url";
import "./Profile.scss";
import { useNavigate } from "react-router";
import {
  setAccessToken,
  setRefreshToken,
  setUser,
} from "../../Redux/AuthSlice";
import { useDispatch, useSelector } from "react-redux";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const handleSubmit = () => {
    const id = toast.loading("Authenticating...");
    axios
      .post(sign_in, {
        email: email,
        password: password,
      })
      .then((res) => {
        if (res.data.success) {
          localStorage.setItem(
            "refreshToken",
            JSON.stringify(res.data.token?.refresh)
          );

          dispatch(setUser(res.data.user));
          dispatch(setAccessToken(res.data.token?.access));
          dispatch(setRefreshToken(res.data.token?.refresh));
          toast.dismiss(id);
          toast.success(res.data.message);

          navigate("/dashboard");
        } else {
          toast.dismiss(id);
          toast.error("Invalid Email or Wrong Password");
        }
      })
      .catch((err) => {
        toast.dismiss(id);
        toast.error(err.response.data.detail);
      });
  };

  return (
    <>
      <div className="login-box">
        <div className=" flex-r">
          <div className="flex-r login-wrapper">
            <div className="login-text">
              <div className="logo">
                <span></span>
              </div>
              <h1> Sign In</h1>
              <p className="welcome">
                Welcome back. Continue your success journey!{" "}
              </p>

              <form className="flex-c">
                <div className="input-box">
                  <span className="label">E-mail</span>
                  <div className=" flex-r input">
                    <input
                      name="email"
                      type="text"
                      placeholder="name@abc.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                </div>
                <div className="input-box">
                  <span className="label">Password</span>
                  <div className=" flex-r input">
                    <input
                      type="password"
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      placeholder="********"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                </div>
                <div className="btn cursorError" onClick={handleSubmit}>
                  Login
                </div>
              </form>
              <span className="extra-line">
                <span>Not Registered? </span>
                <span
                  className="cursorError"
                  onClick={() => {
                    navigate("/signup");
                  }}
                  style={{
                    color: "var(--sec)",
                  }}
                >
                  Sign Up
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signin;
