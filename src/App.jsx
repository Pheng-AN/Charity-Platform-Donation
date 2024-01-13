import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useNavigate,
  Navigate,
} from "react-router-dom";
import NewNavbarComBeta from "./components/NewNavbarComBeta";
import Footer from "./components/Footer";
import FeedsPage from "./components/FeedsPage";
import HomePage from "./components/HomePage";
import RaiseFundsPage from "./components/RaiseFundsPage";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import LoginPage from "./components/LoginPage";
import SignupPage from "./components/SignupPage";
import DiscoverPage from "./components/DiscoverPage";
import ProfilePage from "./components/ProfilePage";
import ForbiddenPage from "./components/ForbiddenPage";
import Aboutus from "./components/Aboutus";

const App = () => {
  const [token, setToken] = useState(false);
  if (token) {
    sessionStorage.setItem("token", JSON.stringify(token));
  }
  useEffect(() => {
    if (sessionStorage.getItem("token")) {
      let data = JSON.parse(sessionStorage.getItem("token"));
      setToken(data);
    }
  }, []);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      <BrowserRouter>
        <div>
          {/* token={token} is meaning that you need token to use in that component */}
          {/* setToken={setToken} is meaning that you get get the token back from that component; 
          However, in this case, the setToken is used to bring back the null token (token is already nullified when logout) */}
          <NewNavbarComBeta token={token} setToken={setToken} />
        </div>
        {/* padding:"10px" */}
        <div style={{ flex: 1 }}>
          {/* Adjust the padding or other styles based on your layout */}
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/feeds" element={<FeedsPage />} />
            {/* Cannot change the page if I dont have access  */}
            {/* {token ? (
              <Route path="/raisefunds" element={<RaiseFundsPage />} />
            ) : (
              <Route path="/forbidden" element={<ForbiddenPage />} />
            )} */}

            {/* The one works btw */}
            <Route
              path="/raisefunds"
              element={
                token ? (
                  <RaiseFundsPage token={token} />
                ) : (
                  <Navigate to="/forbidden" />
                )
              }
            />
            <Route path="/login" element={<LoginPage setToken={setToken} />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/discover" element={<DiscoverPage />} />
            <Route path="/aboutus" element={<Aboutus />} />
            {/* <Route path="/profile" element={<ProfilePage />} /> */}
            <Route
              path="/profile"
              element={
                token ? (
                  <ProfilePage token={token} />
                ) : (
                  <Navigate to="/forbidden" />
                )
              }
            />
            <Route path="/forbidden" element={<ForbiddenPage />} />
            {/* <Route path="*" element={<NotFoundPage />} /> */}
          </Routes>
        </div>
        <div>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
