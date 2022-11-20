import React, { Link } from "react-router-dom";
import { useState } from "react";

export default function Register(props) {
    
    const [profdata, setProfdata] = useState({
        user_id: "",
        passoword: "",
        user_name: "",
        user_email: "",
        address_f: "",
        address_l: "",
        img: "",
    });

    const [bool, setBool] = useState(false);

    const setText = (e) => {

    };

    const isRegister = () => {
        bool ? <Link to = "/"></Link> : alert("Invalid Register!")
    };

    return(
        <div>
            <inner>
                <p>Register</p>
                <div>
                    <nav>
                        <ul>
                            <li>
                                <div>
                                    Set your ID : {" "}
                                    <input type = "text" onChange={setText} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your password : {" "}
                                    <input type="password" onChange = {setText} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your name : {" "}
                                    <input type = "text" onChange={setText} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your email : {" "}
                                    <input type = "text" onChange={setText} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your address : {" "}
                                    <div>
                                        <input type="text" onChange = {setText} />
                                    </div>
                                    <div>
                                        <input type="text" onChange = {setText} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your profile image : {" "}
                                    <input type = "file" onChange = {setText} />
                                </div>
                            </li>
                        </ul>
                        <div>
                            <button onClick = {isRegister}>
                                Register
                            </button>
                        </div>
                    </nav>
                </div>
            </inner>
        </div>
    );
}