import Topnav from './nav';
import { useState, useEffect, timeout, delay } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";

export default function Edit(props) {
    
    const [questions, setQuestions] = useState([]);
    const [returnee, setreturnee] = useState([]);
    const [post, setPost] = useState([]);

    function getData() {
        var list = document.getElementById("list");
        var ret = [];
        
        for (var i = 0; i < list.childNodes.length; i++) {
            var temp = {
                user_id: props.profile.user_id,
                question: "",
                question_selection: [],
                question_type: ""
            }
            temp.question = list.childNodes[i].childNodes[0].childNodes[0].value;
            temp.question_type = list.childNodes[i].childNodes[0].childNodes[1].value;
            if (list.childNodes[i].childNodes[0].childNodes[1].value === "multiple choice") {
                temp.question_selection.push(list.childNodes[i].childNodes[0].childNodes[3].value);
                temp.question_selection.push(list.childNodes[i].childNodes[0].childNodes[5].value);
                temp.question_selection.push(list.childNodes[i].childNodes[0].childNodes[7].value);
            }
            ret.push(temp)
        }
        return ret;
    }

    function detectChange() {
        var submit = getData();
        for (var i in submit) {
            var duplicate = false;
            for (var j in questions) {
                if (j.question !== i.question) {

                } else if (j.question_selection !== i.question) {

                } else if (j.question_type !== i.question) {
                    
                } else {
                    duplicate = true;
                }
            }
            if (duplicate === true) {
                
            } else if (duplicate === false) {
                //post i on db
                console.log(props.profile.user_id);
                Axios.post('http://localhost:3305/api/diary/questions', {
                    user_id: props.profile.user_id,
                    question: i.question,
                    question_type: i.question_type,
                    question_selection: i.question_selection
                });
            }

        }
        duplicate = false;
        for (var i in questions) {
            var duplicate = false;
            for (var j in submit) {
                if (j.question !== i.question) {

                } else if (j.question_selection !== i.question) {

                } else if (j.question_type !== i.question) {
                    
                } else {
                    duplicate = true;
                }
            }
            if (duplicate === true) {
                
            } else if (duplicate === false) {
                //delete j from db
                Axios.delete('http://localhost:3305/api/diary/questions/user_id="'+props.profile.user_id+'"&question="'+j.question+'";');
            }

        }
        
        console.log(getData());
    }

    function postChanges(original, submit) {
        detectChange();
    }

    function ChangeReturnee(a, z) {//
        var temp = returnee;
        temp[z] = a;
        setreturnee([...temp]);
    }

    function append(questions, question) {
        var temp = questions;
        questions.push(question);
        setQuestions(temp);
    }

    function returnSelection() {
        var returnee = document.createDocumentFragment();
        var radio = document.createElement('input');
        radio.type = "radio"
        radio.disabled = "TRUE"
        radio.checked = "TRUE"
        var text = document.createElement('input')
        text.type = "text";

        returnee.appendChild(radio);
        returnee.appendChild(text);
        returnee.appendChild(radio);
        returnee.appendChild(text);
        returnee.appendChild(radio);
        returnee.appendChild(text);

        return returnee;
    }

    function addSelection(e) {
        console.log(e.target.value);
        if (e.target.value == "multiple choice"){
            console.log(e.target.parentElement.childNodes.length);
            if (e.target.parentElement.childNodes.length == 2) {
                var div = e.target.parentElement;
                console.log(div)
                div.appendChild(returnSelection());
                div.appendChild(returnSelection());
                div.appendChild(returnSelection());
                console.log(e.target.parentElement.childNodes);
            }    
        } else if (e.target.parentElement.childNodes.length == 5) {
            var div = e.target.parentElement;
            console.log(div)
            for (var i = 2; i < 5; i++) {
                console.log(e.target.parentElement.childNodes[2]);
                e.target.parentElement.childNodes[2].remove();
            }
        }
    }

    function liDelete(e) {
        e.target.parentElement.remove();
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
                        <select name="options" defaultValue={questions[iterator].question_type} onChange={addSelection}>
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
                    <button onClick={liDelete}>delete</button>
                </li>
            </>
            );
        }
        return(
            <>
                <li>
                    <div>
                        <input type="text" defaultValue={questions[iterator].question} />
                        <select name="options" onChange={addSelection} defaultValue={questions[iterator].question_type}>
                            <option value="number">number</option>
                            <option value="boolean">boolean</option>
                            <option value="multiple choice">multiple choice</option>
                            <option value="text">text</option>
                        </select>
                    </div>
                    <button onClick={liDelete}>delete</button>
                </li>
            </>
        )
    }
    function newDiv() {
        var a = document.createElement('li');
        var b = document.createElement('div');
        var c = document.createElement('input');
        c.type = "text";
        var d = document.createElement('select');
        d.name = "options";
        d.oninput = addSelection;
        var e = document.createElement("option");
        e.value="number";
        e.appendChild(document.createTextNode("number"));
        var f = document.createElement("option");
        f.value="boolean";
        f.appendChild(document.createTextNode("boolean"));
        var g = document.createElement("option");
        g.value="multiple choice";
        g.appendChild(document.createTextNode("multiple choice"));
        var h = document.createElement("option");
        h.value="text";
        h.appendChild(document.createTextNode("text"));
        var i = document.createElement("button");
        i.textContent = "delete";
        i.onclick = liDelete;


        d.appendChild(e);
        d.appendChild(f);
        d.appendChild(g);
        d.appendChild(h);

        b.appendChild(c);
        b.appendChild(d);

        a.appendChild(b);
        a.appendChild(i);

        return(a);
    }

    function addDiv(e) {
        var list = document.getElementById('list');
        list.appendChild(newDiv());
    }
    
    useEffect(() => {
        Axios.get("http://localhost:3305/api/diary/questions/id="+props.profile.user_id).then((response) => {
            var z = 0;
            for (var i in response.data) {
                append(questions, response.data[i]);
                ChangeReturnee(setSome(z),z);
                z++;
                
            }
            console.log(questions);
    })}, []);
    
    return(
        <div>
            <Topnav />
            <inner>
                <div>
                    <p>Edit Question</p>
                    <button onClick={addDiv}>+</button> 
                </div>
                <ul id="list">
                    {returnee}
                </ul>
            </inner>
            <button onClick={postChanges}>Save</button>
        </div>
    );
}