import  Axios  from "axios";
import { useState } from "react";
import React, { Link } from "react-router-dom";
import { hashutil } from "./hashutil.mjs";

export default function Login(props) {

    const [login_id, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [avail, setAvail] = useState(false);

    const setId = (e) => {
        setLogin(e.target.value);
    }
    const setPwd = (e) => {
        setPassword(e.target.value);
    }

    Axios.get("http://localhost:3305/api/diary/users").then((response) => {
        for(var i in response.data){
            if(response.data[i].user_id == login_id){
                if(response.data[i].password == hashutil(login_id, response.data[i].user_email, password)){
                    setAvail(true);
                    break;
                }
            }
        }
    })

    const setLoginId =() => {
        if(!avail){
            alert("Unavail Login!");
        }else{
            alert("Login Success!");
            document.location.href = 'http://localhost:3000/log';
        }
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