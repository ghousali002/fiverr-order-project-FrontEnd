import React from "react";
import Navbar from "../../Navbar/Navbar";

function StressThem() {
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
              <p style={{ color: "#fff" }}>Step 1: Select attack method</p>
            </div>
          </div>
          <div style={formPartitionStyle}>Form Partition 2</div>
        </div>
      </div>
    </>
  );
}

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: "10em",
  background: "#242A32",
  padding: "2em 0em",
  margin: "10em",
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
  flex: 1,
  padding: "2em",
};

const formContainerStyle = {
  display: "flex",
  justifyContent: "space-between",
  width: "80%", // Adjust as needed
};

const formPartitionStyle = {
  flex: 1,
  border: "1px solid #ccc",
  padding: "20px",
  marginRight: "10px", // Adjust as needed
};

export default StressThem;
