import React, { useEffect, useRef, useState } from "react";
import Navbar from "../../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StressThem() {
  const [isHovered, setIsHovered] = useState(false);
  const [isHovered2, setIsHovered2] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAutoAttack, setIsAutoAttack] = useState(false);
  const [intervalId, setIntervalId] = useState(null);
  const [AttacksRunning, setAttacksRunning] = useState(0);
  const [totalAttacks, setTotalAttacks] = useState(0);

  const [targetInfo, setTargetInfo] = useState({
    host: "",
    port: "",
    seconds: "",
    method: "Select Method", // Default value for the method dropdown
  });

  useEffect(() => {
    let attackIntervalId;

    const startAutoAttack = () => {
      // Logic to start the attack goes here
      console.log("Automatic Attack Started");

      const { host, port, seconds } = targetInfo;

      if (!host || !port || !seconds) {
        alert("Missing information. Please fill in all fields.");
      } else {
        setTotalAttacks((prevTotalAttacks) => prevTotalAttacks + 1);

        // All information is provided, you can show a modal or perform other actions
        console.log("Start Attack with:", targetInfo);
        setTableData([
          {
            id: tableData.length + 1, // Generate a unique ID
            host: targetInfo.host,
            port: targetInfo.port,
            seconds: targetInfo.seconds,
            method: targetInfo.method,
            timeRemaining: targetInfo.seconds, // Assuming seconds is the timeRemaining
          },
          ...tableData,
        ]);
        handleRandomData();
      }
    };

    const startAttackInterval = () => {
      attackIntervalId = setInterval(() => {
        startAutoAttack();
      }, 10 * 60 * 2000); // 10 minutes in milliseconds
    };

    // Check if automatic attack is enabled
    if (isAutoAttack) {
      startAttackInterval();
    }

    // Clean up the interval when the component is unmounted or isAutoAttack is false
    return () => {
      if (attackIntervalId) {
        clearInterval(attackIntervalId);
      }
    };
  }, [isAutoAttack, targetInfo]);

  const handleStopAttack = () => {
    // Stop the automatic attack
    setAttacksRunning(0);
    setIsAutoAttack(false);
    toast.success("Attack Stopped");
  };

  const [tableData, setTableData] = useState([]);
  const dataRef = useRef([]);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    // Fetch the dummy data when the component mounts
    const fetchData = async () => {
      try {
        const response = await fetch("./Data.json");
        const data = await response.json();
        dataRef.current = data;
      } catch (error) {
        console.error("Error fetching or parsing dummy data:", error);
      }
    };

    fetchData();
  }, []);

  const handleRandomData = () => {
    // Use a counter to get data in ascending order of indices
    currentIndexRef.current = tableData.length % dataRef.current.length;

    // Set the state with the values from the current index
    setTargetInfo({
      host: dataRef.current[currentIndexRef.current].host,
      port: dataRef.current[currentIndexRef.current].port,
      seconds: dataRef.current[currentIndexRef.current].seconds,
      method: dataRef.current[currentIndexRef.current].method,
    });

    // Update the table data with the values from the current index

    // Increment the currentIndex for the next iteration
    currentIndexRef.current += 1;
  };

  const buttonStyle = {
    background: isHovered ? "#16F442" : "#fff",

    padding: "0.8em 8em",
    transition: "background-color 0.3s ease", // Optional: Add a smooth transition effect
  };
  const buttonStyle2 = {
    background: isHovered2 ? "#16F442" : "#fff",

    padding: "0.5em 9em",
    transition: "background-color 0.3s ease", // Optional: Add a smooth transition effect
  };

  const handleInputChange = (field, value) => {
    setTargetInfo({
      ...targetInfo,
      [field]: value,
    });
  };
  const [activeAttackData, setActiveAttackData] = useState({
    host: null,
    port: null,
    seconds: null,
  });

  const handleStartAttack = () => {
    // Check if automatic attack is already in progress
    if (isAutoAttack) {
      // If true, stop the automatic attack and return
      setIsAutoAttack(false);
      return;
    }

    const { host, port, seconds } = targetInfo;

    if (!host || !port || !seconds) {
      currentIndexRef.current = tableData.length % dataRef.current.length;

      // Set the state with the values from the current index
      setTargetInfo({
        host: dataRef.current[currentIndexRef.current].host,
        port: dataRef.current[currentIndexRef.current].port,
        seconds: dataRef.current[currentIndexRef.current].seconds,
        method: dataRef.current[currentIndexRef.current].method,
      });
    }
    // All information is provided, you can show a modal or perform other actions
    setActiveAttackData({
      host,
      port,
      seconds,
    });

    setTableData([
      ...tableData,
      {
        id: tableData.length + 1, // Generate a unique ID
        host,
        port,
        seconds,
        method: targetInfo.method,
        timeRemaining: targetInfo.seconds, // Assuming seconds is the timeRemaining
      },
    ]);

    setAttacksRunning(1);

    setIsAutoAttack(true);
    toast.success(
      "Attacks will be started automatically after every 10 minutes."
    );
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const modalStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    padding: "2em",
    background: "#242A32",
    zIndex: 1000,
    color: "#fff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    border: "2px solid grey",
    borderRadius: "1em",
  };
  return (
    <>
      <Navbar />
      <div style={containerStyle}>
        <div style={headerStyle}>
          <div style={partitionStyle}>
            <div style={{ display: "flex", alignItems: "center" }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "2em", marginRight: "50px" }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M1.33309 8.07433C0.92156 8.44266 0.886539 9.07485 1.25487 9.48638C1.62319 9.89791 2.25539 9.93293 2.66691 9.5646L1.33309 8.07433ZM21.3331 9.5646C21.7446 9.93293 22.3768 9.89791 22.7451 9.48638C23.1135 9.07485 23.0784 8.44266 22.6669 8.07433L21.3331 9.5646ZM12 19C11.4477 19 11 19.4477 11 20C11 20.5523 11.4477 21 12 21V19ZM12.01 21C12.5623 21 13.01 20.5523 13.01 20C13.01 19.4477 12.5623 19 12.01 19V21ZM14.6905 17.04C15.099 17.4116 15.7315 17.3817 16.1031 16.9732C16.4748 16.5646 16.4448 15.9322 16.0363 15.5605L14.6905 17.04ZM18.0539 13.3403C18.4624 13.7119 19.0949 13.682 19.4665 13.2734C19.8381 12.8649 19.8082 12.2324 19.3997 11.8608L18.0539 13.3403ZM7.96372 15.5605C7.55517 15.9322 7.52524 16.5646 7.89687 16.9732C8.2685 17.3817 8.90095 17.4116 9.3095 17.04L7.96372 15.5605ZM4.60034 11.8608C4.19179 12.2324 4.16185 12.8649 4.53348 13.2734C4.90511 13.682 5.53756 13.7119 5.94611 13.3403L4.60034 11.8608ZM2.66691 9.5646C5.14444 7.34716 8.41371 6 12 6V4C7.90275 4 4.16312 5.54138 1.33309 8.07433L2.66691 9.5646ZM12 6C15.5863 6 18.8556 7.34716 21.3331 9.5646L22.6669 8.07433C19.8369 5.54138 16.0972 4 12 4V6ZM12 21H12.01V19H12V21ZM12 16C13.0367 16 13.9793 16.3931 14.6905 17.04L16.0363 15.5605C14.9713 14.5918 13.5536 14 12 14V16ZM12 11C14.3319 11 16.4546 11.8855 18.0539 13.3403L19.3997 11.8608C17.4466 10.0842 14.8487 9 12 9V11ZM9.3095 17.04C10.0207 16.3931 10.9633 16 12 16V14C10.4464 14 9.02872 14.5918 7.96372 15.5605L9.3095 17.04ZM5.94611 13.3403C7.54544 11.8855 9.66815 11 12 11V9C9.15127 9 6.55344 10.0842 4.60034 11.8608L5.94611 13.3403Z"
                    fill="#0BBF3B"
                  ></path>{" "}
                </g>
              </svg>
              <p style={{ color: "grey", margin: "1em 0em" }}>
                The network is <span style={{ color: "#0BBF3B" }}>online</span>{" "}
                and operating fine
              </p>
            </div>
          </div>

          <div style={partitionStyle}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  fill="#667380"
                  viewBox="0 0 512 512"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "1.5em" }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <path d="M321.85,250.69c-4-33.61-30.39-61-65.85-61-36,0-66.34,30.31-66.34,66.34S220,322.34,256,322.34c35.47,0,61.84-27.41,65.85-61a18.39,18.39,0,0,0,.49-5.32A18.71,18.71,0,0,0,321.85,250.69ZM225.12,256c0-39.95,59.88-39.6,61.76,0C285,295.55,225.12,296,225.12,256Z"></path>
                    <path d="M433.3,238.27H395c-7.27-51.81-41.57-96.15-91.93-114.52a133.34,133.34,0,0,0-29.29-7v-38c0-22.82-35.46-22.86-35.46,0V117c-34.91,4.65-68,22.22-90.69,50.08a141.57,141.57,0,0,0-30.44,71.24H78.7c-22.82,0-22.86,35.46,0,35.46H117a137.24,137.24,0,0,0,18.61,54.45c22.57,37.45,60.88,61.14,102.69,66.63V433.3c0,22.82,35.46,22.86,35.46,0V395.07c2.92-.35,5.85-.75,8.76-1.28,60.25-10.79,104-61.36,112.44-120.06H433.3C456.12,273.73,456.16,238.27,433.3,238.27ZM291.38,354.83a106,106,0,0,1-115.8-31.39c-62-73.5,5.19-188.93,99.84-170.61,49.75,9.63,84.51,53,85.5,103.17C360.05,299.87,333.32,340,291.38,354.83Z"></path>
                  </g>
                </svg>
                <p style={{ color: "grey", margin: "1em 0em" }}>
                  Max. boots per day
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#fff" }}>Unlimited</span>
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  viewBox="0 0 76 76"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  baseProfile="full"
                  enable-background="new 0 0 76.00 76.00"
                  xmlSpace="preserve"
                  fill="#667380"
                  style={{ width: "1.5em" }}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <path
                      fill="#667380"
                      fillOpacity="1"
                      strokeWidth="0.2"
                      strokeLinejoin="round"
                      d="M 23.9999,54L 23.9999,29.25L 16,37.25L 16,26.75L 27.9999,14.75L 40,26.75L 40,37.25L 31.9999,29.25L 31.9999,54L 23.9999,54 Z M 52,22L 52,46.75L 60,38.75L 60,49.25L 48,61.25L 36,49.2499L 36,38.7499L 44,46.75L 44.0001,22L 52,22 Z "
                    ></path>
                  </g>
                </svg>

                <p style={{ color: "grey", margin: "1em 0em" }}>
                  Max. concurrent
                  boots&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#fff" }}>0/1</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={formContainerStyle}>
          <div style={formPartitionStyle}>
            <div>
              <p style={{ color: "#fff" }}>
                <strong>Step 1:</strong> Select attack method
              </p>
            </div>
            <div>
              <p style={{ color: "#0BBF3B" }}>Current Attack Data</p>
            </div>
            <div>
              <button style={{ background: "#fff", padding: "0.5em 10em" }}>
                Layer 4
              </button>
            </div>
            <div style={{ padding: "1em 0em" }}>
              <select
                value={targetInfo.method}
                onChange={(e) => handleInputChange("method", e.target.value)}
                style={{
                  background: "#1A2026",
                  color: "white",
                  fontFamily:
                    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  padding: "0.3em 5em",
                  borderRadius: "3px",
                  fontSize: "1em",
                  border: "1px solid #344050",
                }}
              >
                <option value="Select Method">Select Method</option>
                <option value="DNS">DNS</option>
                <option value="NTP">NTP</option>
                <option value="UCP-MIX">UCP-MIX</option>
                <option value="SSDP">SSDP</option>
              </select>
            </div>

            <div>
              <button
                onClick={handleRandomData}
                style={buttonStyle2}
                onMouseOver={() => setIsHovered2(true)}
                onMouseOut={() => setIsHovered2(false)}
              >
                Random
              </button>
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  width="180px"
                  height="180px"
                  viewBox="0 0 48.00 48.00"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#667380"
                  stroke="#667380"
                  strokeWidth="3.12"
                  style={{ width: "1.5em" }}
                >
                  <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <defs>
                      <style>{`.a{fill:none;stroke:#667380;stroke-linecap:round;stroke-linejoin:round;}`}</style>
                    </defs>
                    <path
                      className="a"
                      d="M24.0211,32.9211a4.2163,4.2163,0,1,0,4.2162,4.2164v0h0A4.2163,4.2163,0,0,0,24.0211,32.9211Z"
                    ></path>
                    <line
                      className="a"
                      x1="25.2921"
                      y1="33.1168"
                      x2="33.3312"
                      y2="8.1025"
                    ></line>
                    <path
                      className="a"
                      d="M30.7652,28.6157c-.0913-.0763-.1881-.1418-.2813-.2145"
                    ></path>
                    <path
                      className="a"
                      d="M23.845,26.18a10.486,10.486,0,0,0-6.515,2.3989v.0364"
                    ></path>
                    <path
                      className="a"
                      d="M37.1783,21.3261a20.6539,20.6539,0,0,0-3.6515-2.3934"
                    ></path>
                    <path
                      className="a"
                      d="M26.8559,16.8115a20.6419,20.6419,0,0,0-15.9921,4.5146"
                    ></path>
                    <path
                      className="a"
                      d="M43.5,13.6741a30.5523,30.5523,0,0,0-6.8981-4.31"
                    ></path>
                    <path
                      className="a"
                      d="M29.9291,7.2488A30.5319,30.5319,0,0,0,4.5,13.6741"
                    ></path>
                  </g>
                </svg>
                <p style={{ color: "#667380", margin: "1em 0em" }}>
                  Premium methods
                </p>
              </div>
              <div style={{ display: "flex" }}>
                <svg
                  fill="#667380"
                  viewBox="0 0 32 32"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  stroke="#667380"
                  style={{ width: "1.5em" }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path d="M18.605 2.022v0zM18.605 2.022l-2.256 11.856 8.174 0.027-11.127 16.072 2.257-13.043-8.174-0.029zM18.606 0.023c-0.054 0-0.108 0.002-0.161 0.006-0.353 0.028-0.587 0.147-0.864 0.333-0.154 0.102-0.295 0.228-0.419 0.373-0.037 0.043-0.071 0.088-0.103 0.134l-11.207 14.832c-0.442 0.607-0.508 1.407-0.168 2.076s1.026 1.093 1.779 1.099l5.773 0.042-1.815 10.694c-0.172 0.919 0.318 1.835 1.18 2.204 0.257 0.11 0.527 0.163 0.793 0.163 0.629 0 1.145-0.294 1.533-0.825l11.22-16.072c0.442-0.607 0.507-1.408 0.168-2.076-0.34-0.669-1.026-1.093-1.779-1.098l-5.773-0.010 1.796-9.402c0.038-0.151 0.057-0.308 0.057-0.47 0-1.082-0.861-1.964-1.939-1.999-0.024-0.001-0.047-0.001-0.071-0.001v0z"></path>{" "}
                  </g>
                </svg>

                <p style={{ color: "#667380", margin: "1em 0em" }}>
                  Concurrents
                </p>
              </div>
            </div>
          </div>
          <div style={formPartitionStyle}>
            <div>
              <p style={{ color: "#fff" }}>
                <strong>Step 2:</strong> Target Informations
              </p>
            </div>
            <div>
              <input
                value={targetInfo.host}
                onChange={(e) => handleInputChange("host", e.target.value)}
                placeholder="Enter Target Host (IP)"
                style={{
                  background: "#1A2026",
                  color: "white",
                  fontFamily:
                    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  padding: "0.3em 5em",
                  borderRadius: "3px",
                  fontSize: "1em",
                  border: "1px solid #1A2026",
                }}
              />
            </div>
            <div>
              <div>
                <input
                  placeholder="Port"
                  value={targetInfo.port}
                  onChange={(e) => handleInputChange("port", e.target.value)}
                  style={{
                    background: "#1A2026",
                    color: "white",
                    fontFamily:
                      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    padding: "0.3em 1em",
                    borderRadius: "3px",
                    fontSize: "1em",
                    border: "1px solid #344050",
                    margin: "1em 0em",
                    marginRight: "1em",
                  }}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="5"
                />
                <input
                  placeholder="Seconds"
                  value={targetInfo.seconds}
                  onChange={(e) => handleInputChange("seconds", e.target.value)}
                  style={{
                    background: "#1A2026",
                    color: "white",
                    fontFamily:
                      'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                    padding: "0.3em 1em",
                    borderRadius: "3px",
                    fontSize: "1em",
                    border: "1px solid #344050",
                    margin: "1em 0em",
                  }}
                  type="number"
                  id="quantity"
                  name="quantity"
                  min="1"
                  max="300"
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#4D5763"
                  stroke="#4D5763"
                  style={{ width: "1em" }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <title></title>{" "}
                    <g id="Complete">
                      {" "}
                      <g id="stopwatch">
                        {" "}
                        <g>
                          {" "}
                          <line
                            fill="none"
                            stroke="#4D5763"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            x1="12"
                            x2="12"
                            y1="10.8"
                            y2="14"
                          ></line>{" "}
                          <circle
                            cx="12"
                            cy="14.5"
                            data-name="Circle"
                            fill="none"
                            id="Circle-2"
                            r="7.9"
                            stroke="#4D5763"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></circle>{" "}
                          <polyline
                            fill="none"
                            points="12 5.5 12 1.5 9 1.5 15 1.5"
                            stroke="#4D5763"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                          ></polyline>{" "}
                        </g>{" "}
                      </g>{" "}
                    </g>{" "}
                  </g>
                </svg>
                <p style={{ color: "#4D5763", margin: "1em 0em" }}>
                  Max. boot time&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#fff" }}>10 min</span>
                </p>{" "}
              </div>
              <div>
                <>
                  {isAutoAttack ? (
                    <button
                      onClick={handleStopAttack}
                      style={buttonStyle}
                      onMouseOver={() => setIsHovered(true)}
                      onMouseOut={() => setIsHovered(false)}
                    >
                      Stop Attack
                    </button>
                  ) : (
                    <button
                      onClick={handleStartAttack}
                      style={buttonStyle}
                      onMouseOver={() => setIsHovered(true)}
                      onMouseOut={() => setIsHovered(false)}
                    >
                      Start Auto Attack
                    </button>
                  )}
                </>
              </div>
              <ToastContainer />
            </div>
          </div>
        </div>
        <hr
          style={{
            borderBottom: "1px solid #667380",
            width: "90%",
            margin: "20px 0",
          }}
        />
        <div
          style={{
            display: "flex",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <div style={{ marginRight: "auto" }}>
            <p style={{ color: "#fff" }}>Previous Attacks History</p>
          </div>
          <div style={partitionStyle}>
            <div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  fill="#667380"
                  viewBox="0 0 512 512"
                  data-name="Layer 1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "1.5em" }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    <title></title>
                    <path d="M321.85,250.69c-4-33.61-30.39-61-65.85-61-36,0-66.34,30.31-66.34,66.34S220,322.34,256,322.34c35.47,0,61.84-27.41,65.85-61a18.39,18.39,0,0,0,.49-5.32A18.71,18.71,0,0,0,321.85,250.69ZM225.12,256c0-39.95,59.88-39.6,61.76,0C285,295.55,225.12,296,225.12,256Z"></path>
                    <path d="M433.3,238.27H395c-7.27-51.81-41.57-96.15-91.93-114.52a133.34,133.34,0,0,0-29.29-7v-38c0-22.82-35.46-22.86-35.46,0V117c-34.91,4.65-68,22.22-90.69,50.08a141.57,141.57,0,0,0-30.44,71.24H78.7c-22.82,0-22.86,35.46,0,35.46H117a137.24,137.24,0,0,0,18.61,54.45c22.57,37.45,60.88,61.14,102.69,66.63V433.3c0,22.82,35.46,22.86,35.46,0V395.07c2.92-.35,5.85-.75,8.76-1.28,60.25-10.79,104-61.36,112.44-120.06H433.3C456.12,273.73,456.16,238.27,433.3,238.27ZM291.38,354.83a106,106,0,0,1-115.8-31.39c-62-73.5,5.19-188.93,99.84-170.61,49.75,9.63,84.51,53,85.5,103.17C360.05,299.87,333.32,340,291.38,354.83Z"></path>
                  </g>
                </svg>
                <p style={{ color: "#667380", margin: "1em 0em" }}>
                  Attacks Running
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#0BBF3B" }}>{AttacksRunning}</span>
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ width: "1.5em" }}
                >
                  <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                  <g
                    id="SVGRepo_tracerCarrier"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></g>
                  <g id="SVGRepo_iconCarrier">
                    {" "}
                    <path
                      d="M4 5V19C4 19.5523 4.44772 20 5 20H19"
                      stroke="#667380"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                    <path
                      d="M18 9L13 13.9999L10.5 11.4998L7 14.9998"
                      stroke="#667380"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    ></path>{" "}
                  </g>
                </svg>

                <p style={{ color: "#667380", margin: "1em 0em" }}>
                  Total No. of Attacks today
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ color: "#0BBF3B" }}>{totalAttacks}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: "20px",
              borderRadius: "1em",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Host
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Port
                </th>
                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Method
                </th>

                <th
                  style={{
                    border: "1px solid #ddd",
                    padding: "8px",
                    textAlign: "left",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((attack, index) => (
                <tr
                  key={attack.id}
                  style={{
                    backgroundColor: "transparent",
                    color: "#fff",
                  }}
                >
                  <td style={{ border: "1px solid #ddd", padding: "18px" }}>
                    {attack.host}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "18px" }}>
                    {attack.port}
                  </td>
                  <td style={{ border: "1px solid #ddd", padding: "18px" }}>
                    {attack.method}
                  </td>

                  <td style={{ border: "1px solid #ddd", padding: "18px" }}>
                    <p disabled>Attack Stopped</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {isModalOpen && (
        <>
          <div style={modalStyle}>
            <div style={{ justifyContent: "center", textAlign: "center" }}>
              <svg
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                style={{ width: "1em" }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M7.29417 12.9577L10.5048 16.1681L17.6729 9"
                    stroke="#07D83D"
                    stroke-width="2.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  ></path>{" "}
                  <circle
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="#07D83D"
                    stroke-width="2"
                  ></circle>{" "}
                </g>
              </svg>
              <p style={{ fontSize: "2em" }}>Your action was successfull</p>
            </div>

            <div style={{ justifyContent: "center", textAlign: "center" }}>
              <button
                style={{
                  background: "transparent",
                  padding: "0.2em 2em",
                  borderRadius: "0.2em",
                  color: "#fff",
                }}
                onClick={closeModal}
              >
                Okay
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
const attackData = [
  {
    host: "example.com",
    port: 80,
    method: "GET",
    timeRemaining: "2:30",
    id: 1,
  },
  {
    host: "example.org",
    port: 443,
    method: "POST",
    timeRemaining: "1:45",
    id: 2,
  },
  // Add more rows as needed
];

// Function to handle stop attack button click
const handleStopAttack = (attackId) => {
  // Add logic to stop the attack with the given ID
  console.log(`Stop Attack clicked for ID: ${attackId}`);
};
const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10em",
  background: "#242A32",
  padding: "2em 0em",
  margin: "6em 10em",
};

const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  marginBottom: "20px",
  background: "#1A2026",
  marginTop: "-2em",
};

const partitionStyle = {
  width: "100%", // Add this line
  flex: 1,
  padding: "0.5em 5em",
};

const formContainerStyle = {
  display: "flex",
  width: "80%",
};

const formPartitionStyle = {
  flex: 1,
  padding: "20px",
  marginRight: "10px",
};

export default StressThem;
