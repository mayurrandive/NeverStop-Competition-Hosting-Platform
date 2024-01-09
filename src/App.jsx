import "./App.scss";
import React, { useState, useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Dashboard/Home";
import PostCompetition from "./Pages/PostCompetition/PostCompetition";
import Profile from "./Pages/Profile/Profile";
import Error from "./Pages/Error/Error";
import Signin from "./Pages/Profile/Signin";
import Signup from "./Pages/Profile/Signup";
import Requested from "./Pages/Requested/Requested";
import MenuOverlay from "./Components/MenuOverlay/MenuOverlay";
import Decision from "./Components/Accept/Decline/Decision";
import ViewUser from "./Components/ViewUser/ViewUser";
import RequireAuth from "./ReqAuth";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [theme, setTheme] = useState("light_theme");
  let dark = false;

  const toggleTheme = () => {
    if (theme === "dark_theme") {
      setTheme("light_theme");
    } else {
      setTheme("dark_theme");
    }
  };

  const toggleTheme_userPref = () => {
    if (dark === true) {
      setTheme("dark_theme");
    } else {
      setTheme("light_theme");
    }
  };

  useEffect(() => {
    toggleTheme_userPref();
  }, [dark]);

  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <div className="App">
      <ToastContainer position="top-right" />
      <Navbar toggleTheme={toggleTheme} />
      <MenuOverlay />
      <Routes>
        {/* Auth Routes */}
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Home />} />
          {/* <Route path="/competition/:compId" element={<Competition />} /> */}
          <Route path="/posted" element={<PostCompetition />} />
          <Route path="/applied" element={<Requested />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/view-application" element={<Decision />} />
          <Route path="/view-user" element={<ViewUser />} />
          <Route path="/view-profile/:id" element={<ViewUser />} />
        </Route>
        <Route path="*" element={<Error />} />
      </Routes>
    </div>
  );
}

export default App;
