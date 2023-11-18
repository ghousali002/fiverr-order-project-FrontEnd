import '@fortawesome/fontawesome-free/css/all.min.css';
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
        <Route path="/StresserST" element={<StresserST />} />
        <Route path="/StresserZone" element={<StresserZone />} />
        
      </Routes>
    </Router>
  );
}

export default App;
