import { useState } from "react";
import React, { Link } from "react-router-dom";

export default function Login(props) {

    const [login_id, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const setId = (e) => {
        setLogin(e.target.value);
    }
    const setPwd = (e) => {
        setPassword(e.target.value);
    }
    const setLoginId =() => {
        console.log(login_id, password);
    }

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