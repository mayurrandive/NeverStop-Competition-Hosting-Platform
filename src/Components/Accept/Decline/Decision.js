import React, { useEffect, useState } from "react";
import ContestCard from "../../ContestCard/ContestCard";
import { ACCEPT_COMP, COMP_STATUS, REMOVE_REQ } from "../../../Url";
import { useLocation } from "react-router";
import axiosInstance from "../../../axiosInstance";
import { toast } from "react-toastify";
import "./Decision.scss";

function groupBy2(xs, prop) {
  var grouped = {};
  for (var i = 0; i < xs.length; i++) {
    var p = xs[i][prop];
    if (!grouped[p]) {
      grouped[p] = [];
    }
    grouped[p].push(xs[i]);
  }
  return grouped;
}

export default function Decision() {
  const location = useLocation();
  const props = location.state;

  const fetchdata = async () => {
    await axiosInstance
      .get(`${COMP_STATUS + props.id + "/compStatus/"}`)
      .then((res) => {
        if (res.data.success) {
          // // console.log(res.data);
          let data = groupBy2(res.data.users, "status");
          if (data.true) setRows2(data.true);
          else setRows2([]);
          if (data.false) setRows(data.false);
          else setRows([]);
        }
      });
  };

  useEffect(() => {
    fetchdata();
  }, []);

  const handleAccept = async (id) => {
    if (rows2.length < props.teamsize) {
      try {
        axiosInstance
          .patch(ACCEPT_COMP + "accept/", {
            userSelectorId: id,
            compId: props.id,
          })
          .then((res) => {
            if (res.data.success) {
              fetchdata();
            }
          });
      } catch (error) {
        toast.error("Some internal error");
      }
    } else {
      toast.error("full team");
    }
  };

  const handleRemove = async (id) => {
    axiosInstance
      .delete(REMOVE_REQ + props.id + "/remove/" + id)
      .then((res) => {
        if (res.data.success) {
          fetchdata();
        }
      })
      .catch();
  };

  const [rows2, setRows2] = useState([]);
  const [rows, setRows] = useState([]);
  console.log(props.id);

  return (
    <>
      <ContestCard {...props} />

      {rows.length && (
        <div className="Table_Container">
          <h2 className="Table_heading">Applied Users</h2>
          <table style={{ width: "100%" }} className="Table">
            <thead className="Table_head">
              <tr className="Table_head">
                <td>Name of applicant</td>
                <td>Profile</td>
                <td>Note</td>
                <td>Action</td>
              </tr>
            </thead>
            {rows.map((row) => {
              return (
                <tbody className="Table_body">
                  <tr>
                    <td>{row.user_applied.fullName}</td>
                    <td>
                      <button
                        onClick={() => {
                          window.open(
                            `/view-profile/${row.user_applied}`,
                            "_blank"
                          );
                        }}
                        className="Button yellow"
                      >
                        View Profile
                      </button>
                    </td>
                    <td>{row.note}</td>
                    <td>
                      <button
                        onClick={() => handleAccept(row.id)}
                        className="Button apply"
                      >
                        Accept
                      </button>
                    </td>
                  </tr>
                </tbody>
              );
            })}
          </table>
        </div>
      )}

      {rows2.length && (
        <div className="Table_Container">
          <h2 className="Table_heading">Selected Users</h2>
          <table style={{ width: "100%" }} className="Table">
            <thead className="Table_head">
              <tr>
                <td>Name of applicant</td>
                <td>Profile</td>
                <td>Note</td>
                <td>Action</td>
              </tr>
            </thead>
            <tbody className="Table_body">
              {rows2.map((row) => {
                return (
                  <tr>
                    <td>{row.user_applied.fullName}</td>
                    <td>
                      <button
                        onClick={() => {
                          window.open(
                            `/view-profile/${row.user_applied}`,
                            "_blank"
                          );
                        }}
                        className="Button yellow"
                      >
                        View Profile
                      </button>
                    </td>
                    <td>{row.note}</td>
                    <td>
                      <button
                        onClick={() => handleRemove(row.id)}
                        className="Button cancel"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
