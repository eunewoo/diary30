import Axios from "axios";
import { useState, useEffect } from "react";
import React, { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { hashutil } from "./hashutil.mjs";

import { useRecoilState, useRecoilValue } from "recoil";
import { DisplayImageAtom } from "../model/states";

export default function Login(props) {
  const [displayImage, setDisplayImage] = useRecoilState(DisplayImageAtom);

  const [login_id, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [avail, setAvail] = useState(false);
  const navigate = useNavigate();

  const setId = (e) => {
    setLogin(e.target.value);
  };
  const setPwd = (e) => {
    setPassword(e.target.value);
  };

  //when login is success, first save userId in req.session in server side
  //and get user data based on req.session in every page loading.
  const setLoginId = () => {
    Axios.post(
      "http://localhost:5001/diary30wooserver/us-central1/app/api/users/login",
      {
        user_id: login_id,
        password: password,
      },
      {
        withCredentials: true,
      }
    ).then((res) => {
      console.log("res.status", res.status);

      if (res.status == "200") {
        //document.cookie = `session=${res.data.session}; expires=${res.data.expires}; path=/`;
        navigate("./log");
      }
    });
  };

  // useEffect(() => {
  //   console.log("user_ref change check", props.profile.user_ref);
  // }, [props.profile.user_ref]);

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("loginButton").click();
    }
  };

  useEffect(() => {
    const loginForm = document.getElementById("loginWrapper");
    if (!loginForm) return;

    loginForm.addEventListener("keyup", handleKeyDown);
    return () => {
      if (!loginForm) return;
      loginForm.removeEventListener("keyup", handleKeyDown);
    };
  }, []);

  return (
    <div id="loginWrapper">
      <inner>
        <p>Login</p>
        <div>
          <nav>
            <ul>
              <li>
                <div>
                  <input
                    id="inputId"
                    placeholder="DIARY ID"
                    type="text"
                    onChange={setId}
                    autoComplete="off"
                  />
                </div>
                <br />
              </li>
            </ul>
            <ul>
              <li>
                <div>
                  <input
                    id="inputPw"
                    placeholder="PASSWORD"
                    type="password"
                    onChange={setPwd}
                    autoComplete="off"
                  />
                </div>
              </li>
            </ul>
            <div>
              <button id="loginButton" onClick={setLoginId}>
                Login
                <span class="material-symbols-outlined">login</span>
              </button>
              <Link to="/register">
                <button id="registerButton">
                  Don't have an account? Registe here ↗️
                </button>
              </Link>
            </div>
          </nav>
        </div>
      </inner>
    </div>
  );
}
