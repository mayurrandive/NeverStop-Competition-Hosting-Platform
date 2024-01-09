import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import validator from "validator";
import { signup } from "../../Url";
import "./Profile.scss";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [name, setName] = useState("");
  const [college, setCollege] = useState("");
  const [about, setAbout] = useState("");

  // col
  const [colemail, setColEmail] = useState(false);
  const [colpassword, setColPassword] = useState(false);
  const [colname, setColName] = useState(false);
  const [colcollege, setColCollege] = useState(false);
  const [colabout, setColAbout] = useState(false);

  const navigate = useNavigate();

  const curUser = useSelector(state => state.auth.user)

  useEffect(() => {
    if (curUser) {
      navigate("/profile");
    }
  }, [curUser]);

  const handleSubmit = async () => {
    const id = toast.loading("Please wait...");
    let error = false;
    if (!validator.isEmail(email)) {
      error = true;
      setColEmail(true);
    }
    if (!password || password.length < 6) {
      error = true;
      setColPassword(true);
    }
    if (!name) {
      error = true;
      setColName(true);
    }
    if (!college) {
      error = true;
      setColCollege(true);
    }
    if (!about) {
      error = true;
      setColAbout(true);
    }

    if (!error) {
      await axios
        .post(signup, {
          email: email,
          password: password,
          password2: password2,
          about: about,
          college: college,
          fullName: name,
        })
        .then((res) => {
          if (res.data.success) {
            toast.dismiss(id);
            toast.success("Registration success");
            navigate("/signin");
          } else {
            toast.dismiss(id);
            toast.error(res.data.message);
          }
        })
        .catch((er) => {
          toast.dismiss(id);
          for(let i in er.response.data.detail){
            toast.error(er.response.data);
          }
        });
    } else {
      toast.dismiss(id);
      toast.error("Invalid Entries");
    }
  };
  return (
    <>
      <div className="login-box">
        <div className=" flex-r">
          <div className="flex-r login-wrapper">
            <div className="login-text">
              <h1>Sign Up</h1>
              <p className="welcome">
                Hello, Create an account to use our portal!
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
                        setColEmail(false);
                        setEmail(e.target.value);
                      }}
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colemail && (
                    <div className="red-para">Email is not valid</div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">Password</span>
                  <div className=" flex-r input">
                    <input
                      type="password"
                      onChange={(e) => {
                        setColPassword(false);
                        setPassword(e.target.value);
                      }}
                      placeholder="********"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colpassword && (
                    <div className="red-para">
                      Password must be 6 characters long
                    </div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">Confirm Password</span>
                  <div className=" flex-r input">
                    <input
                      type="password"
                      onChange={(e) => {
                        setPassword2(e.target.value);
                      }}
                      placeholder="********"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {/* {password2Match && (
                    <div className="red-para">
                      Password must be 6 characters long
                    </div>
                  )} */}
                </div>
                <div className="input-box">
                  <span className="label">Full Name</span>
                  <div className=" flex-r input">
                    <input
                      onChange={(e) => {
                        setColName(false);
                        setName(e.target.value);
                      }}
                      placeholder="Name"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colname && (
                    <div className="red-para">Full name is required</div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">College</span>
                  <div className=" flex-r input">
                    <input
                      onChange={(e) => {
                        setColCollege(false);
                        setCollege(e.target.value);
                      }}
                      placeholder="IIT Kharagpur"
                    ></input>
                    <i className="fas fa-at"></i>
                  </div>
                  {colcollege && (
                    <div className="red-para">College is required</div>
                  )}
                </div>
                <div className="input-box">
                  <span className="label">About</span>
                  <div className=" flex-r input">
                    <input
                      onChange={(e) => {
                        setColAbout(false);
                        setAbout(e.target.value);
                      }}
                      placeholder="I am a coder and ....."
                    ></input>
                  </div>
                  {colabout && (
                    <div className="red-para">About can not be empty</div>
                  )}
                </div>
                <div className="btn cursorError" onClick={handleSubmit}>
                  Create Account
                </div>
                <br></br>
                <span className="extra-line">
                  <span>Already have an account?</span>
                  <a className="cursorError"
                    href
                    onClick={() => {
                      navigate("/signin");
                    }}
                  >
                    &nbsp;Sign In
                  </a>
                </span>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Signup;
