import Topnav from './nav';
import Axios from "axios";
import { useState } from "react";
import React, { Link } from "react-router-dom";

export default function log(props) {

    const [logstr, setLogstr] = useState({
        date: [],
        question_set: [],
    })
    Axios.get("http://localhost:3305/api/diary/logday").then((response) => {
        for(var i in response.data){
            logstr.date[i] = response.data[i].date;
            logstr.question_set[i] = response.data[i].question_set;
        }
    })

    const [logdata, setLogdata] = useState({
        date: [],
        question_order: [],
        question: [],
        question_value: [],
    })
    Axios.get("http://localhost:3305/api/diary/questions").then((response) => {
        for(var i in response.data){
            logdata.date[i] = response.data[i].date;
            logdata.question_order[i] = response.data[i].question_order;
            logdata.question[i] = response.data[i].question;
            logdata.question_value[i] = response.data[i].question_value;
        }
    }) // compare user_id and get only equaled user_id's data.

    const [cumDate, setCumDate] = useState({
        cum_date : new Date(),
        cum_year : cumDate.cum_date.getFullYear(),
        cum_month : cumDate.cum_date.getMonth()+1,
        cum_day : cumDate.cum_date.getDate(),
    })
    const showData = () => {
        var showDate = cumDate.cum_year + "-" + cumDate.cum_month + "-" + cumDate.cum_day;
        // if we receive id from app.js => 
        return(
            <div>
                <nav>
                    <ul>
                        <li>
                            <button>previous</button>
                            <div>
                                {showDate}
                            </div>
                            <button>next</button>
                        </li>
                    </ul>
                </nav>
            </div>
        )
    }

    return(
        <div>
            <Topnav />
            <inner>
                <nav>
                    <ul>
                        <li>
                            {showData}
                        </li>
                    </ul>
                </nav>
            </inner>
        </div>
    );
}