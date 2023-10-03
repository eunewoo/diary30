import Topnav from "./nav.js";
import Axios from "axios";
import { useState, useEffect } from "react";
import React, { Link, useNavigate } from "react-router-dom";
import Cum_date_load from "../model/Cum_date_load.js";
import { useRecoilState } from "recoil";
import {
  cumDateState,
  isAuthenticated,
  questionsSelector,
  returneeState,
} from "../model/states.js";

//log page
export default function Log(props) {
  const [returnee, setReturnee] = useRecoilState(returneeState);
  const [questions, setQuestions] = useRecoilState(questionsSelector);
  const [cumDate, setCumDate] = useRecoilState(cumDateState);
  const navigate = useNavigate();
  const [effectCount, setEffectCount] = useState(0);
  const [effectCount2, setEffectCount2] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Return multiple boolean of specific date
  function returnMultiple(x, y, z) {
    if (z === undefined) {
      z = cumDate;
    }
    for (var i = 0; i < x.question_answers.length; i++) {
      if (
        x.question_answers[i].date ==
        "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day
      ) {
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
      if (
        x.question_answers[i].date ===
        "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day
      ) {
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
      if (
        x.question_answers[i].date ==
        "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day
      ) {
        return x.question_answers[i].answer;
      }
    }
  }

  //change question data into visual form
  function returnInput(x) {
    if (x.question_type === "multiple choice") {
      return (
        <>
          <input
            type="radio"
            name={x.question}
            value={x.question_selection[0]}
            defaultChecked={returnMultiple(x, 0)}
          ></input>
          <label>{x.question_selection[0]}</label>
          <input
            type="radio"
            name={x.question}
            value={x.question_selection[1]}
            defaultChecked={returnMultiple(x, 1)}
          ></input>
          <label>{x.question_selection[1]}</label>
          <input
            type="radio"
            name={x.question}
            value={x.question_selection[2]}
            defaultChecked={returnMultiple(x, 2)}
          ></input>
          <label>{x.question_selection[2]}</label>
        </>
      );
    } else if (x.question_type === "boolean") {
      return (
        <>
          <input
            type="radio"
            name={x.question}
            value={true}
            defaultChecked={returnBoolean(x, 0)}
          ></input>
          <label>True</label>
          <input
            type="radio"
            name={x.question}
            value={false}
            defaultChecked={returnBoolean(x, 1)}
          ></input>
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

  // Bring data of all questions using loop
  function mapData() {
    return questions?.map((question) => (
      <div key={question.id}>
        <p>{question.question}</p>
        {returnInput(question)}
      </div>
    ));
  }

  // Disable submit button when net request/response is on process
  async function waitForSubmit() {
    try {
      setIsLoading(true);
      await submit();
    } finally {
      setIsLoading(false);
    }
  }
  // Put answers in temp and send to db
  async function submit() {
    //shallow copied
    var temp = questions;

    var list = document.getElementById("list");
    for (var i = 0; i < list.childNodes.length; i++) {
      var temp1 = {
        date:
          "" +
          cumDate.cum_year +
          "-" +
          cumDate.cum_month +
          "-" +
          cumDate.cum_day,
        answer: "",
      };

      // Multiple type Q
      if (list.childNodes[i].childNodes.length === 7) {
        if (list.childNodes[i].childNodes[1].checked) {
          temp1.answer = list.childNodes[i].childNodes[1].value;
        } else if (list.childNodes[i].childNodes[3].checked) {
          temp1.answer = list.childNodes[i].childNodes[3].value;
        } else if (list.childNodes[i].childNodes[5].checked) {
          temp1.answer = list.childNodes[i].childNodes[5].value;
        }
        // Boolean type Q
      } else if (list.childNodes[i].childNodes.length === 5) {
        if (list.childNodes[i].childNodes[1].checked) {
          temp1.answer = true;
        } else if (list.childNodes[i].childNodes[3].checked) {
          temp1.answer = false;
        }
        // Text type Q
      } else if (list.childNodes[i].childNodes.length === 2) {
        temp1.answer = list.childNodes[i].childNodes[1].value;
      }

      // edit when user's question_answers submit
      for (var j = 0; j < temp[i].question_answers.length; j++) {
        if (
          temp[i].question_answers[j].date ===
          "" +
            cumDate.cum_year +
            "-" +
            cumDate.cum_month +
            "-" +
            cumDate.cum_day
        ) {
          //deep copy
          var newArray = [...temp];
          var date = newArray[i].question_answers[j].date;
          var answer = temp1.answer;
          var newAns = [...temp[i].question_answers];
          newAns.splice(j, 1, { date, answer });
          newArray[i] = { ...temp[i], question_answers: newAns };
          temp = newArray;
        }
        //if questions exist but question_answer not exist
        else if (j === temp[i].question_answers.length - 1) {
          var newArray = [...temp];
          var newAns = [...temp[i].question_answers];
          newAns.push(temp1);
          newArray[i] = { ...temp[i], question_answers: newAns };
          temp = newArray;
        }
      }
      //if user made questions for the first time and qeustion_answer not exist
      if (temp[i].question_answers.length == 0) {
        var newArray = [...temp];
        newArray[i] = { ...temp[i], question_answers: temp1 };
        temp = newArray;
      }
    }

    for (var i = 0; i < temp.length; i++) {
      await Axios.put(
        "http://127.0.0.1:5001/diary30wooserver/us-central1/app/api/questions",
        {
          user_id: props.profile.user_ref,
          question: temp[i].question,
          question_answers: temp[i].question_answers,
        }
      );
    }
    //rerender right after submit question_answer
    setEffectCount2((prevCount) => prevCount + 1);
    setEffectCount(0);
    alert("Your submission is correctly submitted on the db");
  }

  // useEffect0 - check whether logged in before rendering
  useEffect(() => {
    isAuthenticated(props, navigate);
  }, []);

  // useEffect1
  useEffect(() => {
    setQuestions((a) => []);
    setEffectCount((prevCount) => prevCount + 1);
  }, [effectCount2]);

  //useEffect 2
  //bring all question set from mongodb and put into questions array
  useEffect(() => {
    if (effectCount == 1) {
      Axios.get(
        "http://127.0.0.1:5001/diary30wooserver/us-central1/app/api/questions/" +
          props.profile.user_ref
      ).then((response) => {
        //first sort questions in their queestion_order
        const sortedData = response.data.sort(
          (a, b) => a.question_order - b.question_order
        );
        setQuestions(sortedData);
        setEffectCount((prevCount) => prevCount + 1);
      });
    }
  }, [effectCount]);

  //useEffect 3
  useEffect(() => {
    if (effectCount == 2) {
      setReturnee(mapData(0));
    }
  }, [effectCount]);

  return (
    <div id="pageWrapper">
      <Topnav selected="log" />
      <Cum_date_load />
      <div id="list">{returnee}</div>
      <button onClick={waitForSubmit} id="submit" disabled={isLoading}>
        Submit
      </button>
    </div>
  );
}
