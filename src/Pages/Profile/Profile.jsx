import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router";
import { logout } from "../../Redux/AuthSlice";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState({});

  const navigate = useNavigate();

  const curUser = useSelector((state) => state.auth).user;
  const dispatch = useDispatch()

  useEffect(() => {
    if (!curUser) navigate("/signin");
    else setUser(curUser);
  }, [curUser]);

  return (
    <div className="profile">
      <div className="pc-container">
        <h2>My Profile</h2>
        <div>
          <p>Id</p>
          <div className="profile-val">{user?.id}</div>
        </div>
        <div>
          <p>Email id</p>
          <div className="profile-val">{user?.email}</div>
        </div>
        <div>
          <p>Name</p>
          <div className="profile-val">{user?.fullName}</div>
        </div>
        <div>
          <p>College</p>
          <div className="profile-val">{user?.college}</div>
        </div>
        <div>
          <p>About</p>
          <div className="profile-val">{user?.about}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <button
            className="Button yellow"
            onClick={() => {
              localStorage.clear();
              dispatch(logout())
              toast.success("Logged out successfully");
              navigate("/signin");
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
