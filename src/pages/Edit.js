import Topnav from './nav';
import { useState } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";

export default function Edit(props) {
    
    const [problems, setProblems] = useState({
        question : "",
        question_type : "",
    })
    Axios.get("http://localhost:3305/api/diary/logday").then((response) => {
        var temp = response.data[0].id;
        var index = 0;
        for(var i in response.data){
            if(temp <= response.data[i].id){
                temp = response.data[i].id
                index = i;
                problems.question = ""+response.data[index].question_set;
                problems.question_type = ""+response.data[index].question_type_set;
            }
        }
    }) //by props we should compare id also!

    const [inputThing, setInputThing] = useState({
        qs_arr : [],
        qs_type : [],
    });

    const setText = (e) => {
        var temp = e.target.value
    }

    const setSome = () => {
        const { question, question_type } = problems;
        const temp_question = question.split('|');
        const temp_question_type = question_type.split('|');

        const typeShow = (arr_type) => {
            switch(arr_type){
                case "Multiple":
                    return(
                        <div>
                            <div>
                                {/* class should be dropdown */}
                            </div>
                            <li>
                                Ok day
                            </li>
                            <li>
                                Bad day
                            </li>
                            <li>
                                Great day
                            </li>
                        </div>
                    )
                default:
                    return(
                        <div>
                            <div> 
                                {/* class should be dropdown */}
                            </div>
                        </div>
                    )
            }
        }

        for(var i in temp_question){
            return(
                <div>
                    <li>
                        <input 
                        value = {temp_question[i]} // this is problem I have to solve..
                        type = "text"
                        onChange = {setText}
                        />
                    </li>
                    <li>
                        {typeShow(temp_question_type[i])}
                    </li>
                </div>
            )
        }
    }

    return(
        <div>
            <Topnav />
            <inner>
                <nav>
                    <ul>
                        <li>
                            {setSome()}
                        </li>
                    </ul>
                </nav>
            </inner>
        </div>
    );
}