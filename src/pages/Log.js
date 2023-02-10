import Topnav from "./nav.js";
import Axios from "axios";
import { useState, useEffect } from "react";
import React, { Link } from "react-router-dom";
import Cum_date_load from "../model/Cum_date_load.js";
import { useRecoilState } from "recoil";
import { cumDateState, questionsSelector, questionsState, returneeState } from "../model/states.js";

export default function Log(props) {
  const [returnee, setReturnee] = useRecoilState(returneeState);
  const [questions, setQuestions] = useRecoilState(questionsSelector);

  const [cumDate, setCumDate] = useRecoilState(cumDateState);
  
  let endpoint1 = 1;
  let endpoint2 = 0;

  //var endPoint = 0
  function append(questions, question) {
    setQuestions((questions) => [...questions, question]);
  }
  //return multiple boolean of specific date
  function returnMultiple(x, y, z) {
    if (z === undefined) {
      z = cumDate;
    }
    for (var i = 0; i < x.question_answers.length; i++) {
      console.log("x.question_answers[i].date", x.question_answers[i].date);
      console.log("" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day);
      console.log("x.question_answers[i].answer", x.question_answers[i].answer);
      console.log(x.question_selection[y][0]);

      if (x.question_answers[i].date == "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day) {
        if (x.question_answers[i].answer === x.question_selection[y][0]) {
          return true;
        }
      }
    }
    return false;
  }

  //return boolean of specific date
  function returnBoolean(x, y, z) {
    if (z === undefined) {
      z = cumDate;
    }
    for (var i = 0; i < x.question_answers.length; i++) {
      if (x.question_answers[i].date === "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day) {
        if (x.question_answers[i].answer === true && y == 0) {
          return true;
        } else if (x.question_answers[i].answer === false && y == 1) {
          return true;
        }
      }
    }
    return false;
  }

  //return text of specific date
  function returnText(x, z) {
    if (z === undefined) {
      z = cumDate;
    }
    for (var i = 0; i < x.question_answers.length; i++) {
      if (x.question_answers[i].date == "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day) {
        return x.question_answers[i].answer;
      }
    }
  }

  //change question data into visual form
  function returnInput(x) {
    if (x.question_type === "multiple choice") {
      return (
        <>
          <input type="radio" name={x.question} value={x.question_selection[0]} defaultChecked={returnMultiple(x, 0)}></input>
          <label>{x.question_selection[0]}</label>
          <input type="radio" name={x.question} value={x.question_selection[1]} defaultChecked={returnMultiple(x, 1)}></input>
          <label>{x.question_selection[1]}</label>
          <input type="radio" name={x.question} value={x.question_selection[2]} defaultChecked={returnMultiple(x, 2)}></input>
          <label>{x.question_selection[2]}</label>
        </>
      );
    } else if (x.question_type === "boolean") {
      return (
        <>
          <input type="radio" name={x.question} value={true} defaultChecked={returnBoolean(x, 0)}></input>
          <label>True</label>
          <input type="radio" name={x.question} value={false} defaultChecked={returnBoolean(x, 1)}></input>
          <label>False</label>
        </>
      );
    } else if (x.question_type === "number") {
      return <input type="number" defaultValue={returnText(x)} />;
    } else {
      return (
        <>
          <input type="text" defaultValue={returnText(x)}></input>
        </>
      );
    }
  }

  //bring data of all questions using loop
  function getData(x) {
    if (x < questions.length) {
      return (
        <>
          <div>
            <p>{questions[x].question}</p>
            {returnInput(questions[x])}
          </div>
          {getData(x + 1)}
        </>
      );
    }
    // else {
    //     endPoint = 1
    // }
    return <></>;
  }

  //1
  // useEffect(() => {
  //   setQuestions([]);
  //   console.log('questions in useEffect1', questions);
  //   endpoint1 = 1
  // }, []);

  //2
  //bring question set from mysql db and put into returnee
  useEffect(() => {

    if (endpoint1 == 1) {
      Axios.get("https://diary30wooserver.web.app/api/questions/" + props.profile.user_id).then((response) => {
          var z = 0;
          for (var i in response.data) {
              var temp = response.data[i].question_selection;
              var temp1 = response.data[i].question_answers;

              append(questions, {
              id: response.data[i].id,
              user_id: response.data[i].user_id,
              question: response.data[i].question,
              question_type: response.data[i].question_type,
              question_selection: temp,
              question_answers: temp1,
              });
              //ChangeReturnee(setSome(z),z);
              z++;
          }
          setReturnee(getData(0))
          console.log('questions in useEffect', questions);
      });
      setQuestions([]);
    }
  }, []);

  // //3
  // useEffect(() => {
  //   if (endpoint2 == 1) {
  //     console.log('useEffect3');
  //     setReturnee(getData(0))
  //   }
  // }, [endpoint2]);


  function changeQuestions(a) {
    setQuestions(a);
  }
  function ChangeReturnee(a) {
    setReturnee(a);
  }

  //put answers in temp and send to db
  async function submit() {

    //shallow copied
    var temp = questions;

    // let newQuestions = questions.question_answers;
    
    // let temp1 = {
    //   date: "" + cumDate.cum_year + "-" + cumDate.cum_month + "-" + cumDate.cum_day,
    //   answer: "",
    // };

    var list = document.getElementById("list");
    for (var i = 0; i < list.childNodes.length; i++) {

      let temp1 = {
        date: "" + cumDate.cum_year + "-" + cumDate.cum_month + "-" + cumDate.cum_day,
        answer: "",
      };

      //multiple
      if (list.childNodes[i].childNodes.length === 7) {
        if (list.childNodes[i].childNodes[1].checked) {
          temp1.answer = list.childNodes[i].childNodes[1].value;
        } else if (list.childNodes[i].childNodes[3].checked) {
          temp1.answer = list.childNodes[i].childNodes[3].value;
        } else if (list.childNodes[i].childNodes[5].checked) {
          temp1.answer = list.childNodes[i].childNodes[5].value;
        }
        //boolean
      } else if (list.childNodes[i].childNodes.length === 5) {
        if (list.childNodes[i].childNodes[1].checked) {
          temp1.answer = true;
        } else if (list.childNodes[i].childNodes[3].checked) {
          temp1.answer = false;
        }
        //text
      } else if (list.childNodes[i].childNodes.length === 2) {
        temp1.answer = list.childNodes[i].childNodes[1].value;
      }

      console.log('temp1', temp1);
      console.log('temp', temp);

      for (var j = 0; j < temp[i].question_answers.length; j++) {
        if (temp[i].question_answers[j].date === "" + cumDate.cum_year + "-" + cumDate.cum_month + "-" + cumDate.cum_day) {
          temp[i].question_answers[j].answer = temp1.answer;
        } else if (j === temp[i].question_answers.length - 1) {
          temp[i].question_answers.push(temp1);
        }
      }
      if (temp[i].question_answers.length == 0) {
        //temp[i].question_answers = Object.assign([], temp[i].question_answers);
        //let temp1 = {date: '2023-2-9', answer: true};
        
        // let newArray = [].concat(temp[i].question_answers, [temp1]);
        // temp[i].question_answers = newArray;
        
        //questions[i].question_answers = [...questions[i].question_answers, temp1]
        //setQuestions(prev => [...prev, temp1])

        // temp1 = {date: '2023-2-10', answer: '25'}
        // questions[i].question_answers.push(temp1);

        // setQuestions(prevQuestions => {
        //   const newQuestions = [...prevQuestions];
        //   newQuestions[i].question_answers = [...newQuestions[i].question_answers, temp1];
        //   return newQuestions;
        // })
        // newQuestions[i] = [...newQuestions[i], temp1];
        

        temp[i].question_answers.push(temp1);
      }
    }

    for (var i = 0; i < temp.length; i++) {
      await Axios.put("https://diary30wooserver.web.app/api/questions", {
        user_id: props.profile.user_id,
        question: temp[i].question,
        //question_answers: JSON.stringify(temp[i].question_answers)
        question_answers: temp[i].question_answers,
      });
    }
    alert("Your submission is correctly submitted on the db");
  }

  return (
    <div id="pageWrapper">
      <Topnav selected="log" />
      <Cum_date_load />
      <div id="list">{returnee}</div>
      <button onClick={submit} id="submit">
        Submit
      </button>
    </div>
  );
}
