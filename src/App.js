import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useCookies } from "react-cookie";
import StresserST from "./pages/StresserSt/StresserST";
function App() {
  const [cookies] = useCookies(["token"]);
  // Check if the "token" cookie exists
  const isAuthenticated = cookies.token ? true : false;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated ? <Navigate to="/StresserST" /> : <LoginPage />
          }
        />
        <Route path="/StresserST" element={<StresserST />} />
      </Routes>
    </Router>
  );
}

export default App;
