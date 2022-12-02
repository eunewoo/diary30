import Topnav from './nav';
import { useState } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";

export default function View(props) {
    const [userdata, setUserdata] = useState({
        date: [],
        question: [],
        question_value: [],
    }) //if match id then get Axios.

    Axios.get("http://localhost:3305/api/diary/questions").then((response) => {
        for(var i in response.data){
            userdata.date[i] = response.data[i].date;
            userdata.question[i] = response.data[i].question;
            userdata.question_value[i] = response.data[i].question_value;
        }
    })

    const { date, question, question_value } = userdata;

    return(
        <div>
            <Topnav />
            <div>
                {/* view data presentation is important, so we have to select wich one to use to show the data */}
            </div>
        </div>
    );
}