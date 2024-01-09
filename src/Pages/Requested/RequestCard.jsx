import React from "react";
import "./RequestCard.scss";

const RequestCard = ({ name, status }) => {
  var result = status ? "Accepted" : "Pending";

  return (
    <div>
      <div className="StatusMainDiv ">
        <h3>{name}</h3>
        <div className={`Button ${status ? "accepted" : "rejected"}`}>
          {result}
        </div>
      </div>
    </div>
  );
};

export default RequestCard;
