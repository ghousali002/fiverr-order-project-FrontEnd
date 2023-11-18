import React from "react";
import '@fortawesome/fontawesome-free/css/all.min.css';

// import {
//   Route,
//   BrowserRouter as Router,
//   Routes,
//   Navigate,
// } from "react-router-dom";
// import LoginPage from "./pages/LoginPage/LoginPage";
// import { useCookies } from "react-cookie";
// import Dashboard from "./pages/Dashboard/Dashboard";
//  import StresserSt from "./pages/StresserSt/StresserST" 
 import StresserZone from "./pages/StresserZone/StresserZone";
 function App() {
//   const [cookies] = useCookies(["token"]);
//   // Check if the "token" cookie exists
//   const isAuthenticated = cookies.token ? true : false;

  return (
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         isAuthenticated ? <Navigate to="/dashboard" /> : <LoginPage />
    //       }
    //     />
    //     {/* Add more routes for authenticated pages, e.g., dashboard */}
    //     <Route path="/dashboard" element={<Dashboard />} />
    //   </Routes>
    // </Router>
    // <StresserSt />
    <StresserZone />

  );
}

export default App;
