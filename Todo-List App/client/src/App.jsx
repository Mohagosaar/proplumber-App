import { useState, useEffect } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import LandingPage from "./Components/LandingPage";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import Dashboard from "./Components/Dashboard";

const App = () => {
  const [isAuthenitcated, setIsAuthenitcated] = useState(false);

  const isAuth = async () => {
    try {
      const response = await axios.get("/api/user/isverified", {
        headers: { token: localStorage.token },
      });
      const validateUser = await response.data;
      validateUser === true
        ? setIsAuthenitcated(true)
        : setIsAuthenitcated(false);
    } catch (err) {
      console.log(err.message);
    }
  };
  useEffect(() => {
    isAuth();
  }, []);
  const setAuth = (Boolean) => {
    setIsAuthenitcated(Boolean);
  };
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/Login"
            element={
              !isAuthenitcated ? (
                <Login setAuth={setAuth} />
              ) : (
                <Navigate to="/Dashboard" />
              )
            }
          />
          <Route
            path="/Register"
            element={
              isAuthenitcated ? (
                <Navigate to="/Login" />
              ) : (
                <Register setAuth={setAuth} />
              )
            }
          />
          <Route
            path="/Dashboard"
            element={
              isAuthenitcated ? (
                <Dashboard setAuth={setAuth} />
              ) : (
                <Navigate to="/Login" />
              )
            }
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
