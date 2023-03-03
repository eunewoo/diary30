import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Edit from "./pages/Edit.js";
import Log from "./pages/Log.js";
import Login from "./pages/Login.js";
import Register from "./pages/Register.js";
import View from "./pages/View.js";
import Profile from "./pages/Profile.js";
import React, { useState } from "react";

import { RecoilRoot } from "recoil";
// main function
function App() {
  const [id, setId] = useState({});
  //user data storage
  const [profile, setProfile] = useState({
    user_id: "",
    password: "",
    profile: "",
    name: "",
    email: "",
    address1: "",
    address2: "",
    user_ref: {},
  });
  const [questions, setQuestions] = useState({});
  //set user profile to a user's prop (id,pw...)
  function ChangeProfile(pf) {
    setProfile(pf);
  }

  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login ChangeProfile={ChangeProfile} />}
            //componentized by pages + recoilstates and few function
          />
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/log" element={<Log profile={profile} />} />
          <Route exact path="/edit" element={<Edit profile={profile} />} />
          <Route exact path="/view" element={<View profile={profile} />} />
          <Route
            exact
            path="/profile"
            element={
              <Profile profile={profile} changeProfile={ChangeProfile} />
            }
          />
          ;
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
