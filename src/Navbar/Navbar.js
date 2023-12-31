import React, { useState } from "react";
import { NavLink , useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  const logoutHandler = () => {
    // Delete the "token" cookie by setting an expired date
    removeCookie("token", { path: "/", expires: new Date(0) });

    // Redirect user to the '/' path using useNavigate
    navigate("/");
  };

  
  const location = useLocation();

  const tabNames = {
    "/StresserSU": "SU",
    "/StresserZone": "Zone",
    "/StressThem": "Them",
    "/StresserST": "ST",
  };

  const getActiveTab = () => {
    return tabNames[location.pathname] || "";
  };

  
  return (
    <nav
      style={{
        backgroundColor: "#132238",
        color: "#ffffff",
        padding: "15px",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif",
        justifyContent: "flex-start",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
      }}
    >
      <div>
        <NavLink
          to=""
          style={{
            textDecoration: "none",
            color: "#ffffff",
            fontSize: "30px",
            fontWeight: "bolder",
            fontFamily: "inherit",
          }}
          activeClassName="active"
          exact
        >
          Stresser.{getActiveTab() || 'su'}
        </NavLink>
      </div>
      <div>
      <NavLink
          to="/StresserSU"
          style={linkStyle(activeTab === "tab4")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("tab4")}
          onMouseOut={() => setActiveTab("")}
          
        >
          StresserSU
        </NavLink>

        <NavLink
          to="/StresserZone"
          style={linkStyle(activeTab === "StresserZone")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("StresserZone")}
          onMouseOut={() => setActiveTab("")}
        >
          Stresser Zone
        </NavLink>
        <NavLink
          to="/StressThem"
          style={linkStyle(activeTab === "tab3")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("tab3")}
          onMouseOut={() => setActiveTab("")}
        >
          Stress Them
        </NavLink>
        <NavLink
          to="/StresserST"
          style={linkStyle(activeTab === "dashboard")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("dashboard")}
          onMouseOut={() => setActiveTab("")}
        >
          StresserST
        </NavLink>
        <NavLink
          to="/"
          style={linkStyle(activeTab === "tab5")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("tab5")}
          onMouseOut={() => setActiveTab("")}
          onClick={logoutHandler}
        >
          Log Out
        </NavLink>
      </div>

      <style>
        {`
          .nav-link:hover {
            color: #fff;
            boxShadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
          }

          .nav-link.active {
            background-color: #1b3659;
            color: #fff;
            border: 1px solid #000;
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8);
          }
          
        `}
      </style>
    </nav>
  );
};

const linkStyle = (isActive) => ({
  borderRadius: "1em",
  backgroundColor: "#1B3659",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  fontWeight: "bold",
  padding: "0.7em 2em",
  textDecoration: "none",
  color: isActive ? "#fff" : "#767F8B",
  margin: "0 15px",
  fontSize: "16px",
  transition: "color 0.3s, background-color 0.3s",
});

export default Navbar;
