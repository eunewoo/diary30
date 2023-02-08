import Topnav from "./nav";
import { useState, useEffect, timeout, delay } from "react";
import React, { Link } from "react-router-dom";
import Axios from "axios";
import { useNavigate } from "react-router";

export default function Edit(props) {
  const [questions, setQuestions] = useState([]);
  const [returnee, setreturnee] = useState([]);
  const navigate = useNavigate();
  const [orderTop, setorderTop] = useState(-1);

  let orderTop1 = - 1

  //organize question in temp from list and push into ret array
  function getData() {
    var list = document.getElementById("list");
    var ret = [];

    for (var i = 0; i < list.childNodes.length; i++) {
      var temp = {
        user_id: props.profile.user_id,
        question: "",
        question_selection: [],
        question_type: "",
        question_order: -99,
      };
      if (list.childNodes[i].childNodes[0].childNodes[0].value === "") {
        alert("question cannot be empty!");
      } else {
        //console.log('temp.question', list.childNodes[i].childNodes[0].childNodes[0].value);
        //console.log('temp.question_type', list.childNodes[i].childNodes[0].childNodes[1].value);

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
        temp.question_order = list.childNodes[i].childNodes[2].value
        console.log('temp question', temp.question);
        console.log('temp order', temp.question_order);
        ret.push(temp);
      }
    }
    return ret;
  }

  // //remove index element in arr
  // function remove(arr, index) {
  //     var a = arr.slice(0,index);
  //     var b = arr.slice(index, -1);
  //     var ret = [];
  //     for (var i = 0; i < a.length; i++) {
  //         ret.push(a[i])
  //     }
  //     for (var i = 0; i < b.length; i++) {
  //         ret.push(b[i])
  //     }
  //     console.log(ret);
  //     return ret;
  // }

  // //find duplicate among new questions
  // //validate same type of question and remove the duplicate question set
  // function validate() {
  //     var data = getData();

  //     for (var i = 0; i < data.length; i++) {
  //         for (var j = 0; j < data.length; j++) {
  //             if (i !== j) {
  //                 if (data[i].question === data[j].question &&
  //                     data[i].question_type === data[j].question_type &&
  //                     data[i].question_selection[0] === data[j].question_selection[0] &&
  //                     data[i].question_selection[1] === data[j].question_selection[1] &&
  //                     data[i].question_selection[2] === data[j].question_selection[2]) {
  //                         data = remove(data, j);
  //                         alert("Question cannot be duplicate. Duplicate answers are not submitted");
  //                         j = 0;
  //                     }
  //             }
  //         }
  //     }
  //     return data;
  // }

  //add async,await to run in order
  async function detectChange() {
    //filter duplicate questions
    var submit = getData();
    var tempAdd = [];
    var tempDel = [];
    //find duplicate with past questions
    //why check duplicate once again???
    for (var i = 0; i < submit.length; i++) {
        if (submit[i].question_order == "-1") {
            tempAdd.push(submit[i]);
        }
    }


    // for (var i = 0; i < submit.length; i++) {
    //   let duplicate = false;
    //   for (var j = 0; j < questions.length; j++) {
    //     // if (
    //     //   questions[j].question === submit[i].question &&
    //     //   questions[j].question_selection[0] ===
    //     //     submit[i].question_selection[0] &&
    //     //   questions[j].question_selection[1] ===
    //     //     submit[i].question_selection[1] &&
    //     //   questions[j].question_selection[2] ===
    //     //     submit[i].question_selection[2] &&
    //     //   questions[j].question_type === submit[i].question_type
    //     // ) {
    //     //   duplicate = true;
    //     //   break;
    //     // }
    //     //multiple choice duplicate check
    //     if (
    //       questions[j].question_type == "multiple choice" &&
    //       submit[i].question_type == "multiple choice"
    //     ) {
    //       if (
    //         questions[j].question == submit[i].question &&
    //         questions[j].question_selection[0] ==
    //           submit[i].question_selection[0] &&
    //         questions[j].question_selection[1] ==
    //           submit[i].question_selection[1] &&
    //         questions[j].question_selection[2] ==
    //           submit[i].question_selection[2]
    //       ) {
    //         //alert("Duplicated qeustions will not be added!");
    //         duplicate = true;
    //         break;
    //       }
    //     } else {
    //       if (
    //         questions[j].question_type == submit[i].question_type &&
    //         questions[j].question == submit[i].question
    //       ) {
    //         //alert("Duplicated qeustions will not be added!");
    //         duplicate = true;
    //         break;
    //       }
    //     }
    //   }
    //   if (duplicate === false) {
    //     tempAdd.push(submit[i]);
    //   }
    // }

    //add filtered new questions to db
    for (var i = 0; i < tempAdd.length; i++) {
      // console.log('post again', temp);
      // console.log('post again i', i);
      console.log("post temp", tempAdd[i].question);
      await Axios.post("http://localhost:3305/api/questions", {
        user_id: tempAdd[i].user_id,
        question: tempAdd[i].question,
        question_selection: tempAdd[i].question_selection,
        question_type: tempAdd[i].question_type,
        question_order: orderTop1 + 1,
      });
      orderTop1 = orderTop1 + 1;
      console.log('orderTop1', orderTop1);
      //console.log("post end", temp[i].question);

      // var delayInMilliseconds = 500;
      // setTimeout(function() {
      // }, delayInMilliseconds);
    }

    // //delete part
    // for (var i = 0; i < questions.length; i++) {
    //   var duplicate = false;
    //   for (var j = 0; j < submit.length; j++) {
    //     if (
    //       questions[i].question === submit[j].question &&
    //       questions[i].question_selection[0] ===
    //         submit[j].question_selection[0] &&
    //       questions[i].question_selection[1] ===
    //         submit[j].question_selection[1] &&
    //       questions[i].question_selection[2] ===
    //         submit[j].question_selection[2] &&
    //       questions[i].question_type === submit[j].question_type
    //     ) {
    //       duplicate = true;
    //       break;
    //     }
    //   }
    //   if (duplicate === false) {
    //     tempDel.push(questions[i]);
    //   }
    // }

    // for (var i = 0; i < tempDel.length; i++) {
    //   console.log("tempDel", tempDel);
    //   Axios.delete(
    //     "http://localhost:3305/api/questions/" +
    //       tempDel[i].user_id +
    //       "&" +
    //       tempDel[i].question_order
    //   )
    //     .then((response) => {
    //       //console.log("del ended");
    //     })
    //     .then(() => {
    //       console.log("del ended");
    //     });
    // }

    // Axios.get("http://localhost:3305/api/questions/" + props.profile.user_id)
    //   .then((response) => {
    //     console.log("detect change get response", response);
    //     var z = 0;
    //     for (var i in response.data) {
    //       //var temp = JSON.parse(response.data[i].question_selection);
    //       //var temp1 = JSON.parse(response.data[i].question_answers);
    //       var temp = response.data[i].question_selection;
    //       var temp1 = response.data[i].question_answers;

    //       append(questions, {
    //         id: response.data[i].id,
    //         user_id: response.data[i].user_id,
    //         question: response.data[i].question,
    //         question_type: response.data[i].question_type,
    //         question_selection: temp,
    //         question_answers: temp1,
    //         question_order: response.data[i].question_order,
    //       });
    //     }
    //     //alert("Your change has been changed")
    //   })
    //   .then(() => {
    //     alert("Your change has been changed");
    //   });
  }

  function changeQuestions(a) {
    setQuestions(a);
  }

  function changereturnee(a) {
    setQuestions(a);
  }

  function postChanges(original, submit) {
    detectChange();
  }

  function ChangeReturnee(a, z) {
    //
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
    console.log(e.target.value);
    if (e.target.value == "multiple choice") {
      console.log(e.target.parentElement.childNodes.length);
      if (e.target.parentElement.childNodes.length == 2) {
        var div = e.target.parentElement;
        console.log(div);
        div.appendChild(returnSelection());
        div.appendChild(returnSelection());
        div.appendChild(returnSelection());
        console.log(e.target.parentElement.childNodes);
      }
    } else if (e.target.parentElement.childNodes.length == 5) {
      var div = e.target.parentElement;
      console.log(div);
      for (var i = 2; i < 5; i++) {
        console.log(e.target.parentElement.childNodes[2]);
        e.target.parentElement.childNodes[2].remove();
      }
    }
  }

  function liDelete(e) {
    e.target.parentElement.parentElement.remove();
  }

  //adding question
  function setSome(iterator) {
    var temp = questions[iterator];
    //console.log('setSome', temp);
    if (questions[iterator].question_type == "multiple choice") {
      return (
        <>
          <li>
            <div>
              <input type="text" defaultValue={questions[iterator].question} />
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
              ></input>
              <input type="radio" disabled="TRUE" checked="TRUE"></input>
              <input
                type="text"
                defaultValue={temp.question_selection[1]}
              ></input>
              <input type="radio" disabled="TRUE" checked="TRUE"></input>
              <input
                type="text"
                defaultValue={temp.question_selection[2]}
              ></input>
            </div>
            <button id="deleteButton" onClick={liDelete}>
              <span class="material-symbols-outlined">delete</span>
            </button>
            <div value ={temp.question_order}></div>
          </li>
        </>
      );
    }
    else {
        return (
        <>
            <li>
            <div>
                <input type="text" defaultValue={questions[iterator].question} />
                <select
                name="options"
                onChange={addSelection}
                defaultValue={questions[iterator].question_type}
                >
                <option value="number">number</option>
                <option value="boolean">boolean</option>
                <option value="multiple choice">multiple choice</option>
                <option value="text">text</option>
                </select>
            </div>
            <button id="deleteButton" onClick={liDelete}>
                <span class="material-symbols-outlined">delete</span>
            </button>
            <div value ={temp.question_order}></div>
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

    var j =document.createElement("div");
    j.value = "-1";
    a.appendChild(j);

    return a;
  }

  function addDiv(e) {
    var list = document.getElementById("list");
    list.appendChild(newDiv());
  }

  //work only when page is first loaded
  useEffect(() => {
    const fetchData = async () => {
      await Axios.get(
        "http://localhost:3305/api/questions/" + props.profile.user_id
      ).then((response) => {
        var z = 0;
        const orderArray = [];
        for (var i in response.data) {
          var temp = response.data[i].question_selection;

          append(questions, {
            //id: response.data[i].id,
            user_id: response.data[i].user_id,
            question: response.data[i].question,
            question_type: response.data[i].question_type,
            question_selection: temp,
            question_order: response.data[i].question_order,
            //tag: "oldQ"
          });
          ChangeReturnee(setSome(z), z);
          z++;
          orderArray.push(response.data[i].question_order);
        }
        console.log('get orderArray', orderArray);
        orderTop1 = Math.max.apply(null, orderArray)
        console.log('max setorderTop', orderTop1);
      });
    };

    //reset 필요
    fetchData();
  }, []);

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
      <button onClick={postChanges} id="editSubmit">
        Save
      </button>
    </div>
  );
}