import React, { useState } from "react";
import TosModal from "./TosModal";
import RegistrationPage from "../RegistrationPage/RegistrationPage";

function LoginPage() {
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const [showTosModal, setShowTosModal] = useState(false);

  const translations = {
    English: {
      register: "Register",
      backToLogin: "Back to Login",
      loginArea: "Login Area",
      login: "Login",
      username: "Username",
      password: "Password",
      TOS: "I have read and agree the ",

      // Add more translations as needed
    },
    Chinese: {
      register: "注册",
      backToLogin: "返回登录",
      loginArea: "登录区域",
      login: "登录",
      username: "用户名",
      password: "密码",
      TOS: "我已阅读并同意服务条款",

      // Add more translations as needed
    },
    Korean: {
      register: "회원 가입",
      backToLogin: "로그인으로 돌아가기",
      loginArea: "로그인 영역",
      login: "로그인",
      username: "사용자 이름",
      password: "비밀번호",
      TOS: "TOS를 읽었으며 이에 동의합니다.",

      // Add more translations as needed
    },
    Russian: {
      register: "Регистрация",
      backToLogin: "Вернуться к входу",
      loginArea: "Область входа",
      login: "авторизоваться",
      username: "имя пользователя",
      password: "пароль",
      TOS: "Я прочитал и согласен с Условиями использования",

      // Add more translations as needed
    },
    Spanish: {
      register: "Registrarse",
      backToLogin: "Volver al inicio de sesión",
      loginArea: "Área de inicio de sesión",
      login: "acceso",
      username: "nombre de usuario",
      password: "contraseña",
      TOS: "He leído y acepto los TOS",
      // Add more translations as needed
    },
    Japanese: {
      register: "登録",
      backToLogin: "ログインに戻る",
      loginArea: "ログインエリア",
      login: "ログイン",
      username: "ユーザー名",
      password: "パスワード",
      TOS: "TOS を読んで同意します",
    },
  };

  const handleRegisterClick = () => {
    setShowRegisterForm(true);
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

  return (
    <div
      style={{
        backgroundColor: "#061325",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily:
          'Poppins, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
      }}
    >
      {showRegisterForm ? (
        <div>
          {/* <h2 style={{ color: "white" }}>
            {translations[selectedLanguage].register}
          </h2>
          <button onClick={handleBackToLoginClick}>
            {translations[selectedLanguage].backToLogin}
          </button> */}
          <RegistrationPage />
        </div>
      ) : (
        <div
          style={{
            background: "#0E1C2F",
            padding: "0em",
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
                {translations[selectedLanguage].login}
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
                  {translations[selectedLanguage].register}
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
                {translations[selectedLanguage].password}
              </label>
            </div>
            <div style={{ padding: "1em 0em" }}>
              <input
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

            <label
              style={{
                display: "block",
                marginBottom: "1em",
                paddingTop: "1em",
                color: "#90A4BB",
                cursor: "pointer",
              }}
            >
              <input required type="checkbox" />{" "}
              {translations[selectedLanguage].TOS}
              <span onClick={handleTosClick} style={{ color: "#2C75C8" }}>
                <strong>TOS</strong>
              </span>
            </label>

            <button
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
              {translations[selectedLanguage].login}
            </button>

            {showTosModal && <TosModal onClose={handleCloseTosModal} />}
          </div>
        </div>
      )}
    </div>
  );
}

export default LoginPage;
