import Topnav from './nav';
import { useState } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";

export default function Edit(props) {
    
    const [problems, setProblems] = useState({
        order : [],
        question : [],
        question_type : [],
    })
    // Axios.get("http://localhost:3305/api/diary/questions").then((response) => {
    //     for(var i in response.data){
    //         problems.order[i] = 
    //     }
    // })
    function renderingProblems(pbArray) {
        var returnee="<>";
        for (var i = 0; i < pbArray.order.length; i++) {
            returnee+="<li>";
            returnee+="<input type=\"text\" defaultValue=\""+pbArray.question[i]+"\"/>"
            returnee+="<select name=\"type\" id=\"type"+i+"\" selected=\""+pbArray.question_type[i]+"\">"
            returnee+="<option value=\"boolean\">boolean</option>";
            returnee+="<option value=\"number\>number</option>";
            returnee+="<option value=\"text\>text</option>";
            returnee+="<option value=\"multiple choice\">multiple choice</option>";
            returnee+="<button></button>"
            if (pbArray.question_type[i] == "multiple choice") {
                returnee+="<input type=\"checkbox\" id=\"pb"+i+"choice"+"1"+"\" value=\"0\">";
                returnee+="<input type=\"checkbox\" id=\"pb"+i+"choice"+"2"+"\" value=\"0\">";
                returnee+="<input type=\"checkbox\" id=\"pb"+i+"choice"+"3"+"\" value=\"0\">";
            }
            returnee+="</li>";
        }
        returnee+="</>"

        return(returnee);
    }
    
    //renderingProblems({order: [0], question:["hello"], question_type:["number"]})

    return(
        <div>
            <Topnav />
            <inner>
                <nav>
                    <ul>
                    </ul>
                </nav>
            </inner>
        </div>
    );
}