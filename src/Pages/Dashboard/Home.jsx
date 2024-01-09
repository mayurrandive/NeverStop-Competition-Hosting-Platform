import React, { useEffect, useState } from "react";
import ContestCard from "../../Components/ContestCard/ContestCard";
import axiosInstance from "../../axiosInstance";
import { ALL_COMPS } from "../../Url";
import { useSelector } from "react-redux";
import Spinner from "../../Components/Spinner/Spinner";
import { toast } from "react-toastify";

const Home = () => {
  const [cps, setCps] = useState([]);
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const [totalComp, setTotalComp] = useState(0);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = React.useRef();

  const curUser = useSelector((state) => state.auth).user;

  const fetchData = async (link) => {
    setLoading(true);
    toast.loading("Loading...");
    await axiosInstance
      .get(link)
      .then(function (res) {
        setCps(res.data.results);
        setNext(res.data.next);
        setPrev(res.data.previous);
        setTotalComp(res.data.count);
        setLoading(false);
      })
      .catch(function (err) {
        console.log(err);
        setLoading(false);
      });
    toast.dismiss();
  };
  useEffect(() => {
    fetchData(ALL_COMPS);
  }, [curUser]);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchData(ALL_COMPS + "?search=" + inputRef.current.value);
    setQuery(inputRef.current.value);
  };

  const handleSearchNormal = (e) => {
    fetchData(ALL_COMPS + "?search=" + inputRef.current.value);
    setQuery(inputRef.current.value);
  };

  const PageNavigator = () =>
    (next || prev) && (
      <div
        style={{
          margin: "1rem auto",
          padding: "10px 1rem",
          display: "flex",
        }}
        className="pc-container"
      >
        {prev && (
          <button className="Button yellow" onClick={() => fetchData(prev)}>
            Prev
          </button>
        )}
        {next && (
          <button className="Button apply" onClick={() => fetchData(next)}>
            Next
          </button>
        )}
      </div>
    );

  return (
    <div>
      <div
        className="pc-container"
        style={{ margin: "1rem auto", padding: "10px 1rem", display: "flex" }}
      >
        <form
          onSubmit={handleSearch}
          style={{ display: "flex", width: "100%" }}
        >
          <input type="text" placeholder="Search..." ref={inputRef} />
          <span
            className="btn_reload"
            style={{ marginLeft: "10px" }}
            type="submit"
            // click to submit using form
            onClick={handleSearch}
          >
            Search
          </span>
        </form>
        <span
          className="btn_reload"
          style={{ marginLeft: "10px" }}
          onClick={() => {
            fetchData(ALL_COMPS);
            setQuery("");
            inputRef.current.value = "";
          }}
        >
          Reload
        </span>
      </div>

      {!totalComp ? (
        <h3>No Contest has been posted</h3>
      ) : (
        <h3 style={{ textAlign: "center" }}>
          {totalComp ? (
            <>
              {query ? "Search Result" : "Registered Contests"} : {totalComp}
            </>
          ) : (
            "No Contest has been posted"
          )}
        </h3>
      )}
      <PageNavigator />
      {cps.map((cp) => {
        if (cp.creator != curUser.id) {
          return (
            <ContestCard
              key={cp.id}
              handleSearch={handleSearchNormal}
              apply="true"
              posted="true"
              {...cp}
            />
          );
        }
      })}
      <PageNavigator />
    </div>
  );
};

export default Home;
