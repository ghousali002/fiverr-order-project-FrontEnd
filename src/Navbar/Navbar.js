import React, { useState } from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("");

  return (
    <nav
      style={{
        backgroundColor: "#132238",
        color: "#ffffff",
        padding: "17px",
        position: "fixed",
        width: "100%",
        top: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        fontFamily: "Poppins, sans-serif", // Apply Poppins font family
        justifyContent: "flex-start		",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",
      }}
    >
      <div>
        <NavLink
          to="/"
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
          Stresser.su
        </NavLink>
      </div>
      <div>
        <NavLink
          to="/dashboard"
          style={linkStyle(activeTab === "dashboard")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("dashboard")}
          onMouseOut={() => setActiveTab("")}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/tab2"
          style={linkStyle(activeTab === "tab2")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("tab2")}
          onMouseOut={() => setActiveTab("")}
        >
          Tab 2
        </NavLink>
        <NavLink
          to="/tab3"
          style={linkStyle(activeTab === "tab3")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("tab3")}
          onMouseOut={() => setActiveTab("")}
        >
          Tab 3
        </NavLink>
        <NavLink
          to="/tab4"
          style={linkStyle(activeTab === "tab4")}
          activeClassName="active"
          exact
          onMouseOver={() => setActiveTab("tab4")}
          onMouseOut={() => setActiveTab("")}
        >
          Tab 4
        </NavLink>
      </div>

      <style>
        {`
          .nav-link:hover {
            color: #fff; /* change text color on hover */
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.8)",

          }

          .nav-link.active {
            background-color: #1b3659; /* active tab background color */
            color: #fff; /* active tab text color */
            border: 1px solid #000; /* square border with black color */
            box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.8); /* black shadow all around */
          }
        `}
      </style>
    </nav>
  );
};

const linkStyle = (isActive) => ({
  backgroundColor: "#1B3659",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
  fontWeight: "bold",
  padding: "0.7em 3em",
  textDecoration: "none",
  color: isActive ? "#fff" : "#767F8B",
  margin: "0 15px",
  fontSize: "16px",
  transition: "color 0.3s, background-color 0.3s",
});

export default Navbar;
