import React, { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import { hashutil } from "./hashutil.mjs";

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

    const { user_id, passoword, user_name, user_email, address_f, address_l } = profdata;

    const setTextid = (e) => {
        const { name, value } = e.target;

        setProfdata({
            ...profdata,
            [name]: value,
        });
    };

    const setImage = (e) => {
        //post image on db
    }

    const isRegister = () => {
        switch(""){
            case user_id:
                alert("Put id!");
                break;
            case passoword:
                alert("Put Password!");
                break;
            case user_name:
                alert("Put name!");
                break;
            case user_email:
                //Todo: validation for email is required here like having @
                alert("Put email!");
                break;
            case address_f:
                alert("Put first address!");
                break;
            case address_l:
                alert("Put last address!");
                break;
            default:
                if (!/\S+@\S+\.\S+/.test(profdata.user_email)) {
                    alert("Your email is not in valid form!");
                } else {
                let temp = 0;
                Axios.get('http://localhost:3305/api/diary/users').then((response) => {
                    for(var i in response.data){
                        if(response.data[i].user_id == user_id){
                            break;
                        }else if(i == response.data.length-1 && response.data[i].user_id != user_id){
                            temp = 1;
                        }
                    }
                    if(temp === 1){
                        alert("Success Register!");
                        Axios.post('http://localhost:3305/api/diary/users', {
                            user_id: profdata.user_id,
                            password: hashutil(profdata.user_id, profdata.user_email, profdata.password),
                            profile: profdata.img,
                            name: profdata.user_name,
                            email: profdata.user_email,
                            address1: profdata.address_f,
                            address2: profdata.address_l
                        })
                        document.location.href = 'http://localhost:3000';
                    }else if(temp === 0){
                        alert("Invalid Register!");
                    }
                })}
        }
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
                                    <input name = "user_id"
                                    value = {user_id}
                                    type = "text" 
                                    onChange={setTextid} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your password : {" "}
                                    <input name = "passoword"
                                    value = {passoword}
                                    type="password" 
                                    onChange = {setTextid} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your name : {" "}
                                    <input name = "user_name"
                                    value = {user_name}
                                    type = "text" 
                                    onChange={setTextid} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your email : {" "}
                                    <input name = "user_email"
                                    value = {user_email}
                                    type = "text" 
                                    onChange={setTextid} />
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your address : {" "}
                                    <div>
                                        <input name = "address_f"
                                        value = {address_f}
                                        type="text" 
                                        onChange = {setTextid} />
                                    </div>
                                    <div>
                                        <input name = "address_l"
                                        value = {address_l}
                                        type="text" 
                                        onChange = {setTextid} />
                                    </div>
                                </div>
                            </li>
                            <li>
                                <div>
                                    Set your profile image : {" "}
                                    <input type = "file" onChange = {setImage} />
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