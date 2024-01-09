import React, { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { viewApp } from "../../Url";
import { useParams, useSearchParams } from "react-router-dom";
import './Profile.scss'

const ViewUser = () => {
  const [user, setUser] = useState({});
  const { id } = useParams();
  useEffect(() => {
    axiosInstance.get(viewApp+id).then(res=>{
        setUser(res.data.user)
    })
  });

  return (
    <div className="profile">
      <div>
        <img />
      </div>

      <div className="pc-container">
        <h2>Profile</h2>
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
        </div>
      </div>
    </div>
  );
};

export default ViewUser;
