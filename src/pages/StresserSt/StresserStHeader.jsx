import React, { useState, useEffect } from "react";

function StresserStHeader() {
    const [onlineUsers, setOnlineUsers] = useState(0);
    const [totalRunningFloods, setTotalRunningFloods] = useState("0/0");
    const [todaysFloods, setTodaysFloods] = useState(0);
    const [yourAttacksToday, setYourAttacksToday] = useState("0/0");
    const [totalFloods, setTotalFloods] = useState(0);
  
    useEffect(() => {
      const generateRandomValues = () => {
        setOnlineUsers(Math.floor(Math.random() * 200));
        setTotalRunningFloods(`${Math.floor(Math.random() * 10)}/15`);
        setTodaysFloods(Math.floor(Math.random() * 2000));
        setYourAttacksToday(`${Math.floor(Math.random() * 50)}/50`);
        setTotalFloods(prevTotalFloods => prevTotalFloods + Math.floor(Math.random() * 100)); 
      };
  
      generateRandomValues();
  
      const interval = setInterval(() => {
        generateRandomValues();
      }, 120000); 
  
      return () => clearInterval(interval);
    }, []); 
    
  return (
    <>
      <div className="col-sm-12" style={{ marginTop: "6em" }}>
        <div className="box">
          <h1>
            <a href="./stresserSt.html" className="heading">
              Stresser<font color="#4AE96D">.st</font>
            </a>
            <br />
            <font size="4" color="white">
              The best free IP Stresser / Booter, and even better then some paid
              skid stressers.
            </font>
          </h1>
          <ul>
          <li>
            <h5>
              <span id="online_users">{onlineUsers}</span> <br />
              <small>Online Users</small>
            </h5>
          </li>
          <li>
            <h5>
              <span id="total_running_floods">{totalRunningFloods}</span> <br />
              <small>Running Attacks</small>
            </h5>
          </li>
          <li>
            <h5>
              <span id="todays_floods">{todaysFloods}</span> <br />
              <small>Attacks Today</small>
            </h5>
          </li>
          <li>
            <h5>
              <span id="your_attacks_today">{yourAttacksToday}</span> <br />
              <small>Your Attacks Today</small>
            </h5>
          </li>
          <li>
            <h5>
              <span id="total_floods">{totalFloods}</span>
              <br />
              <small>Total Attacks</small>
            </h5>
          </li>
            <li>
              <a href="/" className="rmv noHover">
                <h5>
                  <small>
                    <img
                      alt="Telegram Logo "
                      height="22"
                      width="22"
                      src="tg.png "
                    />
                    Join Telegram Channel
                  </small>
                </h5>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default StresserStHeader;
