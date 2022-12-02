import Topnav from './nav';
import { useState, useEffect, timeout, delay } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";

export default function Edit(props) {
    
    const [questions, setQuestions] = useState([]);
    const [returnee, setreturnee] = useState([]);

    function ChangeReturnee(a, z) {//
        var temp = returnee;
        temp[z] = a;
        setreturnee(temp);
    }

    function append(questions, question) {
        var temp = questions;
        questions.push(question);
        setQuestions(temp);
    }
    function setSome(iterator) {
        var temp = questions[iterator];
        console.log(questions[iterator]);
        if (questions[iterator].question_type == "multiple choice") {
            return (
                <>
                <li>
                    <div>
                        <input type="text" defaultValue={questions[iterator].question} />
                        <select name="options" defaultValue={questions[iterator].question_type}>
                            <option value="number">number</option>
                            <option value="boolean">boolean</option>
                            <option value="multiple choice">multiple choice</option>
                            <option value="text">text</option>
                        </select>
                        <input type="radio" disabled="TRUE" checked="TRUE"></input>
                        <input type="text"></input>
                        <input type="radio" disabled="TRUE" checked="TRUE"></input>
                        <input type="text"></input>
                        <input type="radio" disabled="TRUE" checked="TRUE"></input>
                        <input type="text"></input>
                    </div>
                    <button>delete</button>
                </li>
            </>
            );
        }
        return(
            <>
                <li>
                    <div>
                        <input type="text" defaultValue={questions[iterator].question} />
                        <select name="options" defaultValue={questions[iterator].question_type}>
                            <option value="number">number</option>
                            <option value="boolean">boolean</option>
                            <option value="multiple choice">multiple choice</option>
                            <option value="text">text</option>
                        </select>
                    </div>
                    <button>delete</button>
                </li>
            </>
        )
    }
    function addDiv() {

    }
    useEffect(() => {
        Axios.get("http://localhost:3305/api/diary/questions/id="+props.profile.user_id).then((response) => {
            var z = 0;
            for (var i in response.data) {
                append(questions, response.data[i]);
                ChangeReturnee(setSome(z),z);
                console.log(returnee);
                z++;
            }
    })})
    

    
    return(
        <div>
            <Topnav />
            <inner>
                <div>
                    <p>Edit Question</p>
                    <button onClick={addDiv}>+</button> 
                </div>
                <ul>
                    {returnee}
                </ul>
            </inner>
            <button>Save</button>
        </div>
    );
}