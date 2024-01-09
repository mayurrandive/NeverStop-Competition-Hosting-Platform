import React, { useState, useEffect } from "react";
import "./Navbar.scss";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Switch from "react-js-switch";

const NavOpts = [
  { id: 1, opt: "Home", href: "/dashboard" },
  { id: 2, opt: "My-Request", href: "/applied" },
  { id: 3, opt: "My-Competition", href: "/posted" },
  { id: 4, opt: "Profile", href: "/profile" },
];

const Navbar = ({ toggleTheme }) => {
  const [show, setShow] = useState(
    useSelector((state) => state.auth.user) ? true : false
  );
  const user = useSelector((state) => state.auth.user);
  useEffect(() => {
    setShow(user ? true : false);
  }, [user]);

  return (
    <nav className="nav">
      <div className="nav_container">
        <h3 className="nav_team">Dont Stop</h3>
        <Switch onChange={toggleTheme} />
        <ul className="nav_links">
          {NavOpts.map((NavOpt) => {
            const { opt, href, id } = NavOpt;
            if (show) {
              return (
                <li key={id} className="nav_links_li">
                  <Link to={href}>{opt}</Link>
                </li>
              );
            } else {
              if (NavOpt.id === 4) {
                return (
                  <li key={id} className="nav_links_li">
                    <Link to={href}>{opt}</Link>
                  </li>
                );
              }
            }
          })}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
