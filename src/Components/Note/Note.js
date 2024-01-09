import axiosInstance from "../../axiosInstance";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { APPLY_COMP } from "../../Url";

export const Note = (props) => {
  const [note, setNote] = useState("");

  const { handleSearch, setOpen2 } = props;

  const handleSubmit = async () => {
    const t = toast.loading("Please Wait...");
    try {
      await axiosInstance.patch(
        APPLY_COMP + props.competition + "/apply/",
        {
          note: note,
        }
      ).then((res) => {
        toast.dismiss(t);
        setOpen2(false);
        handleSearch();
        toast.success(res.data.message);
      });
      
    } catch (error) {
      toast.dismiss(t);
      toast.error("Something went wrong");
      props.setOpen2(false);
    }
  };

  return (
    <>
      <div className="pc-container">
        <div>
          <p>Add a note</p>
          <textarea
            onChange={(e) => {
              setNote(e.target.value);
            }}
            value={note}
            placeholder="Type your personalized note here..."
          ></textarea>
        </div>
        <button onClick={handleSubmit} className="Button apply">
          Send Request
        </button>
      </div>
    </>
  );
};

export default Note;
