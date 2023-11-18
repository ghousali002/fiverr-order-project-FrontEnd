import React from "react";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useCookies } from "react-cookie";
import Dashboard from "./pages/Dashboard/Dashboard";

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
            isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
          }
        />
        {/* Add more routes for authenticated pages, e.g., dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
