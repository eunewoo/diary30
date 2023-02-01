import React, { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import { hashutil } from "./hashutil.mjs";

import { useRecoilState, useRecoilValue } from "recoil";
import { DisplayImageAtom } from "../model/states";

export default function Register(props) {
  const [displayImage, setDisplayImage] = useRecoilState(DisplayImageAtom);
  const [value, setValue] = useState("");

  const [profdata, setProfdata] = useState({
    user_id: "",
    password: "",
    user_name: "",
    user_email: "",
    address_f: "",
    address_l: "",
    img: "",
  });

  const {
    user_id,
    password,
    user_name,
    user_email,
    address_f,
    address_l,
    img,
  } = profdata;

  const setTextid = (e) => {
    const { name, value } = e.target;

    setProfdata({
      ...profdata,
      [name]: value,
    });
  };

  const setTextid2 = (e) => {
    const { name, value } = e.target;
    setValue(e.target.value);

    setProfdata({
      ...profdata,
      [name]: value,
    });
  };

  const setImage = (e) => {
    //post image on db
    const img = e.target.files[0];

    const formData = new FormData();
    formData.append("file", img);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    Axios.post(
      "https://diary30wooserver.web.app/api/users",
      formData,
      config
    ).then((res) => {
      //console.log('s3url', res.data.location);

      setProfdata({
        ...profdata,
        img: res.data.location,
      });
    });
  };

  const isRegister = () => {
    switch ("") {
      case user_id:
        alert("Put id!");
        break;
      case password:
        alert("Put Password!");
        break;
      case user_name:
        alert("Put name!");
        break;
      case user_email:
        alert("Put email!");
        break;
      case address_f:
        alert("Put first address!");
        break;
      case address_l:
        alert("Put last address!");
        break;
      default:
        let temp1 = 0;
        if (!/\S+@\S+\.\S+/.test(profdata.user_email)) {
          alert("Your email is not in valid form!");
          temp1 = 1;
        }
        if (
          !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(
            profdata.password
          )
        ) {
          alert("Your password is not in valid form!");
          temp1 = 1;
        } else {
          let temp = 0;
          if (temp1 === 0) {
            Axios.get("https://diary30wooserver.web.app/api/users").then(
              (response) => {
                for (var i in response.data) {
                  if (response.data[i].user_id == user_id) {
                    break;
                  } else if (
                    i == response.data.length - 1 &&
                    response.data[i].user_id != user_id
                  ) {
                    temp = 1;
                  }
                }
                if (temp === 1) {
                  alert("Success Register!");

                  Axios.post("https://diary30wooserver.web.app/api/users", {
                    user_id: profdata.user_id,
                    password: hashutil(user_id, user_email, password),
                    user_name: profdata.user_name,
                    user_email: profdata.user_email,
                    address_f: profdata.address_f,
                    address_l: profdata.address_l,
                    img: profdata.img,
                  })
                    .then(() => {
                      setDisplayImage(() => profdata.img);
                    })
                    .then(() => {
                      document.location.href = "http://localhost:3000/";
                    });
                } else if (temp === 0) {
                  alert("Invalid Register!");
                }
              }
            );
          }
        }
    }
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      event.preventDefault();
      document.getElementById("registerButton").click();
    }
  };

  useEffect(() => {
    const registerForm = document.getElementById("registerWrapper");
    if (!registerForm) return;

    registerForm.addEventListener("keyup", handleKeyDown);
    return () => {
      if (!registerForm) return;
      registerForm.removeEventListener("keyup", handleKeyDown);
    };
  }, []);

  return (
    <div id="registerWrapper">
      <inner>
        <p>Register</p>
        <div>
          <nav>
            <ul>
              <li>
                <div>
                  <p>Set your ID : </p>
                  <input
                    id="user_id"
                    name="user_id"
                    value={user_id}
                    type="text"
                    onChange={setTextid}
                  />
                </div>
              </li>
              <li>
                <div>
                  <p>Set your password : </p>
                  <label class={`input-label ${value ? "has-value" : ""}`}>
                    At least 8chars, uppercase + lowercase + number{" "}
                  </label>
                  <input
                    name="password"
                    defaultValue={password}
                    type="password"
                    onChange={setTextid2}
                  />
                </div>
              </li>
              <li>
                <div>
                  <p>Set your name : </p>
                  <input
                    name="user_name"
                    value={user_name}
                    type="text"
                    onChange={setTextid}
                  />
                </div>
              </li>
              <li>
                <div>
                  <p>Set your email : </p>
                  <input
                    name="user_email"
                    value={user_email}
                    type="text"
                    onChange={setTextid}
                  />
                </div>
              </li>
              <li id="registerAddress">
                <div>
                  <p>Set your address : </p>
                  <div>
                    <input
                      name="address_f"
                      value={address_f}
                      type="text"
                      onChange={setTextid}
                    />
                  </div>
                  <div>
                    <input
                      name="address_l"
                      value={address_l}
                      type="text"
                      onChange={setTextid}
                    />
                  </div>
                </div>
              </li>
              <li>
                <div>
                  <p>Set your profile image : </p>
                  <input type="file" onChange={setImage} />
                </div>
              </li>
            </ul>
            <div id="registerButtonWrapper">
              <button id="registerButton" onClick={isRegister}>
                Register
              </button>
            </div>
          </nav>
        </div>
      </inner>
    </div>
  );
}
