import React, { useState, useEffect, useRef } from "react";

function StresserSUPanel() {
  const [activeTab, setActiveTab] = useState(0);
  const [layer, setLayer] = useState(true);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [ErrorMsg, setErrorMsg] = useState("Error");

  const [time, setTime] = useState(20);
  const [targetURL, setTargetURL] = useState("");
  const [targetIP, setTargetIP] = useState("");
  const [port, setPort] = useState("");
  const [cuncurrentValue, setCuncurrentValue] = useState("1");
  const [originOption, setOriginOption] = useState("Worldwide");
  const [methodOption, setMethodOption] = useState("HTTPSOUND");

  const originalCaptchaRef = useRef("");
  const [captchaImg, setCaptchaImg] = useState("");
  const [captchaCode, setCaptchaCode] = useState("");

  const [attacks, setAttacks] = useState([]);
  const [onGoingEmpty, setOnGoingEmpty] = useState(true);

  const ipAddressesArray = [
    { ip: '192.168.0.1', port: '8080' },
    { ip: '10.0.0.1', port: '3000' },
    { ip: '172.16.0.1', port: '4000' },
    { ip: '123.45.67.89', port: '5000' },
    { ip: '98.76.54.32', port: '6000' },
    { ip: '54.32.10.21', port: '7000' },
    { ip: '88.99.11.22', port: '9000' },
    { ip: '66.77.88.99', port: '10000' },
    { ip: '11.22.33.44', port: '11000' },
    { ip: '55.44.33.22', port: '12000' },
    { ip: '98.76.54.32', port: '13000' },
    { ip: '33.22.11.00', port: '14000' },
    { ip: '77.88.99.11', port: '15000' },
    { ip: '88.77.66.55', port: '16000' },
    { ip: '11.22.33.44', port: '17000' },
  ];
  const URLsArray = [
    'https://www.google.com',
    'https://www.yahoo.com',
    'https://www.github.com',
    'https://www.microsoft.com',
    'https://www.amazon.com',
    'https://www.apple.com',
    'https://www.spotify.com',
    'https://www.netflix.com',
    'https://www.linkedin.com',
    'https://www.reddit.com',
    'https://www.twitch.tv',
    'https://www.instagram.com',
    'https://www.twitter.com',
    'https://www.facebook.com',
    'https://www.youtube.com',
  ];
  const getRandomAddress = () => {
    const randomIndex = Math.floor(Math.random() * ipAddressesArray.length);
    const selectedAddress = ipAddressesArray[randomIndex];
    
    setTargetIP(selectedAddress.ip);
    setPort(selectedAddress.port);
    setTargetURL(URLsArray[randomIndex]);
  };

  useEffect(() => {
    let timers = [];
    attacks.forEach((attack, index) => {
      if (attack.time > 0) {
        const timer = setInterval(() => {
          setAttacks((prevAttacks) =>
            prevAttacks.map((item, i) =>
              i === index ? { ...item, time: item.time - 1 } : item
            )
          );
        }, 1000);
        timers.push(timer);
      } else {
        setAttacks((prevAttacks) => prevAttacks.filter((_, i) => i !== index));
      }
    });
    checkOnGoingEmpty();

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [attacks]);

  const checkOnGoingEmpty = () => {
    if (attacks.length === 0) {
      setOnGoingEmpty(false);
    } else {
      setOnGoingEmpty(true);
    }
  };
  

  const handleCaptchaValue = (e) => {
    setCaptchaCode(e.target.value);
  };

  const handleMethodChange = (e) => {
    setMethodOption(e.target.value);
  };
  const handleOriginChange = (e) => {
    setOriginOption(e.target.value);
  };

  const handleRangeChange2 = (e) => {
    setCuncurrentValue(e.target.value);
  };

  const handleUrlChange = (e) => {
    setTargetURL(e.target.value);
  };
  const handleTextChange = (e) => {
    setCuncurrentValue(e.target.value);
  };

  const handleTargetIPChange = (e) => {
    setTargetIP(e.target.value);
  };

  const handlePortChange = (e) => {
    setPort(e.target.value);
  };

  const fourLayer = () => {
    setLayer(false);
  };
  const sevenLayer = () => {
    setLayer(true);
  };
  const handleRangeChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTime(newValue);
  };

  const handleTextInputChange = (event) => {
    const newValue = parseInt(event.target.value, 10);
    setTime(newValue);
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const handleTabClick = (tabIndex) => {
    setActiveTab(tabIndex);
  };
  const createPreset = (id, buttonId) => {
    console.log(`Create preset for ${id} triggered by button ${buttonId}`);
    setErrorMsg("This functionality is not Useable now...");
    setShowErrorModal(true);
  };

  const scheduleAttack = (id, buttonId) => {
    console.log(`Schedule attack for ${id} triggered by button ${buttonId}`);
    setErrorMsg("Invalid Captcha Please Try Again...");
    setShowErrorModal(true);
  };

  const importPreset = (id, buttonId) => {
    console.log(`Import preset for ${id} triggered by button ${buttonId}`);
    setErrorMsg("This functionality is not Useable now...");
    setShowErrorModal(true);
  };

  const generateCaptcha = () => {
    const characters = "123456789";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    originalCaptchaRef.current = result;

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 50;
    canvas.height = 40;

    const backgroundRed = Math.floor(Math.random() * 156) + 100;
    const backgroundGreen = Math.floor(Math.random() * 156) + 100;
    const backgroundBlue = Math.floor(Math.random() * 156) + 100;
    const backgroundColor = `rgb(${backgroundRed},${backgroundGreen},${backgroundBlue})`;
    ctx.fillStyle = backgroundColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    const foregroundRed = Math.floor(Math.random() * 100);
    const foregroundGreen = Math.floor(Math.random() * 100);
    const foregroundBlue = Math.floor(Math.random() * 100);
    const foregroundColor = `rgb(${foregroundRed},${foregroundGreen},${foregroundBlue})`;
    ctx.fillStyle = foregroundColor;
    ctx.font = "bold 20px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.textDecoration = "underline";

    ctx.strokeStyle = foregroundColor;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    const rotationDirection = Math.random() < 0.5 ? -1 : 1;
    const rotationAngle = rotationDirection * (Math.random() * 30);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.fillText(result, 0, 0);

    setCaptchaImg(canvas.toDataURL());

    return canvas.toDataURL();
  };

  const refreshCaptcha = () => {
    setCaptchaImg(generateCaptcha());
  };

  useEffect(() => {
    refreshCaptcha();
    checkOnGoingEmpty();
  }, []);

  const stopAllAttacks = () => {
    if (attacks.length === 0) {
      setErrorMsg("No attacks running to stop.");
      setShowErrorModal(true);
    } else {
      setAttacks([]);
    }
  };

  const stopAttack = (index) => {
    setAttacks((prevAttacks) => prevAttacks.filter((_, i) => i !== index));
    setOnGoingEmpty();
  };

  function isValidIP(ip) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Regex.test(ip);
  }

  function isValidPort(port) {
    const portRegex =
      /^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    return portRegex.test(port);
  }

  function isValidURL(url) {
    const urlRegex =
      /^(?:(?:https?|ftp):\/\/)?(?:(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,})(?::\d{1,5})?(?:\/[\w.-]*)*(?:\?[\w%&=]*)?(?:#[\w-]*)?$/i;
    return urlRegex.test(url);
  }
  const sendAttack = () => {
    if (layer) {
      if (
        !targetURL ||
        !time ||
        !cuncurrentValue ||
        !originOption ||
        !methodOption ||
        !captchaCode
      ) {
        setErrorMsg("Please enter all fields before Start Attacking...");
        setShowErrorModal(true);
      } else {
        if (!isValidURL(targetURL)) {
          setErrorMsg(
            "Please enter Valid URL fields before Start Attacking..."
          );
          setShowErrorModal(true);
        } else {
          const currentCaptcha = originalCaptchaRef.current;
          if (currentCaptcha === captchaCode) {
            console.log("Captcha Verified");

            const newAttack = {
              url: targetURL,
              time: time,
              orign: originOption,
              method: methodOption,
            };
            setAttacks([...attacks, newAttack]);
            console.log(
              "Sending Attack with:",
              targetURL,
              time,
              captchaCode,
              originOption
            );
            setOnGoingEmpty(true);
            setTargetURL("");
            setCaptchaCode("");
            let reset = document.getElementById("c");
            reset.value = "";
            refreshCaptcha();
          } else {
            setErrorMsg("Bad captcha answer please try again...");
            setShowErrorModal(true);
          }
        }
      }
    } else {
      if (
        !targetIP ||
        !port ||
        !time ||
        !cuncurrentValue ||
        !originOption ||
        !methodOption ||
        !captchaCode
      ) {
        setErrorMsg("Please enter all fields before Start Attacking...");
        setShowErrorModal(true);
      } else {
        if (!isValidIP(targetIP) || !isValidPort(port)) {
          setErrorMsg("Please Enter the Valid values (Ipv4 or Port)");
          setShowErrorModal(true);
        } else {
          const currentCaptcha = originalCaptchaRef.current;
          if (currentCaptcha === captchaCode) {
            console.log("Captcha Verified");

            const newAttack = {
              ip: targetIP,
              port: port,
              time: time,
              orign: originOption,
              method: methodOption,
            };
            setAttacks([...attacks, newAttack]);
            console.log(
              "Sending Attack with:",
              targetIP,
              port,
              time,
              methodOption,
              captchaCode,
              originOption
            );
            setPort("");
            setTargetIP("");
            setCaptchaCode("");
            let reset = document.getElementById("c");
            reset.value = "";
            refreshCaptcha();
          } else {
            setErrorMsg("Bad captcha answer please try again...");
            setShowErrorModal(true);
          }
        }
      }
    }
  };

  return (
    <>
      {showErrorModal && (
        <div
          className="modal"
          id="running_modal-err"
          style={{ display: "block", zIndex: 10240 }}
        >
          <div className="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
            <div className="modal-content bg-dark">
              <div className="modal-body pb-0 bg-dark">
                <h1>
                  <small>
                    <span style={{ display: "flex", color: "red" }}>
                      An Error Occured!!!
                    </span>
                  </small>
                </h1>
                <h2
                  className="swal2-title ca-title"
                  id="swal2-title"
                  style={{ display: "flex", color: "white" }}
                >
                  <br />
                  <small style={{ display: "flex", color: "white" }}>
                    {ErrorMsg}
                  </small>
                </h2>
                <button
                  type="button"
                  className="btn btn-dark btn-sm"
                  onClick={handleCloseErrorModal}
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="row my-5">
        <div className="col-xl-12">
          <div className="row">
            <div
              className={`col-xl-6 btn-group mb-3 ${
                activeTab === 0 ? "active" : ""
              }`}
            >
              <a
                onClick={() => {
                  handleTabClick(0);
                  sevenLayer();
                }}
                href="#SevenLayer"
                className="tab-switcher btn btn-falcon-default mr-1 mb-1"
              >
                <h3>
                  <i class="fab fa-chrome"></i>
                </h3>
                <h6 className="text-base fs-0">Layer 7 (Application)</h6>
                <span className="fs--2">
                  Send HTTPS GET/POST DDoS attacks on a web server.
                </span>
              </a>
            </div>
            <div
              className={`col-xl-6 btn-group mb-3 ${
                activeTab === 1 ? "active" : ""
              }`}
            >
              <a
                onClick={() => {
                  handleTabClick(1);
                  fourLayer();
                }}
                href="#Three/FourLayer"
                className="tab-switcher btn btn-falcon-default mr-1 mb-1"
              >
                <h3>
                  <i class="fas fa-wifi"></i>
                </h3>
                <h6 className="text-base fs-0">
                  Layer 3/4 (Network/Transport)
                </h6>
                <span className="fs--2">
                  Send UDP/TCP DDoS attacks on an IPv4 target.
                </span>
              </a>
            </div>
          </div>

          <div className="tab-container">
            <div className="mb-3">
              <div className="card-header">
                <div className="row align-items-center">
                  <div className="col">
                    <h5 className="mb-0">Start Attack</h5>
                  </div>
                  <div className="col-auto">
                    <button
                      type="button"
                      className="btn rounded-capsule btn-primary mx-3"
                      onClick={getRandomAddress}
                    >
                      <i class="fas fa-random">&nbsp;</i>
                      Random Data
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#createpreset-7"
                      className="btn rounded-capsule btn-primary mx-3"
                    >
                      <i class="fas fa-plus">&nbsp;</i>
                      Create preset
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#loadpreset-7"
                      className="btn rounded-capsule btn-falcon-default mx-3"
                    >
                      <i class="fas fa-cog">&nbsp;</i>
                      Load preset
                    </button>
                    <button
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#scheduleForm-7"
                      className="btn mx-3 rounded-capsule btn-falcon-default"
                    >
                      <i class="fas fa-calendar-plus">&nbsp;</i>
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Create Preset Modal */}
            <div
              className="modal fade"
              id="createpreset-7"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Load Preset
                    </h5>
                    <button
                      className="btn-close"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="preset-name-7">Preset Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="preset-name-7"
                        name="preset-name-7"
                        maxLength=""
                        value=""
                        placeholder="Ex: example.com BROWSER V2"
                      />
                    </div>
                    <p>
                      Fill out the hub form with all required information to
                      continue creating your preset.
                    </p>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-primary btn-sm"
                      id="create-preset-7"
                      onClick={() => createPreset(7, "create-preset-7")}
                      type="submit"
                    >
                      Create
                    </button>
                    <button
                      className="btn btn-secondary btn-sm"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Schedule Modal */}
            <div
              className="modal fade"
              id="scheduleForm-7"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  {/* Modal header */}
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Schedule Attack
                    </h5>
                    <button
                      className="btn-close"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  {/* Modal body */}
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="start-date">Start Date</label>
                      <input
                        type="date"
                        className="form-control"
                        id="start-date"
                        name="start-date"
                        maxLength=""
                        value=""
                        placeholder=""
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="start-time">Start Time</label>
                      <input
                        type="time"
                        className="form-control"
                        id="start-time"
                        name="start-time"
                        maxLength=""
                        value=""
                        placeholder=""
                      />
                    </div>
                  </div>
                  {/* Modal footer */}
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                    <button
                      className="btn btn-primary btn-sm"
                      id="schedulebtn-7"
                      onClick={() => scheduleAttack(7, "schedulebtn-7")}
                      type="submit"
                    >
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* Load Preset Modal */}
            <div
              className="modal fade"
              id="loadpreset-7"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              style={{ display: "none" }}
              aria-hidden="true"
            >
              <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Load Preset for Hub Layer 7
                    </h5>
                    <button
                      className="btn-close"
                      type="button"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="form-group">
                      <label htmlFor="preset-key-7">Preset Key</label>
                      <input
                        type="text"
                        className="form-control"
                        id="preset-key-7"
                        name="preset-key-7"
                        maxLength=""
                        value=""
                        placeholder="XXX-XXX-XXX"
                      />
                    </div>
                    <button
                      className="btn btn-primary btn-sm"
                      id="load-preset-7"
                      onClick={() => importPreset(7, "load-preset-7")}
                      type="submit"
                    >
                      Import
                    </button>
                    <hr />
                    <h5 className="mt-3 mb-3">Imported presets</h5>
                    <div className="table-responsive-lg" id="loaded-preset-7">
                      <div className="text-center">
                        <div className="alert alert-primary" role="alert">
                          No data available.
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button
                      className="btn btn-secondary btn-sm"
                      type="button"
                      data-bs-dismiss="modal"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <table className="table bg-light">
              <tbody>
                {layer ? (
                  <tr>
                    <td>
                      <div className="form-group">
                        <label
                          htmlFor="host-7"
                          className="text-white"
                          style={{ marginBottom: 10 }}
                        >
                          Target URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="host-7"
                          required
                          name="host[]"
                          maxLength=""
                          value={targetURL}
                          onChange={handleUrlChange}
                          placeholder="Website: https://example.com/"
                        />
                      </div>
                    </td>
                  </tr>
                ) : (
                  <tr>
                    <td>
                      <div className="form-group">
                        <label
                          htmlFor="host-4"
                          className="text-white"
                          style={{ marginBottom: 10 }}
                        >
                          Target IP
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="host-4"
                          required
                          name="host[]"
                          maxLength=""
                          value={targetIP}
                          onChange={handleTargetIPChange}
                          placeholder="IPv4 1.1.1.1 or 127.0.0.1/8"
                        />
                      </div>
                    </td>
                    <td>
                      <div className="form-group">
                        <label
                          htmlFor="port-4"
                          className="text-white"
                          style={{ marginBottom: 10 }}
                        >
                          Port (0 = random)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="port-4"
                          name="port"
                          maxLength=""
                          value={port}
                          onChange={handlePortChange}
                          placeholder="80"
                        />
                      </div>
                    </td>
                  </tr>
                )}

                <tr>
                  <td colSpan="3">
                    <div className="form-group">
                      <label htmlFor="time" className="text-white">
                        Attack Time
                      </label>
                      <input
                        className="custom-range"
                        step="10"
                        min="0"
                        max="180"
                        value={time}
                        type="range"
                        onChange={handleRangeChange}
                      />
                      <input
                        className="form-control"
                        id="time-7"
                        name="time"
                        type="text"
                        value={time}
                        onChange={handleTextInputChange}
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3">
                    <div className="form-group">
                      <label htmlFor="slots-7" className="text-white">
                        Simultaneous Attacks (concurrents)
                      </label>
                      <input
                        className="custom-range"
                        step="1"
                        min="1"
                        max="10"
                        value={cuncurrentValue}
                        type="range"
                        onChange={handleRangeChange2}
                      />
                      <input
                        className="form-control"
                        id="slots-7"
                        name="slots"
                        type="text"
                        value={cuncurrentValue}
                        onChange={handleTextChange}
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3">
                    <div className="accordion">
                      <div className="card">
                        <div
                          className="card-header py-0"
                          style={{ padding: 0 }}
                          id="optionsHub"
                        >
                          <button
                            className="btn py-2 px-4 collapsed"
                            style={{
                              marginLeft: 0,
                              width: "120%",
                              textAlign: "left",
                              background: "border-box",
                            }}
                            type="button"
                            data-bs-toggle="collapse"
                            data-bs-target="#collapse-7"
                            aria-expanded="false"
                            aria-controls="collapse-7"
                          >
                            <svg
                              class="svg-inline--fa fa-caret-right fa-w-6 accordion-icon mr-3"
                              data-fa-transform="shrink-2"
                              aria-hidden="true"
                              focusable="false"
                              data-prefix="fas"
                              data-icon="caret-right"
                              role="img"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 192 512"
                              data-fa-i2svg=""
                              style={{ transformOrigin: "0.1875em 0.5em" }}
                            >
                              <g transform="translate(96 256)">
                                <g transform="translate(0, 0)  scale(0.875, 0.875)  rotate(0 0 0)">
                                  <path
                                    fill="currentColor"
                                    d="M0 384.662V127.338c0-17.818 21.543-26.741 34.142-14.142l128.662 128.662c7.81 7.81 7.81 20.474 0 28.284L34.142 398.804C21.543 411.404 0 402.48 0 384.662z"
                                    transform="translate(-96 -256)"
                                  ></path>
                                </g>
                              </g>
                            </svg>
                            <span className="font-weight-medium text-sans-serif text-900">
                              &nbsp; Advanced parameters
                            </span>
                          </button>
                        </div>
                        <div
                          className="collapse"
                          id="collapse-7"
                          aria-labelledby="optionsHub"
                        >
                          <div className="card-body pt-2">
                            <div id="method-opt7"></div>
                            <div className="form-group">
                              <label htmlFor="origin-7" className="text-white">
                                Origin
                              </label>
                              <select
                                name="origin"
                                id="origin-7"
                                className="custom-select mb-3"
                                value={originOption}
                                onChange={handleOriginChange}
                              >
                                <option value="Worldwide">Automatic</option>
                                <option value="United_states">
                                  United States
                                </option>
                                <option value="Germany">Germany</option>
                                <option value="Worldwide">Automatic</option>
                                <option value="United_states">
                                  United States
                                </option>
                                <option value="Germany">Germany</option>
                                <option value="Brazil">Brazil</option>
                                <option value="Thailand">Thailand</option>
                                <option value="Vietnam">Vietnam</option>
                                <option value="China">China</option>
                                <option value="Hong_Kong">Hong Kong</option>
                                <option value="Korea">Korea</option>
                                <option value="Japan">Japan</option>
                                <option value="Italy">Italy</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </td>
                </tr>

                <tr>
                  <td colSpan="3">
                    <label className="text-white">Attack Method</label>
                    <select
                      className="custom-select mb-3"
                      id="method-7"
                      name="method"
                      value={methodOption}
                      onChange={handleMethodChange}
                    >
                      <optgroup
                        style={{ color: "#ffffff" }}
                        label="SSL/TLS (for HTTPS://)"
                      >
                        <option
                          style={{ color: "#ffe000" }}
                          value="HTTPSOUND"
                          disabled
                        >
                          [PREMIUM] HTTPS SOUND (HTTP / HTTP2) [CloudFlare]
                        </option>
                        <option
                          style={{ color: "#ffe000" }}
                          value="REQUEST-CUSTOM"
                          disabled
                        >
                          [PREMIUM] HTTPS REQUEST-CUSTOM (HTTP / HTTP2)
                          [EXPERIENCED USERS ONLY!]
                        </option>
                        <option
                          style={{ color: "#ffe000" }}
                          value="HTTPSCRYPTO"
                          disabled
                        >
                          [PREMIUM] HTTPS-CRYPTO v2 (HTTPS2)
                        </option>
                        <option
                          style={{ color: "#ffe000" }}
                          value="HTTPSOUNDRATE"
                          disabled
                        >
                          [PREMIUM] HTTPS SOUND-RATE (HTTP / HTTP2) [CloudFlare]
                        </option>
                      </optgroup>
                      <optgroup
                        style={{ color: "#ffffff" }}
                        label="SPECIAL METHODS"
                      >
                        <option
                          style={{ color: "#ffe000" }}
                          value="Tor"
                          disabled
                        >
                          [PREMIUM] TOR (.onion)
                        </option>
                        <option
                          style={{ color: "#ffe000" }}
                          value="HTTPSCUSTOM"
                          disabled
                        >
                          [ENTERPRISE] HTTPS-CUSTOM (Real Browsers)
                        </option>
                      </optgroup>
                      <optgroup
                        style={{ color: "#ffffff" }}
                        label="SOCKET METHODS"
                      >
                        <option
                          style={{ color: "#ffe000" }}
                          value="WEBSOCKET-CUSTOM"
                          disabled
                        >
                          [PREMIUM] WEBSOCKET-CUSTOM (WS / WSS)
                        </option>
                        <option
                          style={{ color: "#ffe000" }}
                          value="SPAMMERV2"
                          disabled
                        >
                          [PREMIUM] SPAMMER v2 (HTTPS/1.1)
                        </option>
                        <option
                          style={{ color: "#ffe000" }}
                          value="SOCKETV4"
                          disabled
                        >
                          [PREMIUM] SOCKET V4 (HTTP/1.1)
                        </option>
                      </optgroup>
                      <optgroup
                        style={{ color: "#ffffff" }}
                        label="Free L7 Methods"
                      >
                        <option style={{ color: "#ffffff" }} value="HTTPSPAM">
                          [FREE] HTTP-SPAM
                        </option>
                        <option style={{ color: "#ffffff" }} value="FREENTP">
                          FREE-NTP
                        </option>
                      </optgroup>
                    </select>
                  </td>
                </tr>

                <tr>
                  <td className="text-center" colSpan="3">
                    <img
                      src={captchaImg}
                      width="200"
                      height="40"
                      alt="captcha"
                      style={{ marginRight: 15 }}
                    />
                    <button
                      className="btn btn-falcon-default mr-1 mb-1"
                      type="submit"
                      onClick={refreshCaptcha}
                    >
                      Refresh
                    </button>
                    <div className="form-group">
                      <label
                        htmlFor="time"
                        className="text-white"
                        style={{ float: "left", marginBottom: 13 }}
                      >
                        Captcha Code
                      </label>
                      <input
                        type="text"
                        className="form-control my-2"
                        id="c"
                        maxLength="6"
                        placeholder="Captcha Code"
                        value={captchaCode}
                        onChange={handleCaptchaValue}
                        name="captcha"
                      />
                    </div>
                  </td>
                </tr>

                <tr>
                  <td className="text-center" colSpan="3">
                    <button
                      className="btn btn-falcon-default mr-1 mb-1"
                      id="attackbtn-7"
                      type="submit"
                      onClick={sendAttack}
                    >
                      Start
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div className="row">
              <div className="col-md-12">
                <div className="card mb-3">
                  <div className="bg-holder d-none d-lg-block bg-card bg-start-header"></div>
                  <div className="card-body">
                    <div className="row">
                      <div className="col-lg-8" style={{ zIndex: 2 }}>
                        <h3 className="mb-0">
                          <i class="fa fa-rocket" aria-hidden="true"></i>
                          Manage Attacks
                        </h3>
                        <p className="mt-2">
                          Manage your ongoing and scheduled attacks.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-xl-12">
                <div className="card mb-3">
                  <div className="card-body bg-light">
                    <ul className="nav nav-pills">
                      <li className="nav-item">
                        <a
                          className="nav-link text-white active show fs-3"
                          id="pill-home-tab"
                          data-bs-toggle="tab"
                          href="#ongoing"
                          role="tab"
                          aria-selected="true"
                          onClick={checkOnGoingEmpty}
                        >
                          <span class="fa fa-rss" aria-hidden="true"></span>(
                          <span id="attackongoing">{attacks.length}</span>)
                          Ongoing
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-white fs-3"
                          id="pill-profile-tab"
                          data-bs-toggle="tab"
                          href="#scheduled"
                          role="tab"
                          aria-selected="false"
                        >
                          <span class="fa fa-clock" aria-hidden="true"></span>(
                          <span id="attackscheduled">0</span>) Scheduled
                        </a>
                      </li>
                      <li className="nav-item">
                        <a
                          className="nav-link text-white fs-3 btn btn-xs "
                          href="#stopAllAttacks"
                          onClick={stopAllAttacks}
                        >
                          {" "}
                          <i className="fa fa-power-off"></i> Stop all attacks
                        </a>
                      </li>
                    </ul>

                    <div className="tab-content p-3 mt-3">
                      {onGoingEmpty ? (
                        <table className="table text-white">
                          <thead>
                            <tr>
                              <th scope="col">URL/IP</th>
                              <th scope="col">Port/Method</th>
                              <th scope="col">Time</th>
                              <th scope="col">Action</th>
                            </tr>
                          </thead>
                          <tbody>
                            {attacks.map((attack, index) => (
                              <tr key={index}>
                                <td>{attack.url || attack.ip}</td>
                                <td>{attack.port || attack.method}</td>
                                <td>{attack.time}</td>
                                <td>
                                  <button
                                    onClick={() => stopAttack(index)}
                                    className="btn btn-dark btn-sm"
                                  >
                                    Stop Test
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      ) : (
                        <div
                          className="tab-pane fade active show"
                          id="ongoing"
                          role="tabpanel"
                        >
                          <div className="text-center">
                            <div className="alert alert-primary" role="alert">
                              No data available.
                            </div>
                          </div>
                        </div>
                      )}
                      <div
                        className="tab-pane fade"
                        id="scheduled"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                      >
                        <div className="text-center">
                          <div className="alert alert-primary" role="alert">
                            No data available.
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StresserSUPanel;
