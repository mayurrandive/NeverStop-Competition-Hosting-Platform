import React from "react";
import "./MenuOverlay.scss";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";

const NavOpts = [
  { id: 1, opt: "Home", href: "/dashboard" },
  { id: 2, opt: "My-Request", href: "/applied" },
  { id: 3, opt: "My-Competition", href: "/posted" },
  { id: 4, opt: "Profile", href: "/profile" },
];

const MenuOverlay = ({ toggleTheme }) => {
  let menuRef = React.useRef();
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    const listner = (event) => {
      if (!menuRef.current.contains(event.target)) {
        setToggle(false);
      }
    };
    "mousedown,scroll".split(",").forEach((e) => {
      document.addEventListener(e, listner);
    });
    return () =>
      "mousedown,scroll".split(",").forEach((e) => {
        document.removeEventListener(e, listner);
      });
  });

  return (
    <div className="mob_container" ref={menuRef}>
      <button className="nav_mobilescreen " onClick={() => setToggle(!toggle)}>
        <Hamburger toggled={toggle} size="25" />
      </button>
      {toggle && (
        <div className="nav_menu slide">
          <ul className="nav_mobile_links ">
            {NavOpts.map((NavOpt) => {
              const { href, data, opt } = NavOpt;
              return (
                <li>
                  <Link className="a_link" to={href} data={data}>
                    {opt}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MenuOverlay;
