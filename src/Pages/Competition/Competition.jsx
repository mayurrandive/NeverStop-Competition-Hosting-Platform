import { Box, Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { comp } from "../../assets/assets";
import axiosInstance from "../../axiosInstance";
import { DELETE_COMP } from "../../Url";
import { useSelector } from "react-redux";
import { useParams } from "react-router";

function formatDate(date) {
  let readableDate = new Date(date);
  return readableDate.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",
  p: 4,
};

const Competition = (props) => {
  const {
    apply,
    already_applied,
    del,
    posted,
    req,
    name,
    teamsize,
    description,
    deadline,
    createdAt,
    location,
    creator,
    id,
    status,
    is_accepted,
    fullName,
    fetchData,
  } = props;

  const {compId} = useParams();

  const [open, setOpen] = useState(false);
  const [imgg, setImgg] = useState(null);

  const [open2, setOpen2] = useState(false);
  const navigate = useNavigate();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleOpen2 = () => setOpen2(true);
  const handleClose2 = () => setOpen2(false);

  useEffect(() => {
    let vari = name.length % 6;
    setImgg(comp[vari]);
  }, []);


  const curUser = useSelector((state) => state.auth).user;

  return (
    <div className="lol">
      <div className="MainCardDiv">
        <div className="card-img">
          <img src={imgg} alt="competition-img" className="Eventlogo" />
        </div>
        <div className="card-data">
          <div className="card-main">
            <h3>{name}</h3>
            {posted && (
              <p>
                Posted By: <span>{fullName}</span>
              </p>
            )}
          </div>
          <div className="card-des">
            <p>{description}</p>
          </div>
          <div className="card-sec">
            <div className="pro">
              <div className="card-info"> Team-Size</div>
              <p>{teamsize}</p>
            </div>
            <div className="pro">
              <div>Location</div>
              <p>{location}</p>
            </div>
            <div className="pro">
              <div>Created On</div>
              <p>{formatDate(createdAt)}</p>
            </div>
            <div>
              <div>Deadline</div>
              <p>{formatDate(deadline)}</p>
            </div>
          </div>

          <div className="card-btn">
            {!already_applied && apply && (
              <button onClick={handleOpen2} className="Button apply">
                Apply
              </button>
            )}
            {/* <button className="Button cancel">Cancel</button> */}
            {!already_applied && del && (
              <button
                onClick={() => {
                  navigate("/view-application", { state: { ...props } });
                }}
                className="Button apply"
              >
                View Applications
              </button>
            )}
            {!already_applied && del && (
              <button
                onClick={() => {
                  axiosInstance.delete(DELETE_COMP + id).then((res) => {
                    fetchData();
                  });
                }}
                className="Button cancel"
              >
                Delete
              </button>
            )}
            {already_applied && !is_accepted && (
              <button className="Button yellow">Already Applied</button>
            )}
            {is_accepted && (
              <button className="Button accepted">Accepted</button>
            )}
    

          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default Competition;
