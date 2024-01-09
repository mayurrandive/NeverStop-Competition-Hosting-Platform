import React, { useState, useEffect } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import { MY_COMPS, POST_COMP } from "../../Url";
import axiosInstance from "../../axiosInstance";

import "./PostCompetition.scss";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";

const PostCompetition = () => {
  const initial = {
    name: "",
    description: "",
    teamsize: "",
    location: "",
    deadline: "",
  };

  const [comp, setComp] = useState(initial);
  const handleComp = (e) => {
    setComp({
      ...comp,
      [e.target.name]: e.target.value,
    });
  };

  const [cps, setCps] = useState([]);
  const curUser = useSelector((state) => state.auth).user;

  const fetchData = async () => {
    await axiosInstance
      .get(`${MY_COMPS}`)
      .then(function (res) {
        setCps(res.data.competitions);
      })
      .catch(function (err) {
        toast.error(err.response.data.detail);
      });
    setComp(initial);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = () => {
    let error = false;
    let keys = "";
    for (let key in comp) {
      if (comp[key] === "") {
        error = true;
        keys += key + ", ";
      }
    }
    if (error) {
      keys = keys.slice(0, -2);
      toast.error(`Please fill ${keys}`);
    }
    if (!error) {
      axiosInstance
        .post(POST_COMP, {
          ...comp,
          creator: curUser.id,
        })
        .then((res) => {
          if (res.data.success) {
            toast.success(res.data.message);
            fetchData();
          } else {
            toast.error(res.data.detail);
          }
        })
        .catch((er) => {
          toast.error(er.response.data.detail);
        });
    }
  };

  return (
    <div>
      <div className="btn_reload" onClick={fetchData}>
        Reload
      </div>
      <div className="pc-container">
        <h2>Post competition</h2>
        <div>
          <p>Name of Contest</p>
          <input
            onChange={handleComp}
            placeholder="Contest Name"
            name="name"
            value={comp.name}
          />
        </div>
        <div>
          <p>Description</p>
          <textarea
            rows={10}
            onChange={handleComp}
            placeholder="Contest Description"
            name="description"
            value={comp.description}
          />
        </div>
        <div>
          <p>Team Members</p>
          <input
            className="pc-input"
            onChange={handleComp}
            type="number"
            placeholder="5"
            name="teamsize"
            value={comp.teamsize}
          />
        </div>
        <div>
          <p>Location</p>
          <input
            onChange={handleComp}
            placeholder="IIT Kharagpur..."
            name="location"
            value={comp.location}
          />
        </div>
        <div>
          <p>Deadline</p>
          <input
            onChange={handleComp}
            type="date"
            name="deadline"
            value={comp.deadline}
          />
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
          }}
        >
          <button className="Button apply" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>

      {cps?.map((cp) => {
        return (
          <ContestCard fetchData={fetchData} key={cp.id} {...cp} del="true" />
        );
      })}
    </div>
  );
};

export default PostCompetition;
