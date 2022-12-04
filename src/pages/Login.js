import  Axios  from "axios";
import { useState } from "react";
import React, { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import { hashutil } from "./hashutil.mjs";

export default function Login(props) {

    const [login_id, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [avail, setAvail] = useState(false);
    const navigate = useNavigate();

    const setId = (e) => {
        setLogin(e.target.value);
    }
    const setPwd = (e) => {
        setPassword(e.target.value);
    }

    const setLoginId = () => {
        Axios.get("http://localhost:3305/api/diary/users/user_id="+login_id+"").then((response) => {
            if(response.data.length === 0) {
                alert("Your id is not found on DB");
            } else {
                if (response.data[0].password == hashutil(login_id, response.data[0].user_email, password)) {
                    alert("Login Success!");
                    props.ChangeProfile({
                        user_id: response.data[0].user_id,
                        profile: response.data[0].img,
                        name: response.data[0].user_name,
                        email: response.data[0].user_email,
                        address1 : response.data[0].address_f,
                        address2 : response.data[0].address_l
                      })
                      navigate("/log")
                } else {
                    alert("Unavail Login!");
                }}})};

    return(
        <div>
            <inner>
                <p>Login</p>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <div>
                                    ID : {" "}
                                    <input type="text" onChange={setId} />
                                </div>
                                <br/>
                            </li>
                        </ul>
                        <ul>
                            <li>
                                <div>
                                    Password : {" "}
                                    <input type= "password" onChange={setPwd} />
                                </div>
                            </li>
                        </ul>
                        <div>
                            <button onClick={setLoginId}>
                                Login
                            </button>
                            <Link to="/register"><button>Register</button></Link>
                        </div>
                    </nav>
                </div>
            </inner>
        </div>
    );
}