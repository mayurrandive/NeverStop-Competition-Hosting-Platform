import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="pc-container" style={{ textAlign: "center" }}>
      <h2>This Page dosen't exist</h2>
      <Link to="/">
        <button className="Button apply "> Go Back...</button>
      </Link>
    </div>
  );
};

export default Error;
