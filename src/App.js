import "@fortawesome/fontawesome-free/css/all.min.css";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginPage from "./pages/LoginPage/LoginPage";
import { useCookies } from "react-cookie";
import StresserST from "./pages/StresserSt/StresserST";
import StresserZone from "./pages/StresserZone/StresserZone";
import StressThem from "./pages/StressThem/StressThem";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage";

function App() {
  const [cookies] = useCookies(["token"]);
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
        <Route path="/Register" element={<RegistrationPage />} />
        <Route path="/Login" element={<LoginPage />} />

        <Route path="/StresserST" element={<StresserST />} />
        <Route path="/StresserZone" element={<StresserZone />} />
        <Route path="/StressThem" element={<StressThem />} />
      </Routes>
    </Router>
  );
}

export default App;
