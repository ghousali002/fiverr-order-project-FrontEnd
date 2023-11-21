import React, { useState, useEffect } from "react";
import "./StresserZone.css";
import Navbar from "../../Navbar/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function StresserZone() {
  const [showAdvancedParameters, setShowAdvancedParameters] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [PresetModal, setPresetModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [attacksInProgress, setAttacksInProgress] = useState([]);
  const [presetKey, setPresetKey] = useState("");

  const [targetIP, setTargetIP] = useState("");
  const [port, setPort] = useState("");
  const [timeValue, setTimeValue] = useState(30);
  const [method, setMethod] = useState('4');

  const [ErrorMsg, setErrorMsg] = useState("Error");
  const [showErrorModal, setShowErrorModal] = useState(false);

  const [isAutoAttack, setIsAutoAttack] = useState(false);
  const [targetInfo, setTargetInfo] = useState({
    attacks: [],
    currentAttackIndex: 0,
  });
  const [dataFetched, setDataFetched] = useState(false);
  useEffect(() => {
    if (dataFetched && targetInfo.attacks.length > 0) {

      let attackIntervalId;

      const startAttackInterval = () => {
        attackIntervalId = setInterval(() => {
          if (targetInfo.currentAttackIndex < targetInfo.attacks.length) {
            startAutoAttack(targetInfo.currentAttackIndex);
            
            console.log(targetInfo.attacks[targetInfo.currentAttackIndex]);
            setTargetInfo((prevState) => ({
              ...prevState,
              currentAttackIndex: prevState.currentAttackIndex + 1,
            }));
            
            
          } else {
            toast.success('All attacks on listed addresses have been completed.');
            setShowErrorModal(true);
            clearInterval(attackIntervalId);
          }
        }, 600000);
      };

      setIsAutoAttack(true);
      startAttackInterval();

      return () => {
        if (attackIntervalId) {
          clearInterval(attackIntervalId);
        }
      };
    }
  }, [dataFetched, targetInfo]);

  const handleStopAttack = () => {
    setIsAutoAttack(false);
    setTargetInfo({
      ...targetInfo,
      attacks: [],
      currentAttackIndex: 0,
    });
  };

  function startAutoAttack(index) {
    const { host, port, seconds,method } = targetInfo.attacks[index];
    setTargetIP(host);
    setPort(port);
    setTimeValue(seconds);
    setMethod(method);
    AutoSendAttack(host, port, seconds, method);
  }

  const handleAutoAttack = async () => {
    try {
      const response = await fetch("./Data.json");
      const data = await response.json();
  
      
      setTargetInfo({
        ...targetInfo,
        attacks: [...targetInfo.attacks, ...data], 
      });

      toast.success('Attacks will occur one by one every 10 minutes.');

  
      setDataFetched(true);
      console.log("handleAutoAttack", data);
    } catch (error) {
      setErrorMsg("File Missing or Error Fetching data");
      setShowErrorModal(true);
      console.error("Error fetching data:", error);
    }
  };


  function AutoSendAttack ( host ,port,time,method)  {
    if (!host || !port || !time ) {
      setErrorMsg('Please enter all fields before submitting...');
      setShowErrorModal(true);
      handleStopAttack();
    } else {
      if (!isValidIPAddress(host) || !isValidPort(port)) {
        setErrorMsg("Please Enter the Valid values (Ipv4 or Port) before submitting...");
        setShowErrorModal(true);
        handleStopAttack();
      } else {
        const newAttack = {
          host: host,
          port: port,
          time: time,
          method:method,
        };
        setAttacksInProgress([...attacksInProgress, newAttack]);
      }
      }
    };


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

  const getRandomAddress = () => {
    const randomIndex = Math.floor(Math.random() * ipAddressesArray.length);
    const selectedAddress = ipAddressesArray[randomIndex];
    
    setTargetIP(selectedAddress.ip);
    setPort(selectedAddress.port);
    // for set the time of randomlly
     setTimeValue(getRandomIndex([30,20,40,50,80]));
  };
  const getRandomIndex = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };
  useEffect(() => {
    let timers = [];
    attacksInProgress.forEach((attack, index) => {
      if (attack.time > 0) {
        const timer = setInterval(() => {
          setAttacksInProgress((prevAttacks) =>
            prevAttacks.map((item, i) =>
              i === index ? { ...item, time: item.time - 1 } : item
            )
          );
        }, 1000);
        timers.push(timer);
      } else {
        setAttacksInProgress((prevAttacks) =>
          prevAttacks.filter((_, i) => i !== index)
        );
      }
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [attacksInProgress]);

  const getMethodText = (value) => {
    switch (value) {
      case "4":
        return "DNS";
      case "6":
        return "NTP";
      case "11":
        return "SYN";
      case "12":
        return "ACK";
      case "14":
        return "OSIRIS";
      case "23":
        return "PPS (Small packets)";
      case "1":
        return "GRE";
      case "2":
        return "ESP";
      case "3":
        return "EXENIUM";
      default:
        return "";
    }
  };

  const stopAttacks = () => {
    if (attacksInProgress.length === 0) {
      setErrorMsg("No attacks running to stop.");
      setShowErrorModal(true);
    } else {
      setAttacksInProgress([]);
    }
  };

  const openShowModal = () => {
    setShowModal(true);
  };
  const closeShowModal = () => {
    setShowModal(false);
  };

  const stopAttack = (index) => {
    setAttacksInProgress((prevAttacks) =>
      prevAttacks.filter((_, i) => i !== index)
    );
  };

  function isValidIPAddress(ip) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Regex.test(ip);
  }

  function isValidPort(port) {
    const portRegex =
      /^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    return portRegex.test(port);
  }

  const handleSendAttack = () => {
    if (!targetIP || !port || !timeValue || !method) {
      setErrorMsg("Please enter all fields before submitting...");
      setShowErrorModal(true);
    } else {
      if (!isValidIPAddress(targetIP) || !isValidPort(port)) {
        setErrorMsg(
          "Please Enter the Valid values (Ipv4 or Port) before submitting..."
        );
        console.log("Sending stress with:", targetIP, port, timeValue, method);
        setShowErrorModal(true);
      } else {
        const newAttack = {
          host: targetIP,
          port: port,
          time: timeValue,
          method: method,
        };
        setAttacksInProgress([...attacksInProgress, newAttack]);
        console.log("Sending stress with:", targetIP, port, timeValue, method);
        setTargetIP("");
        setPort("");
        setMethod("4");
      }
    }
  };

  const openScheduleModal = () => {
    setShowScheduleModal(true);
  };

  const closeScheduleModal = () => {
    setShowScheduleModal(false);
  };
  const openAdvancedParameters = () => {
    setShowAdvancedParameters(true);
  };

  const closeAdvancedParameters = () => {
    setShowAdvancedParameters(false);
  };

  const openPresetModal = () => {
    setPresetModal(true);
  };

  const closePresetModal = () => {
    setPresetModal(false);
  };

  const handleRangeChange = (e) => {
    setTimeValue(parseInt(e.target.value));
  };

  const handleInputChange = (e) => {
    setTimeValue(parseInt(e.target.value));
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };
  const handlePresetKeyChange = (e) => {
    setPresetKey(e.target.value);
  };
  return (
    <>
     <ToastContainer />
      <Navbar />
      <div className="container dark-theme" style={{ padding: "4em 0em" }}>
        <div className="row text-white my-5">
          <div className="col-lg-12">
            <div className="card">
              <div
                className="card-header text-uppercase"
                style={{ color: "white" }}
              >
                Start attack
                <button
                  className="btn btn-xs btn-primary text-uppercase rightBtn"
                  data-toggle="modal"
                  data-target="#loadPreset"
                  onClick={openShowModal}
                >
                  <i className="fas fa-file-import"></i> Load a preset
                </button>
                {showModal && (
                  <div
                    className="modal fade show"
                    id="loadPreset"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="loadPreset"
                    style={{ display: "block", paddingRight: "17px" }}
                    aria-modal="true"
                  >
                    <div className="modal-dialog text-white" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-white"
                            id="loadPreset"
                          >
                            <i className="fa fa-angle-right"></i> Load a preset
                          </h5>
                          <button
                            type="button"
                            className="close"
                            onClick={closeShowModal}
                            aria-label="Close"
                          >
                            <i className="fa fa-times-circle"></i>
                          </button>
                        </div>
                        <div className="modal-body">
                          <div className="row">
                            <div className="col-8 mx-auto">
                              <form method="post">
                                <div className="form-group">
                                  <label style={{ marginBottom: 15 }}>
                                    <i className="fa fa-key"></i> IMPORT PRESET
                                    via Key
                                  </label>
                                  <input
                                    style={{ marginBottom: 15 }}
                                    type="text"
                                    className="form-control"
                                    id="presetKey"
                                    name="presetKey"
                                    placeholder="Key"
                                    required=""
                                    value={presetKey}
                                    onChange={handlePresetKeyChange}
                                  />
                                </div>
                                <div className="form-group">
                                  <button
                                    style={{
                                      marginBottom: 13,
                                      width: 300,
                                      marginLeft: 2,
                                    }}
                                    onClick={closeShowModal}
                                    type="button"
                                    className="btn btn-primary btn-block"
                                  >
                                    <i className="fa fa-save"></i> Import
                                  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                          <div className="row">
                            <div className="col-10 mx-auto">
                              <div className="table-responsive text-center">
                                <table className="table table-sm text-white">
                                  <thead>
                                    <tr>
                                      <th style={{ padding: "0px 0px" }}>
                                        NAME
                                      </th>
                                      <th style={{ padding: "0px 0px" }}>
                                        KEY
                                      </th>
                                      <th style={{ padding: "0px 0px" }}>
                                        TYPE
                                      </th>
                                      <th style={{ padding: "0px 0px" }}>
                                        ACTION
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody id="presetsListL4"></tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <button
                  className="btn btn-xs btn-primary text-uppercase rightBtn"
                  data-toggle="modal"
                  data-target="#createPreset"
                  onClick={openPresetModal}
                  style={{ marginRight: "10px" }}
                >
                  <i className="fa fa-plus"></i> Create a preset
                </button>
                {PresetModal && (
                  <div
                    className="modal fade show"
                    id="createPreset"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="createPreset"
                    style={{ paddingRight: "17px", display: "block" }}
                    aria-modal="true"
                  >
                    <div className="modal-dialog text-white" role="document">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5
                            className="modal-title text-white"
                            id="createPreset"
                          >
                            <i className="fa fa-angle-right"></i> Create a
                            preset
                          </h5>
                          <button
                            type="button"
                            className="close"
                            onClick={closePresetModal}
                            aria-label="Close"
                          >
                            <i className="fa fa-times-circle"></i>
                          </button>
                        </div>
                        <div className="modal-body">
                          <form>
                            <div className="form-group">
                              <label style={{ marginBottom: 8 }}>NAME</label>
                              <input
                                style={{ marginBottom: 12 }}
                                type="text"
                                className="form-control"
                                id="presetName"
                                name="presetName"
                                placeholder="Name your preset"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <button
                                style={{ marginBottom: 12, width: 466 }}
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={() => {
                                  closePresetModal();
                                }}
                                name="savePreset"
                              >
                                <i className="fa fa-save"></i> Save
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <div className="card-body text-center">
                <form>
                  <div className="form-group row">
                    <div className="col-sm-6">
                      <label className="lable">Target IP</label>
                      <input
                        type="text"
                        id="hostL4"
                        className="form-control"
                        placeholder="IPv4 1.1.1.1"
                        value={targetIP}
                        onChange={(e) => setTargetIP(e.target.value)}
                      />
                    </div>
                    <div className="col-sm-6">
                      <label className="lable">Port</label>
                      <input
                        type="number"
                        id="portL4"
                        className="form-control"
                        placeholder="80"
                        value={port}
                        onChange={(e) => setPort(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="lable">Attack time</label>
                    <input
                      type="range"
                      className="form-range"
                      id="timeRange"
                      step="10"
                      min="10"
                      max="120"
                      value={timeValue}
                      onChange={handleRangeChange}
                    />
                    <input
                      className="form-control"
                      id="timeL4"
                      type="number"
                      value={timeValue}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group row" id="methodL4F">
                    <div className="col-sm-6">
                      <label
                        className="lable"
                        style={{ marginTop: 7, marginBottom: 3 }}
                      >
                        Method
                      </label>
                      <br />
                      <select
                        className="form-control"
                        id="methodL4"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                      >
                        <optgroup label="Layer 4">
                          <option subnetmode="1" value="4">
                            &nbsp; ➔ &nbsp;DNS{" "}
                          </option>
                          <option subnetmode="1" value="6">
                            &nbsp; ➔ &nbsp;NTP{" "}
                          </option>
                        </optgroup>
                        <optgroup label="TCP">
                          <option subnetmode="1" customorigin="1" value="11">
                            &nbsp; ➔ &nbsp;SYN{" "}
                          </option>
                          <option subnetmode="1" customorigin="1" value="12">
                            &nbsp; ➔ &nbsp;ACK{" "}
                          </option>
                          <option value="14">&nbsp; ➔ &nbsp;OSIRIS </option>
                        </optgroup>
                        <optgroup label="UDP">
                          <option value="23">
                            &nbsp; ➔ &nbsp;PPS (Small packets){" "}
                          </option>
                        </optgroup>
                        <optgroup label="Layer 3">
                          <option value="1">&nbsp; ➔ &nbsp;GRE </option>
                          <option value="2">&nbsp; ➔ &nbsp;ESP </option>
                          <option subnetmode="1" customorigin="1" value="3">
                            &nbsp; ➔ &nbsp;EXENIUM{" "}
                          </option>
                        </optgroup>
                      </select>
                    </div>

                    <div className="col-sm-6 ">
                      <br />
                      <button
                        type="button"
                        id="advancedParametersButton"
                        className="btn btn-block btn-primary text-uppercase adv"
                        data-toggle="modal"
                        data-target="#advancedParameters"
                        onClick={openAdvancedParameters}
                      >
                        <i className="fa fa-angle-right"></i>
                        Advanced parameters
                      </button>
                      {showAdvancedParameters && (
                        <div
                          className="modal fade show"
                          id="advancedParameters"
                          tabIndex="-1"
                          role="dialog"
                          aria-labelledby="advancedParameters"
                          style={{ display: "block", paddingRight: "17px" }}
                          aria-modal="true"
                        >
                          <div
                            className="modal-dialog text-white"
                            role="document"
                          >
                            <div className="modal-content">
                              <div className="modal-header">
                                <h5
                                  className="modal-title text-white"
                                  id="advancedParameters"
                                >
                                  <i className="fa fa-angle-right"></i> Advanced
                                  parameters
                                </h5>
                                <button
                                  type="button"
                                  className="close"
                                  onClick={closeAdvancedParameters}
                                  aria-label="Close"
                                >
                                  <i className="fa fa-times-circle"></i>
                                </button>
                              </div>
                              <div className="modal-body">
                                <div className="form-group">
                                  <label>Packets per second</label>
                                  <input
                                    className="range"
                                    id="ppsRange"
                                    step="50000"
                                    min="50000"
                                    max="100000"
                                    value="100000"
                                    type="range"
                                  />
                                  <input
                                    className="form-control"
                                    id="ppsL4"
                                    type="text"
                                    value="100000"
                                  />
                                </div>
                                <div className="form-group">
                                  <label>Concurrents</label>
                                  <input
                                    className="range"
                                    id="concurrentsRange"
                                    step="1"
                                    min="1"
                                    max="1"
                                    value="1"
                                    onChange={(e) => {
                                      document.getElementById(
                                        "concurrentsL4"
                                      ).value = e.target.value;
                                    }}
                                    type="range"
                                  />
                                  <input
                                    className="form-control"
                                    id="concurrentsL4"
                                    type="number"
                                    value="1"
                                    onChange={(e) => {
                                      document.getElementById(
                                        "concurrentsRange"
                                      ).value = e.target.value;
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="modal-footer">
                                {/* Add your modal footer content here */}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <button
                    style={{ marginTop: 15 }}
                    type="button"
                    className="btn btn-primary text-uppercase"
                    onClick={getRandomAddress}
                  >
                    Get Random &nbsp;
                  </button>
                  <button
              id="AutoAttack"
              className="btn btn-primary text-uppercase"
              onClick={isAutoAttack ? handleStopAttack : handleAutoAttack}
              style={{marginLeft:10 ,marginTop:15}}
              type="button"
            >
              {isAutoAttack ? <span>Stop </span>  : <span>Start </span> }
               Auto Attack 
            </button>
                  <button
                    style={{ marginLeft: 9 , marginTop: 15 }}
                    type="button"
                    className="btn btn-primary text-uppercase"
                    onClick={handleSendAttack}
                  >
                    Send attack &nbsp;
                    <i className="fa fa-paper-plane"></i>
                  </button>
                  {showErrorModal && (
                    <div
                      className="modal"
                      id="running_modal-err"
                      style={{ display: "block" }}
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
                              <small
                                style={{ display: "flex", color: "white" }}
                              >
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

                  <button
                    style={{ marginTop: 15, marginLeft: 9 }}
                    type="button"
                    data-toggle="modal"
                    data-target="#scheduleAttack"
                    className="btn btn-primary text-uppercase"
                    id="schedule"
                    onClick={openScheduleModal}
                  >
                    Schedule &nbsp;<i className="fa fa-clock"></i>
                  </button>
                  {showScheduleModal && (
                    <div
                      className="modal fade show"
                      id="scheduleAttack"
                      tabIndex="-1"
                      role="dialog"
                      aria-labelledby="scheduleAttack"
                      style={{ paddingRight: "17px", display: "block" }}
                      aria-modal="true"
                    >
                      <div className="modal-dialog text-white" role="document">
                        <div className="modal-content">
                          <div className="modal-header">
                            <h5
                              className="modal-title text-white"
                              id="scheduleAttack"
                            >
                              <i className="fa fa-clock"></i> Schedule
                            </h5>
                            <button
                              type="button"
                              className="close"
                              data-dismiss="modal"
                              aria-label="Close"
                              onClick={closeScheduleModal}
                            >
                              <i className="fa fa-times-circle"></i>
                            </button>
                          </div>
                          <div className="modal-body">
                            <div className="form-group row">
                              <div className="col-6">
                                <label style={{ marginBottom: 7 }}>DATE</label>
                                <input
                                  type="date"
                                  className="form-control"
                                  id="scheduleDateL4"
                                  value="2023-11-18"
                                />
                              </div>
                              <div className="col-6">
                                <label style={{ marginBottom: 7 }}>HOUR</label>
                                <input
                                  type="time"
                                  className="form-control"
                                  id="scheduleHourL4"
                                  value="20:01"
                                />
                              </div>
                            </div>
                            <div className="form-group">
                              <button
                                style={{
                                  marginBottom: 15,
                                  marginTop: 18,
                                  width: 463,
                                }}
                                type="button"
                                className="btn btn-primary btn-block"
                                onClick={() => {
                                  closeScheduleModal();
                                }}
                                name="savePreset"
                              >
                                <i className="fa fa-check"></i> Schedule
                              </button>
                            </div>
                            <div className="row">
                              <div className="col-10 mx-auto">
                                <div className="table-responsive text-center">
                                  <table className="table table-sm text-white">
                                    <thead>
                                      <tr>
                                        <th style={{ padding: "0px 0px" }}>
                                          HOST
                                        </th>
                                        <th style={{ padding: "0px 0px" }}>
                                          DATE
                                        </th>
                                        <th style={{ padding: "0px 0px" }}>
                                          HOUR
                                        </th>
                                        <th style={{ padding: "0px 0px" }}>
                                          ACTION
                                        </th>
                                      </tr>
                                    </thead>
                                    <tbody id="scheduledAttacksListL4"></tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="mt-0 header-title text-white">
                  <i className="fa fa-spinner fa-spin"></i>
                  &nbsp;Manage attacks in progress
                  <button
                    style={{ marginRight: 25 }}
                    className="btn btn-xs btn-primary text-uppercase rightBtn"
                    onClick={stopAttacks}
                  >
                    <i className="fa fa-power-off"></i> Stop all attacks
                  </button>
                </h5>
                <br />
                <div className="table-responsive ">
                  <table className="table text-white ">
                    <thead>
                      <tr>
                        <th>Host</th>
                        <th>Port</th>
                        <th>Remaning time</th>
                        <th>Method</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {attacksInProgress.map((attack, index) => (
                        <tr key={index}>
                          <td>{attack.host}</td>
                          <td>{attack.port}</td>
                          <td>{attack.time}sec</td>
                          <td>{isAutoAttack ? attack.method : getMethodText(attack.method)}</td>
                       
                          <td>
                            <div
                              className="btn-group btn-block"
                              role="group"
                              aria-label="Attack"
                            >
                              <button
                                type="button"
                                className="btn btn-xs btn-danger"
                                onClick={() => stopAttack(index)}
                              >
                                <i className="fa fa-stop"></i> Stop
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default StresserZone;
