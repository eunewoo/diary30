import Topnav from './nav.js';
import Axios from "axios";
import { useState } from "react";
import React, { Link } from "react-router-dom";

export default function Log(props) {

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
        question_type: [],
    })
    Axios.get("http://localhost:3305/api/diary/questions").then((response) => {
        for(var i in response.data){
            logdata.date[i] = response.data[i].date;
            logdata.question_order[i] = response.data[i].question_order;
            logdata.question[i] = response.data[i].question;
            logdata.question_value[i] = response.data[i].question_value;
            logdata.question_type[i] = response.data[i].question_type;
        }
    }) // compare user_id and get only equaled user_id's data.

    const cum_date = new Date();

    const [cumDate, setCumDate] = useState({
        cum_year : cum_date.getFullYear(),
        cum_month : cum_date.getMonth()+1,
        cum_day : cum_date.getDate(),
    })

    const { cum_year, cum_month, cum_day } = cumDate;

    const [inputdata, setInputdata] = useState({
        number: "",
        bool: "",
        text: "",
        multiple: "",
    })

    const { number, bool, text, multiple } = inputdata;

    const setText = (e) => {
        const { name, value } = e.target;
        setInputdata({
            ...inputdata,
            [name]: value,
        })
    }

    const presentData = () => {
        const { date, question_order, question, question_value, question_type } = logdata;
        var index = [];
        var index_value = [];
        var temp = '';

        for(var i in date){
            temp += date[i]
            if(temp.substr(0, 10) == cum_year +"-"+ cum_month +"-"+ (cum_day-1)){
                index[question_order[i]] = question[i];
                index_value[question_order[i]] = question_type[i];
            }
            temp = ''
        }
        const questionstype = (arr_type) => {
            switch(arr_type){
                case "Number":
                    console.log("1")
                    return(
                        <div>
                            <input
                            name = "number"
                            value = {number} 
                            type = "text"
                            onChange = {setText}
                            />
                        </div>
                    )
                case "Boolean":
                    return(
                        <div>
                            <input 
                            name = "bool"
                            value = "true"
                            type = "checkbox"
                            onClick = {setText}
                            />True
                            <input 
                            name = "bool"
                            value = "false"
                            type = "checkbox"
                            onClick = {setText}
                            />False
                        </div>
                    )
                case "Text":
                    return(
                        <div>
                            <input 
                            name = "text"
                            value = {text}
                            type = "text"
                            onchange = {setText}
                            />
                        </div>
                    )
                case "Multiple":
                    return(
                        <div>
                            <input 
                            name = "multiple"
                            value = "Ok day"
                            type = "checkbox"
                            onClick = {setText}
                            />Ok day
                            <input 
                            name = "multiple"
                            value = "Bad day"
                            type = "checkbox"
                            onClick = {setText}
                            />Bad day
                            <input 
                            name = "multiple"
                            value = "Great day"
                            type = "checkbox"
                            onClick = {setText}
                            />Great day
                        </div>
                    )
            }
        }
        for(var i in index){
            return(
                <div>
                    <li>
                        {index[i]}
                    </li>
                    <li>
                        {questionstype(index_value[i])}
                    </li>
                </div>
            )
        }
    }

    const clickPre = () => {
        setCumDate({
            ...cumDate,
            cum_day: cum_day-1
        })
    }

    const clickNext = () => {
        setCumDate({
            ...cumDate,
            cum_day: cum_day+1
        })
    }

    const showData = () => {
        var showDate = cumDate.cum_year + "-" + cumDate.cum_month + "-" + cumDate.cum_day;
        // if we receive id from app.js => 
        return(
            <div>
                <nav>
                    <ul>
                        <li>
                            <button onClick={clickPre}>previous</button>
                            <div>
                                {showDate}
                            </div>
                            <button onClick={clickNext}>next</button>
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
                            {showData()}
                        </li>
                        <li>
                            {presentData()}
                        </li>
                    </ul>
                </nav>
            </inner>
        </div>
    );
}