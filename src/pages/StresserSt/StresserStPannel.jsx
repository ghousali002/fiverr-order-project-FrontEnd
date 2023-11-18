import React, { useState ,useEffect,useRef} from 'react';

const StresserPanel = () => {
  const [host, setHost] = useState('');
  const [port, setPort] = useState('');
  const [time, setTime] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [ErrorMsg,setErrorMsg]=useState('Error');
  const [attacks, setAttacks] = useState([]);
  const originalCaptchaRef = useRef('');

  const [captchaImg, setCaptchaImg] = useState('');

  useEffect(() => {
    refreshCaptcha();
  }, []);

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
        setAttacks((prevAttacks) =>
          prevAttacks.filter((_, i) => i !== index)
        );
      }
    });

    return () => {
      timers.forEach((timer) => clearInterval(timer));
    };
  }, [attacks]);

  const stopTest = (index) => {
    setAttacks((prevAttacks) => prevAttacks.filter((_, i) => i !== index));
  };

  const stopAttacks = () => {
    if (attacks.length === 0) {
      setErrorMsg('No attacks running to stop.');
      setShowErrorModal(true);
    } else {
      setAttacks([]); 
    }
  };

  const handleHostChange = (event) => {
    setHost(event.target.value);
  };

  const handlePortChange = (event) => {
    setPort(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleCaptchaAnswerChange = (event) => {
    setCaptchaAnswer(event.target.value);
  };

  function isValidIPAddress(ip) {
    const ipv4Regex = /^(\d{1,3}\.){3}\d{1,3}$/;
    return ipv4Regex.test(ip);
  }

  function isValidPort(port) {
    const portRegex = /^(0|[1-9]\d{0,3}|[1-5]\d{4}|6[0-4]\d{3}|65[0-4]\d{2}|655[0-2]\d|6553[0-5])$/;
    return portRegex.test(port);
  }

  const sendStress = () => {
    if (!host || !port || !time || !captchaAnswer) {
      setErrorMsg('Please enter all fields before submitting...');
      setShowErrorModal(true);
    } else {
      if (!isValidIPAddress(host) || !isValidPort(port)) {
        setErrorMsg("Please Enter the Valid values (Ipv4 or Port) before submitting...");
        setShowErrorModal(true);
      } else {
        const currentCaptcha = originalCaptchaRef.current;
        if (currentCaptcha === captchaAnswer) {
          console.log('Captcha Verified');
          const newAttack = {
            host: host,
            port: port,
            time: time,
          };
          setAttacks([...attacks, newAttack]);
          setShowModal(true);
          console.log('Sending stress with:', host, port, time, captchaAnswer);
          resetValues();
          refreshCaptcha();
        } else {
          setErrorMsg("Bad captcha answer please try again..");
          setShowErrorModal(true);
          refreshCaptcha();
          
        }
      }
    }
  };
  

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
  };

  const handleAttackManager = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  const generateCaptcha = () => {
    const characters = '123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 4; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
  
    originalCaptchaRef.current = result;
  
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 50;
    canvas.height = 40;
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = 'bold 20px Arial';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.textDecoration = 'underline';
    const rotationDirection = Math.random() < 0.5 ? -1 : 1;
    const rotationAngle = rotationDirection * (Math.random() * 30);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.fillText(result, 0, 0);
  
    setCaptchaImg(canvas.toDataURL());
  
    return canvas.toDataURL();
  };
  
  const resetValues = ()=>{
    setHost('');
    setPort('');
    setTime('');
    setCaptchaAnswer('');
    let reset = document.getElementById('captcha_answer');
    reset.value =''; 
  }
  
  const refreshCaptcha = () => {
    setCaptchaImg(generateCaptcha());
  };
  
  return (
    <>
    <div className="col-sm-12" style={{ paddingTop: '10px' }}>
        <div className="box">
            <h4 className="rmv">
              <font color="#4AE96D ">About </font><br /><small
                >Stresser.st is a free, easy-to-use IP stresser that doesn't
                require an account. Stress test your firewall in a matter of
                seconds.<br />
                <h3>
                  <small
                    ><a href="/" className="rmv hoverGreen"
                      ><img
                        alt="Telegram Logo"
                        height="22"
                        width="22"
                        src="tg.png"
                      />
                      Join Telegram Channel</a
                    ></small
                  >
                </h3>
              </small>
            </h4>
            <br />
          </div>
      <div className="box">
      <h4 className="rmv">
              <font color="#4AE96D">Stresser Panel</font><br /><small
                >Enter your IP below to begin stress testing your
                firewall.</small
              >
            </h4>
            <br />
        <div className="form-group row">
          <div className="col-sm-2">
            <input
              id="host"
              type="text"
              placeholder="IPv4 Address"
              style={{ textAlign: 'center' }}
              className="form-control"
              value={host}
              onChange={handleHostChange}
              required
              autoFocus
            />
          </div>
          <div className="col-sm-2">
            <input
              id="port"
              type="text"
              placeholder="Port (53 for home connections)"
              style={{ textAlign: 'center' }}
              className="form-control"
              value={port}
              onChange={handlePortChange}
            />
          </div>
          <div className="col-sm-2">
            <input
              id="time"
              type="text"
              placeholder="Attack Length (Seconds)"
              style={{ textAlign: 'center' }}
              className="form-control"
              value={time}
              onChange={handleTimeChange}
              required
            />
          </div>
          <div className="col-sm-2">
            <input
              id="captcha_answer"
              type="text"
              placeholder="Enter Captcha Answer"
              style={{ textAlign: 'center' }}
              className="form-control"
              onChange={handleCaptchaAnswerChange}
              required
            />
      
          </div>
          <div className="col-sm-2">
  <img src={captchaImg}  width="200" height="40" alt='captcha' style={{ borderRadius: 10 }} onClick={refreshCaptcha} />
</div>
          <div className="col-sm-2">
            <button
              id="send_stress"
              className="btn btn-dark btn-block"
              onClick={sendStress}
              data-toggle="modal"
              data-target="#running_modal-err"
            >
              Send Attack
            </button>
            {showErrorModal && (
  <div className="modal" id="running_modal-err" style={{ display: 'block' }}>
    <div className="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
      <div className="modal-content bg-dark">
        <div className="modal-body pb-0 bg-dark">
          
        <h1 >
                  <small>
                    <span  style={{ display: 'flex',color:'red' }}>An Error Occured!!!</span>
                  </small>
                </h1>
            <h2 className="swal2-title ca-title" id="swal2-title" style={{ display: 'flex',color:'white' }}>
             
              <br />
              <small style={{ display: 'flex',color:'white' }}>
              {ErrorMsg}
              </small>
            </h2>
            <button type="button" className="btn btn-dark btn-sm" onClick={handleCloseErrorModal}>
              OK
            </button>
        </div>
      </div>
    </div>
  </div>
)}

          </div>
        </div>
        <button
        className="btn btn-dark btn-sm"
        data-toggle="modal"
        data-target="#running_modal"
        style={{marginTop: '20px',marginRight: '9px'}}
        onClick={handleAttackManager}
      >Attack Manager <span> ({attacks.length} Running)</span></button>
        {showModal && (
        <div className="modal" id="running_modal" style={{ display: 'block' }}>
          <div className="modal-dialog modal-dialog-scrollable modal-md modal-dialog-centered">
            <div className="modal-content bg-dark">
              <div className="modal-body pb-0 bg-dark">
                <h4 className="text-white">
                  <font color="#4AE96D">Attack Manager / </font>{' '}
                  <small>
                    <span id="running_attacks2">You have {attacks.length} attacks running</span>
                  </small>
                </h4>
                <div className="clearfix"></div>
                <br />
                <div className="table-responsive data-table">
                  <table className="table table-dark table-striped">
                    <thead>
                      <tr>
                        <th>Host:Port</th>
                        <th>Seconds Remaining</th>
                        <th>Stop Test</th>
                      </tr>
                    </thead>
                    <tbody id="running">{attacks.map((attack, index) => (
                        <tr key={index}>
                          <td>{`${attack.host}:${attack.port}`}</td>
                          <td>{attack.time}</td>
                          <td>
                            <button
                              onClick={() => stopTest(index)}
                              className="btn btn-dark btn-sm"
                            >
                              Stop Test
                            </button>
                          </td>
                        </tr>
                      ))}
                      </tbody>
                  </table>
                </div>
                <div className="clearfix"></div>
                <br />
                <div id="manager_ads">
                  <p>
                    <span className="text-danger">Not enough free power to stress test your connection?</span>
                    <br />
                    <span className="text-muted">I recommend a paid IP stresser listed on our website for the best stress testing results.</span>
                  </p>
                  <hr />
                </div>
                <button type="button" className="btn btn-dark btn-sm" onClick={handleCloseModal}>
                  Close Dialog
                </button>
                <div className="clearfix"></div>
                <br />
              </div>
            </div>
          </div>
        </div>
      )}
            <button
              id="stop_attacks"
              className="btn btn-dark btn-sm"
              style={{marginTop: '20px'}}
              onClick={stopAttacks}
              >Stop Attacks
            </button><br />
      </div>
      <div className="box" style={{padding: '5px', marginTop: '20px'}}>
            <h4 className="rmv">
              <font color="#4AE96D">Top Stressers </font>
              <small
                >Should our power not be enough for your connection I recommend
                the following paid stressers</small
              >
            </h4>
            <br />
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>Stresser</th>
                    <th>URL</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><font color="#4AE96D">Stresser AI</font> 🔥</td>
                    <td><a target="_blank" href="/">https://stresse.ru</a></td>
                    <td>
                      Best layer 4 attacks on the market, advanced method
                      customizations.
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <font color="#4AE96D">Nightmare Stresser</font>
                    </td>
                    <td>
                      <a target="_blank" href="/"
                        >https://nightmarestresser.net</a
                      >
                    </td>
                    <td>Strong Layer 4 attacks, API, 24/7 support</td>
                  </tr>
                  <tr>
                    <td>
                      <font color="#4AE96D">darkvr.io</font>
                    </td>
                    <td><a target="_blank" href="/">https://darkvr.io</a></td>
                    <td>
                      Layer 4&amp;7 bypass methods, All Plans have: 86400
                      Seconds &amp; API Access
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <font color="#4AE96D">Tresser.io</font>
                    </td>
                    <td><a target="_blank" href="/">https://tresser.io</a></td>
                    <td>
                      Tresser.io one of the best IP Stresser we provide the best
                      layer4 and layer7, Try now our free stresser!
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <font color="#4AE96D">Quez Stresser</font>
                    </td>
                    <td>
                      <a target="_blank" href="/">https://quezstresser.ru</a>
                    </td>
                    <td>Free L4 stresser (1Gbit/s UDP)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="box"style={{padding: '7px', marginTop: '20px'}}>
            <h4 className="rmv">
              <font color="#4AE96D">What is a Stresser, Booter? </font
              ><br /><small
                >IP stressers, booters, and DDoSers are tools that transmit a
                big amount of data to a target IP address in order to overload
                the IP and cause a denial of service attack. <br />A denial of
                service attack occurs when an IP address can no longer process
                genuine requests and, as a result, goes offline.<br />
                An IP stresser is a great tool to see how much bandwidth your IP
                can tolerate before releasing your website or server for
                commercial use. <br />If your connection can handle an IP
                stresser, it's likely it can handle multiple concurrent
                connections and is ready to be unleashed into the wild.
                <br /><br />
                <h4><font color="#4AE96D">Types of DDoS attacks</font></h4>
                <b>Amplification (DrDoS)</b> - This attack technique uses public
                servers to reflect and amplify data by sending a small trigger
                query and spoofing the source IP as the victim, resulting in a
                much larger response directed at the victim. Amplification
                attacks are typically 1-10Gbps, but they have been recorded at
                over 1Tbps if executed correctly. NTP, DNS, Memcached, and SNMP
                are examples of vulnerable DrDos protocols. <br /><br /><b
                  >SYN Attack</b
                >
                - SYN Attacks (TCP protocol) take use of the target's CPU, RAM,
                and other resources, forcing the server to respond with
                continual SYN+ACK answers as the target tries to finish a false
                handshake. SYN attacks use small packets with high PPS (packets
                per second) instead of large packets. To prevent such attacks,
                SYN Cookies are often used.<br /><br /><b>UDP Attack</b> - UDP
                Attacks send random junk data to random ports, causing ICMP port
                unavailable replies if the ports are not in use by the
                system.<br /><br /><b>Browser Emulation</b> - Browser emulation
                attacks use public libraries to interpret javascript, web
                services like cloudflare and other protections rely on
                javascript challenges to authenticate clients, this type of
                attack bypasses all javascript protections, and sometimes even
                solves captchas. Once the cookie is stored it can be used with
                regular GET/POST attacks without browser emulation.<br /><br />
                <h4><font color="#4AE96D">How to Stress test my IP?</font></h4>
                Easy, no login/account is necessary; simply input your IPv4
                address, your port (53 works nicely, but any port between
                0-65535), the length of time you want the stress test to run,
                and then complete the captcha. Your IP will instantly receive
                data from our stress testing servers, since we are a free
                service the flood is relatively small and may not always result
                in a DDoS attack, but it will provide enough information to
                assist you design your firewall more successfully in the event
                of a similar, much larger attack in the future. If our free
                service isn't powerful enough for you, I recommend using a
                premium IP stresser listed on our website.<br /><br />
                <h4><font color="#4AE96D">Credits</font></h4>
                This website is created by forky.
              </small>
            </h4>
            <br />
          </div>
          <div className="box" style={{padding: '7px', marginTop: '20px'}}>
            <h4 className="rmv">
                <font color="#4AE96D">Terms of Service </font><br/><small>By visiting our website, you agree not to use this tool to stress test any IP addresses that you do not control or own. This tool is only to be used for dianogstic purposes (load balancing, firewall, resource consumption tests). Any use of this tool for illicit purposes is strictly prohibited. We reserve the right, with or without notice, to amend our terms of service at any moment.</small></h4><br/>
              </div>
    </div>
    
    </>
  );
};

export default StresserPanel;
