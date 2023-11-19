import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios"; // Import Axios
import TosModal from "../LoginPage/TosModal";
import LoginPage from "../LoginPage/LoginPage";
import { useNavigate } from "react-router-dom";
function RegistrationPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showTosModal, setShowTosModal] = useState(false);
  const [userCreated, setUserCreated] = useState(false);

  const [captchaImg, setCaptchaImg] = useState('');

  
  useEffect(() => {
    fetchCaptcha();
  }, []);
  

  const fetchCaptcha = async () => {
    try {
      const response = await axios.get("http://localhost:8080/Register/generateCaptcha", {
        headers: {
          'x-request-id': 'unique-request-id', 
        },
      });
      const capCode = response.data.captcha; 
      console.log("CAPTCHA code from backend:", capCode);
      generateCaptchaToPic(capCode); 
    } catch (error) {
      console.error("Error fetching CAPTCHA:", error);
    }
  };

  const generateCaptchaToPic = (code) => {

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
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
    ctx.font = 'bold 20px Arial';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.textDecoration = 'underline';
  
    ctx.strokeStyle = foregroundColor;
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();
  
    const rotationDirection = Math.random() < 0.5 ? -1 : 1;
    const rotationAngle = rotationDirection * (Math.random() * 30);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotationAngle * Math.PI) / 180);
    ctx.fillText(code, 0, 0);
  
    setCaptchaImg(canvas.toDataURL());
  
    return canvas.toDataURL();
  };

  const translations = {
    English: {
      register: "Register",
      backToLogin: "Back to Login",
      loginArea: "Register Area",
      login: "Login",
      username: "Username",
      password: "Password",
      TOS: "I have read and agree to the ",
      Email: "Email (optional)",
      Confirmpassword: "Confirm Password",
      captchaCode: "Captcha Code",
      create: "Create",
      // Add more translations as needed
    },
    Chinese: {
      register: "注册",
      backToLogin: "返回登录",
      loginArea: "注册区域",
      login: "登录",
      username: "用户名",
      password: "密码",
      TOS: "我已阅读并同意",
      Email: "电子邮件（可选）",
      Confirmpassword: "确认密码",
      captchaCode: "验证码",
      create: "创建",
      // Add more translations as needed
    },
    Korean: {
      register: "회원 가입",
      backToLogin: "로그인으로 돌아가기",
      loginArea: "회원 가입 영역",
      login: "로그인",
      username: "사용자 이름",
      password: "비밀번호",
      TOS: "내가 읽고 동의합니다 ",
      Email: "이메일 (선택 사항)",
      Confirmpassword: "비밀번호 확인",
      captchaCode: "캡차 코드",
      create: "만들기",
      // Add more translations as needed
    },
    Russian: {
      register: "Регистрация",
      backToLogin: "Вернуться к входу",
      loginArea: "Область регистрации",
      login: "Вход",
      username: "Имя пользователя",
      password: "Пароль",
      TOS: "Я прочитал и согласен с ",
      Email: "Эл. почта (по желанию)",
      Confirmpassword: "Подтвердите пароль",
      captchaCode: "Код капчи",
      create: "Создать",
      // Add more translations as needed
    },
    Spanish: {
      register: "Registrarse",
      backToLogin: "Volver al inicio de sesión",
      loginArea: "Área de registro",
      login: "Iniciar sesión",
      username: "Nombre de usuario",
      password: "Contraseña",
      TOS: "He leído y acepto los ",
      Email: "Correo electrónico (opcional)",
      Confirmpassword: "Confirmar contraseña",
      captchaCode: "Código Captcha",
      create: "Crear",
      // Add more translations as needed
    },
    German: {
      register: "Registrieren",
      backToLogin: "Zurück zum Login",
      loginArea: "Bereich registrieren",
      login: "Anmelden",
      username: "Benutzername",
      password: "Passwort",
      TOS: "Ich habe gelesen und stimme zu ",
      Email: "E-Mail (optional)",
      Confirmpassword: "Passwort bestätigen",
      captchaCode: "Captcha-Code",
      create: "Erstellen",
      // Add more translations as needed
    },
    Japanese: {
      register: "登録",
      backToLogin: "ログインに戻る",
      loginArea: "登録エリア",
      login: "ログイン",
      username: "ユーザー名",
      password: "パスワード",
      TOS: "私は読んで同意します ",
      Email: "メールアドレス（任意）",
      Confirmpassword: "パスワードの確認",
      captchaCode: "キャプチャコード",
      create: "作成",
      // Add more translations as needed
    },
  };

  const navigate = useNavigate();
  const handleRegisterClick = () => {
    navigate("/Login");
  };

  //   const handleBackToLoginClick = () => {
  //     setShowRegisterForm(false);
  //   };

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // You can implement language translation logic here
  };

  const handleTosClick = () => {
    setShowTosModal(true);
  };

  const handleCloseTosModal = () => {
    setShowTosModal(false);
  };

  const handleCreateUser = () => {
    // Get input field values
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    const captchaCode = document.getElementById("Ccode").value;
    const tosCheckbox = document.getElementById("tosCheckbox");

    // Validate username and password
    if (username.length < 3) {
      // Show toast message for invalid username
      toast.error("Username must be at least 3 characters.");
      return;
    }

    if (password.length < 6) {
      // Show toast message for invalid password
      toast.error("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      // Show toast message for password mismatch
      toast.error("Passwords do not match.");
      return;
    }

    if (!tosCheckbox.checked) {
      // Show toast message if the checkbox is not checked
      toast.error("Please agree to the Terms of Service.");
      return;
    }
    // Make API request to create user
    axios
      .post("http://localhost:8080/Register/createUser", {
        username,
        email,
        password,
        captchaCode,
      })
      .then((response) => {
        if (response.status === 201) {
          // Show toast message for successful user creation
          toast.success("User created successfully!");
          setUserCreated(true);

          // Additional logic, e.g., redirect to login page
        } else {
          // Handle other response statuses if needed
          toast.error("Error creating user. Please try again.");
        }
      })
      .catch((error) => {
        // Show toast message for error during user creation
        if (error.response && error.response.status === 400) {
          toast.error("Username or email already exists.");
        }
        else if(error.response && error.response.status === 401){
          fetchCaptcha();
          toast.error("Captcha Invalid!!");
        } 
        else {
          toast.error("Error creating user. Please try again.");
        }
      });
  };


  useEffect(() => {
    if (userCreated) {
      // Wait for 2 seconds
      const timeoutId = setTimeout(() => {
        // Additional logic or actions after user creation
        // For example, redirect to another page or perform other actions
        console.log(
          "User created. Redirecting or performing additional actions..."
        );
        // You can redirect to the login page or perform other actions
        setShowRegisterForm(true);
      }, 2000);

      // Clear the timeout to avoid side effects
      return () => clearTimeout(timeoutId);
    }
  }, [userCreated]);
  return (
    <div
      style={{
        backgroundColor: "#061325",
        height: "200vh",
        marginTop: "-9em",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {showRegisterForm ? (
        <LoginPage />
      ) : (
        <div
          style={{
            background: "#0E1C2F",
            borderRadius: "0.5em",
            textAlign: "left",
            width: "60em",
          }}
        >
          <h1
            style={{
              color: "white",
              marginBottom: "1em",
              background: "#093670",
              paddingTop: "0.7em",
              paddingBottom: "0.6em",
              fontWeight: "bolder",
              marginTop: "0em",
              borderTopLeftRadius: "0.5em",
              borderTopRightRadius: "0.5em",
              paddingLeft: "1em",
              textAlign: "center",
            }}
          >
            {translations[selectedLanguage].loginArea}
          </h1>
          <ToastContainer />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              color: "white",
              paddingLeft: "1em",
              paddingRight: "1em",
            }}
          >
            <div style={{ flex: "1", padding: "0em 1em" }}>
              <h2 style={{ fontWeight: "normal", fontSize: "2em" }}>
                {" "}
                {translations[selectedLanguage].register}
              </h2>
            </div>

            <div>
              <button
                onClick={handleRegisterClick}
                style={{
                  background: "#132238",
                  color: "white",
                  padding: "0.3em 1.5em",
                  borderRadius: "3em",
                  boxShadow: "0 0 15px rgba(0, 0, 0, 0.3)",
                  transition: "box-shadow 0.3s",
                  fontSize: "1em",
                  fontWeight: "normal",
                  fontFamily:
                    'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                  display: "flex",
                  alignItems: "center",
                  border: "1px solid #132238",
                }}
                onMouseOver={(e) => {
                  e.target.style.boxShadow = "0 0 20px rgba(0, 0, 0, 0.8)";
                }}
                onMouseOut={(e) => {
                  e.target.style.boxShadow = "0 0 15px rgba(0, 0, 0, 0.3)";
                }}
              >
                <svg
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    height: "1.5em",
                    width: "auto",
                    marginRight: "0.5em",
                    filter: "invert(1)",
                    pointerEvents: "none",
                  }}
                >
                  <circle cx="10" cy="8" r="5" fill="#222222"></circle>
                  <path
                    d="M19 10L19 16"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M22 13L16 13"
                    stroke="#222222"
                    strokeWidth="2"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M17.1421 20.3825C17.6038 20.278 17.8806 19.7981 17.676 19.3713C17.1242 18.2203 16.2173 17.2088 15.0419 16.4465C13.5955 15.5085 11.8232 15 10 15C8.17681 15 6.40455 15.5085 4.95811 16.4465C3.78266 17.2088 2.87577 18.2202 2.32396 19.3713C2.11935 19.7981 2.39623 20.278 2.85786 20.3825C7.55976 21.4474 12.4402 21.4474 17.1421 20.3825Z"
                    fill="#222222"
                  ></path>
                </svg>
                <span style={{ marginTop: "-0.2em", pointerEvents: "none" }}>
                  {translations[selectedLanguage].login}
                </span>
              </button>
            </div>
          </div>
          <div style={{ padding: "0em 2em", marginTop: "-0.7em" }}>
            <select
              value={selectedLanguage}
              onChange={(e) => handleLanguageChange(e.target.value)}
              style={{
                background: "#0E1C2F",
                color: "white",
                fontFamily:
                  'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                padding: "0.3em 1.5em",
                borderRadius: "3px",
                fontSize: "1em",
                border: "1px solid #344050",
              }}
            >
              <option value="English">English</option>
              <option value="Chinese">Chinese</option>
              <option value="Korean">Korean</option>
              <option value="Russian">Russian</option>
              <option value="Spanish">Spanish</option>
              <option value="Japanese">Japanese</option>
            </select>
          </div>

          <div style={{ padding: "2em" }}>
            <div>
              <label style={{ color: "#90A4BB" }}>
                {" "}
                {translations[selectedLanguage].username}
              </label>
            </div>
            <div style={{ padding: "1em 0em" }}>
              <input
                id="username"
                placeholder="min 3 chars"
                type="text"
                required
                style={{
                  width: "100%",
                  padding: "0.5em",
                  backgroundColor: "#0C1728",
                  color: "white",
                  border: "1px solid #000000",
                  borderRadius: "3px",
                }}
              />
            </div>
            <div>
              <label style={{ color: "#90A4BB" }}>
                {" "}
                {translations[selectedLanguage].Email}
              </label>
            </div>
            <div style={{ padding: "1em 0em" }}>
              <input
                id="email"
                placeholder="example@mail.com"
                type="text"
                required
                style={{
                  width: "100%",
                  padding: "0.5em",
                  backgroundColor: "#0C1728",
                  color: "white",
                  border: "1px solid #000000",
                  borderRadius: "3px",
                }}
              />
            </div>
            <div style={{ paddingTop: "1em" }}>
              <label style={{ color: "#90A4BB" }}>
                {" "}
                {translations[selectedLanguage].password}
              </label>
            </div>
            <div style={{ padding: "1em 0em" }}>
              <input
                id="password"
                type="password"
                placeholder="min 6 chars"
                required
                style={{
                  width: "100%",
                  padding: "0.5em",
                  backgroundColor: "#0C1728",
                  color: "white",
                  borderRadius: "3px",
                  border: "1px solid #000000",
                }}
              />
            </div>
            <div style={{ paddingTop: "1em" }}>
              <label style={{ color: "#90A4BB" }}>
                {" "}
                {translations[selectedLanguage].Confirmpassword}
              </label>
            </div>
            <div style={{ padding: "1em 0em" }}>
              <input
                id="confirmPassword"
                type="password"
                required
                style={{
                  width: "100%",
                  padding: "0.5em",
                  backgroundColor: "#0C1728",
                  color: "white",
                  borderRadius: "3px",
                  border: "1px solid #000000",
                }}
              />
            </div>
            <div style={{ paddingTop: "1em" }}>
              <label style={{ color: "#90A4BB" }}>
                {" "}
                {translations[selectedLanguage].captchaCode}
              </label>
              <img src={captchaImg}  width="200" height="40" alt='captchaPic' style={{ marginLeft:15,borderRadius:6}} onClick={fetchCaptcha} />
            </div>
            <div style={{ padding: "1em 0em" }}>
              <input
                type="text"
                id="Ccode"
                required
                style={{
                  width: "100%",
                  padding: "0.5em",
                  backgroundColor: "#0C1728",
                  color: "white",
                  borderRadius: "3px",
                  border: "1px solid #000000",
                }}
              />
            </div>

            <label
              style={{
                display: "block",
                marginBottom: "1em",
                paddingTop: "1em",
                color: "#90A4BB",
                cursor: "pointer",
              }}
            >
              <input id="tosCheckbox" type="checkbox" />{" "}
              {translations[selectedLanguage].TOS}
              <span onClick={handleTosClick} style={{ color: "#2C75C8" }}>
                <strong>TOS</strong>
              </span>
            </label>

            <button
              onClick={handleCreateUser}
              style={{
                display: "flex",
                alignItems: "center",
                background: "#1A4E93",
                color: "white",
                padding: "0.5em 415px",
                borderRadius: "0.5em",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontSize: "1em",
                fontFamily:
                  'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
                border: "1px solid #1A4E93",
              }}
            >
              <svg
                fill="#000000"
                viewBox="0 0 32 32"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  height: "1em",
                  width: "auto",
                  marginRight: "0.5em",
                  filter: "invert(1)",
                  pointerEvents: "none",
                }}
              >
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  <title>login</title>{" "}
                  <path d="M12.219 26.156h6.094c1.156 0 2.125-0.406 2.875-1.188 0.75-0.75 1.219-1.75 1.219-2.875v-12.219c0-1.125-0.469-2.125-1.219-2.875s-1.75-1.188-2.875-1.188h-6.094v2.563h6.094c0.875 0 1.531 0.656 1.531 1.5v12.219c0 0.844-0.656 1.531-1.531 1.531h-6.094v2.531zM0 13.563v4.875c0 0.563 0.469 1.031 1.031 1.031h5.688v3.844c0 0.344 0.156 0.625 0.469 0.781 0.125 0.031 0.281 0.031 0.344 0.031 0.219 0 0.406-0.063 0.563-0.219l7.344-7.344c0.281-0.281 0.25-0.844 0-1.156l-7.344-7.313c-0.25-0.25-0.563-0.281-0.906-0.188-0.313 0.156-0.469 0.406-0.469 0.75v3.875h-5.688c-0.563 0-1.031 0.469-1.031 1.031z"></path>{" "}
                </g>
              </svg>
              {translations[selectedLanguage].create}
            </button>

            {showTosModal && <TosModal onClose={handleCloseTosModal} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default RegistrationPage;
