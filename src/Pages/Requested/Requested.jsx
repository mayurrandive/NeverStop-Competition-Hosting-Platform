import React, { useState, useEffect } from "react";
import { SHOW_MY_REQ } from "../../Url";
import RequestCard from "./RequestCard";
import "./Requested.scss";
import axiosInstance from "../../axiosInstance";

const Requested = () => {
  const [cps, setCps] = useState([]);

  const fetchData = async () => {
    await axiosInstance
      .get(SHOW_MY_REQ)
      .then(function (res) {
        setCps(res.data.userSelectors);
      })
      .catch(function (err) {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  return (
    <div className="pc-container">
      <div className="MainDiv">
        <h1>Your Application Status</h1>
      </div>
      {cps?.map((item, i) => {
        return (
          <RequestCard
            key={i}
            name={item.competition.name}
            status={item.status}
            compId={item.competition.id}
          />
        );
      })}
    </div>
  );
};

export default Requested;
