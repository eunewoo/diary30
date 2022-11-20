import Topnav from './nav';
import { useState } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";

export default function edit(props) {
    
    // const [problems, setProblems] = useState({
    //     order : [],
    //     question : [],
    //     question_type : [],
    // })
    // Axios.get("http://localhost:3305/api/diary/questions").then((response) => {
    //     for(var i in response.data){
    //         problems.order[i] = 
    //     }
    // })

    return(
        <div>
            <Topnav />
            <inner>
                <nav>
                    <ul>
                        <li>

                        </li>
                    </ul>
                </nav>
            </inner>
        </div>
    );
}