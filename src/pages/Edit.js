import Topnav from "./nav";
import { useState, useEffect } from "react";
import React, { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import { isAuthenticated } from "../model/states";

//edit page
export default function Edit(props) {
  const [questions, setQuestions] = useState([]);
  const [returnee, setreturnee] = useState([]);
  //set to provide new question's question_order higher than first loaded questions
  const [orderTop, setorderTop] = useState(-1);
  // This is set to detect deleted question box in front end side
  // and send request the server for real deletion in backend side
  const [orderArray, setorderArray] = useState([]);
  //set endpoint to controll useEffect sequence
  //when first load, reload page after clicking save button
  const [endPoint, setEndPoint] = useState(0);
  const [endPoint2, setEndPoint2] = useState(0);
  //TRUE when save button is clicked and False when done
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // get questions+answer to array and return to returnee function
  function getData() {
    //list that only contains question boxes that showing on Front page
    var list = document.getElementById("list");
    var ret = [];

    for (var i = 0; i < list.childNodes.length; i++) {
      var temp = {
        user_id: props.profile.user_id,
        question: "",
        question_selection: [],
        question_type: "",
        question_order: "-99",
      };
      if (list.childNodes[i].childNodes[0].childNodes[0].value === "") {
        alert("question cannot be empty!");
      } else {
        temp.question = list.childNodes[i].childNodes[0].childNodes[0].value;
        temp.question_type =
          list.childNodes[i].childNodes[0].childNodes[1].value;
        if (
          list.childNodes[i].childNodes[0].childNodes[1].value ===
          "multiple choice"
        ) {
          temp.question_selection.push([
            list.childNodes[i].childNodes[0].childNodes[3].value,
          ]);
          temp.question_selection.push([
            list.childNodes[i].childNodes[0].childNodes[5].value,
          ]);
          temp.question_selection.push([
            list.childNodes[i].childNodes[0].childNodes[7].value,
          ]);
        }
        temp.question_order = list.childNodes[i].childNodes[2].value;
        ret.push(temp);
      }
    }
    return ret;
  }

  //detect question that added new and post on server
  //add async,await to run in order
  async function DetectChange() {
    //filter duplicate questions
    var submit = getData();
    var tempAdd = [];

    for (var i = 0; i < submit.length; i++) {
      const containsWord =
        orderArray.includes(submit[i].question_order) ||
        orderArray.some((str) => {
          const words = str.split(" ");
          return words.includes(submit[i].question_order);
        });
      //New adding questions
      if (submit[i].question_order == "-1") {
        tempAdd.push(submit[i]);
      }
      //Delete from orderArray which still remain in showing front end page
      //Which means not being deleted by trash icon
      else if (containsWord) {
        const delIndex = orderArray.indexOf(submit[i].question_order);
        orderArray.splice(delIndex, 1);
      }
    }

    //Add new questions to DB
    //New quetions' order is set higher than highest existing questions' highest question_order
    let newOrderTop1 = orderTop + 1;
    for (var i = 0; i < tempAdd.length; i++) {
      await Axios.post("https://diary30wooserver.web.app/api/questions", {
        user_id: props.profile.user_ref,
        question: tempAdd[i].question,
        question_selection: tempAdd[i].question_selection,
        question_type: tempAdd[i].question_type,
        question_order: newOrderTop1,
      });

      newOrderTop1 += 1;
    }
    setorderTop(newOrderTop1);

    //Delete questions by question_order that remains in orderArray
    for (var i = 0; i < orderArray.length; i++) {
      await Axios.delete(
        "https://diary30wooserver.web.app/api/questions/" +
          props.profile.user_ref +
          "&" +
          orderArray[i]
      )
        .then((response) => {})
        .catch((error) => {});
    }
    alert("Qustions have saved, moving to log page");
  }

  // disable save button when net request/response is on work
  async function waitForSave() {
    try {
      setIsLoading(true);
      await DetectChange();
    } finally {
      setIsLoading(false);
      //navigate to log page to block errors
      navigate("/log");
      // setEndPoint2((prev) => 1);
    }
  }

  //put questions on front view
  function ChangeReturnee(a, z) {
    var temp = returnee;
    temp[z] = a;
    setreturnee([...temp]);
  }

  //should be removed after update logic on useEffect
  function append(questions, question) {
    var temp = questions;
    questions.push(question);
    setQuestions(temp);
  }

  function returnSelection() {
    var returnee = document.createDocumentFragment();
    var radio = document.createElement("input");
    radio.id = "multipleRadio";
    radio.type = "radio";
    radio.disabled = "TRUE";
    radio.checked = "TRUE";
    var text = document.createElement("input");
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
    if (e.target.value == "multiple choice") {
      if (e.target.parentElement.childNodes.length == 2) {
        var div = e.target.parentElement;
        div.appendChild(returnSelection());
        div.appendChild(returnSelection());
        div.appendChild(returnSelection());
      }
    } else if (e.target.parentElement.childNodes.length == 5) {
      var div = e.target.parentElement;
      for (var i = 2; i < 5; i++) {
        e.target.parentElement.childNodes[2].remove();
      }
    }
  }

  function liDelete(e) {
    e.target.parentElement.parentElement.remove();
  }

  //convert and showing questions in array questions to front page
  function setSome(iterator) {
    var temp = questions[iterator];

    if (questions[iterator].question_type == "multiple choice") {
      return (
        <>
          <li>
            <div>
              <input
                type="text"
                defaultValue={questions[iterator].question}
                disabled={true}
              />
              <select
                name="options"
                defaultValue={questions[iterator].question_type}
                onChange={addSelection}
              >
                <option value="number">number</option>
                <option value="boolean">boolean</option>
                <option value="multiple choice">multiple choice</option>
                <option value="text">text</option>
              </select>
              <input type="radio" disabled="TRUE" checked="TRUE"></input>
              <input
                type="text"
                defaultValue={temp.question_selection[0]}
                disabled={true}
              ></input>
              <input type="radio" disabled="TRUE" checked="TRUE"></input>
              <input
                type="text"
                defaultValue={temp.question_selection[1]}
                disabled={true}
              ></input>
              <input type="radio" disabled="TRUE" checked="TRUE"></input>
              <input
                type="text"
                defaultValue={temp.question_selection[2]}
                disabled={true}
              ></input>
            </div>
            <button id="deleteButton" onClick={liDelete}>
              <span class="material-symbols-outlined">delete</span>
            </button>
            <input type="hidden" value={questions[iterator].question_order} />
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <div>
              <input
                type="text"
                defaultValue={questions[iterator].question}
                disabled={true}
              />
              <select
                name="options"
                onChange={addSelection}
                defaultValue={questions[iterator].question_type}
              >
                <option value="number" disabled={true}>
                  number
                </option>
                <option value="boolean" disabled={true}>
                  boolean
                </option>
                <option value="multiple choice" disabled={true}>
                  multiple choice
                </option>
                <option value="text" disabled={true}>
                  text
                </option>
              </select>
            </div>
            <button id="deleteButton" onClick={liDelete}>
              <span class="material-symbols-outlined">delete</span>
            </button>
            <input type="hidden" value={questions[iterator].question_order} />
          </li>
        </>
      );
    }
  }

  //question form when add new one
  function newDiv() {
    var a = document.createElement("li");
    var b = document.createElement("div");
    var c = document.createElement("input");
    c.type = "text";
    var d = document.createElement("select");
    d.name = "options";
    d.oninput = addSelection;
    var e = document.createElement("option");
    e.value = "number";
    e.appendChild(document.createTextNode("number"));
    var f = document.createElement("option");
    f.value = "boolean";
    f.appendChild(document.createTextNode("boolean"));
    var g = document.createElement("option");
    g.value = "multiple choice";
    g.appendChild(document.createTextNode("multiple choice"));
    var h = document.createElement("option");
    h.value = "text";
    h.appendChild(document.createTextNode("text"));
    var i = document.createElement("button");
    i.id = "deleteButton";
    i.onclick = liDelete;
    var k = document.createElement("span");
    k.className = "material-symbols-outlined";
    k.appendChild(document.createTextNode("delete"));
    i.appendChild(k);

    d.appendChild(e);
    d.appendChild(f);
    d.appendChild(g);
    d.appendChild(h);

    b.appendChild(c);
    b.appendChild(d);

    a.appendChild(b);
    a.appendChild(i);

    var j = document.createElement("div");
    j.value = -1;
    a.appendChild(j);

    return a;
  }

  function addDiv(e) {
    var list = document.getElementById("list");
    list.appendChild(newDiv());
  }

  //useEffect0 - check authentication before rendering
  useEffect(() => {
    isAuthenticated(props, navigate);
  }, []);

  //This run after save button click > DetectChange() finsihed
  useEffect(() => {
    if (endPoint2 == 1) {
      setEndPoint((prev) => 0);
    }
  }, [endPoint2]);

  //work only when page is first loaded
  //Also work when page is reloaded after DetectChange() finished
  useEffect(() => {
    if (endPoint == 0) {
      setQuestions([]);
      setEndPoint((prev) => 1);
    }

    //2
    else if (endPoint == 1) {
      const tempOrderArray = [];
      const fetchData = async () => {
        await Axios.get(
          "https://diary30wooserver.web.app/api/questions/" +
            props.profile.user_ref
        ).then((response) => {
          var z = 0;
          const sortedData = response.data.sort(
            (a, b) => a.question_order - b.question_order
          );

          for (var i in sortedData) {
            var temp = sortedData[i].question_selection;
            append(questions, {
              user_id: sortedData[i].user_id,
              question: sortedData[i].question,
              question_type: sortedData[i].question_type,
              question_selection: temp,
              question_order: sortedData[i].question_order,
            });
            ChangeReturnee(setSome(z), z);
            z++;
            tempOrderArray.push(sortedData[i].question_order);
          }
          let newOrderTop = -99;

          // Set the highest question_order as newOrderTop
          // To set new question's question_order larger than that
          if (tempOrderArray.length == 0) {
            newOrderTop = -1;
          } else {
            newOrderTop = Math.max.apply(null, tempOrderArray);
          }
          setorderTop(newOrderTop);
          setorderArray([...tempOrderArray]);
        });
      };

      fetchData();
      //lock this useEffect function
      setEndPoint((prev) => 2);
    }
  }, [endPoint]);

  return (
    <div id="editWrapper">
      <Topnav selected="edit" />
      <inner id="editInner">
        <div id="editSubTitle">
          <p className="titleText">Edit Question</p>
          <button onClick={addDiv}>
            <span className="material-symbols-outlined bold">add_circle</span>
          </button>
        </div>
        <ul id="list">{returnee}</ul>
      </inner>
      <button onClick={waitForSave} id="editSubmit" disabled={isLoading}>
        Save
      </button>
    </div>
  );
}
