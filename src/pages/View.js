import Topnav from "./nav";
import { useState, useEffect } from "react";
import Chart from "chart.js/auto";
import React, { Link, useNavigate } from "react-router-dom";
import Axios from "axios";
import Cum_date_load from "../model/Cum_date_load";
import {
  cumDateState,
  isAuthenticated,
  questionsState,
  returneeState,
} from "../model/states.js";
import { useRecoilState } from "recoil";

//view page
export default function View(props) {
  const [returnee, setReturnee] = useRecoilState(returneeState);
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [cumDate, setCumDate] = useRecoilState(cumDateState);
  const [viewState, setViewState] = useState("Questions");
  const [userdata, setUserdata] = useState({
    date: [],
    question: [],
    question_value: [],
  }); //if match id then get Axios.
  var datas = [];
  var charts = [];
  const { date, question, question_value } = userdata;
  const navigate = useNavigate();
  //download file into json file
  function download(content, fileName, contentType) {
    const a = document.createElement("a");
    const file = new Blob([content], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }

  //button to switch between questions and chart
  function toggleSwitch() {
    var chart = document.getElementById("chart");
    var questions = document.getElementById("table");
    if (chart.style.display === "block") {
      setViewState("Charts");
      chart.style.display = "none";
      questions.style.display = "block";
    } else {
      setViewState("Questions");
      chart.style.display = "block";
      questions.style.display = "none";
    }
  }

  function onDownload() {
    download(JSON.stringify(questions), "yourfile.json", "text/plain");
  }
  const { cum_year, cum_month, cum_day } = cumDate;

  //should be removed after login update
  function append(questions, question) {
    setQuestions((questions) => [...questions, question]);
  }

  function returnMultiple(x, y, z) {
    if (z === undefined) {
      z = cumDate;
    }
    for (var i = 0; i < x.question_answers.length; i++) {
      if (
        x.question_answers[i].date ==
        "" + z.cum_year + "-" + z.cum_month + "-" + z.cum_day
      ) {
        if (x.question_answers[i].answer === x.question_selection[y]) {
          return true;
        }
      }
    }
    return false;
  }

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

  function returnInput(x) {
    if (x.question_type === "multiple choice") {
      return (
        <>
          <input
            type="radio"
            name={x.question}
            value={x.question_selection[0]}
            disabled={true}
            defaultChecked={returnMultiple(x, 0)}
          ></input>
          <label>{x.question_selection[0]}</label>
          <input
            type="radio"
            name={x.question}
            value={x.question_selection[1]}
            disabled={true}
            defaultChecked={returnMultiple(x, 1)}
          ></input>
          <label>{x.question_selection[1]}</label>
          <input
            type="radio"
            name={x.question}
            value={x.question_selection[2]}
            disabled={true}
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
            disabled={true}
            defaultChecked={returnBoolean(x, 0)}
          ></input>
          <label>True</label>
          <input
            type="radio"
            name={x.question}
            value={false}
            disabled={true}
            defaultChecked={returnBoolean(x, 1)}
          ></input>
          <label>False</label>
        </>
      );
    } else if (x.question_type === "number") {
      return <input type="number" value={returnText(x)} disabled={true} />;
    } else {
      return (
        <>
          <input type="text" value={returnText(x)} disabled={true}></input>
        </>
      );
    }
  }

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
    return <></>;
  }

  //useEffect0 - check authentication before rendering
  useEffect(() => {
    isAuthenticated(props, navigate);
  }, []);

  useEffect(() => {
    //reset questions before get data
    setQuestions([]);
    Axios.get(
      "http://127.0.0.1:5001/diary30wooserver/us-central1/app/api/questions/" +
        props.profile.user_ref
    ).then((response) => {
      var z = 0;
      for (var i in response.data) {
        var temp = response.data[i].question_selection;
        var temp1 = response.data[i].question_answers;
        var temp2 = [];

        const sortedTemp1 = temp1.sort((a, b) => {
          return new Date(a.date) - new Date(b.date);
        });

        append(questions, {
          id: response.data[i].id,
          user_id: response.data[i].user_id,
          question: response.data[i].question,
          question_type: response.data[i].question_type,
          question_selection: temp,
          question_answers: temp1,
        });
        z++;
        if (response.data[i].question_type === "number") {
          for (var j = 0; j < temp1.length; j++) {
            temp2.push({ x: temp1[j].date, y: temp1[j].answer });
          }
          var canvas = document.createElement("canvas");
          canvas.id = "chart" + i;
          document.getElementById("chart").appendChild(canvas);
          var chart = new Chart("chart" + i, {
            type: "line",
            data: {
              datasets: [
                {
                  label: response.data[i].question,
                  data: temp2,
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: response.data[i].question,
                },
              },
            },
          });
          charts.push(chart);
        } else if (response.data[i].question_type == "multiple choice") {
          var x = [0, 0, 0];
          for (var j = 0; j < temp1.length; j++) {
            if (temp[0] == temp1[j].answer) {
              x[0]++;
            } else if (temp[1] == temp1[j].answer) {
              x[1]++;
            } else if (temp[2] == temp1[j].answer) {
              x[2]++;
            }
          }
          var canvas = document.createElement("canvas");
          canvas.id = "chart" + i;
          document.getElementById("chart").appendChild(canvas);
          var chart = new Chart("chart" + i, {
            type: "pie",
            data: {
              labels: [temp[0], temp[1], temp[2]],
              datasets: [
                {
                  data: x,
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: response.data[i].question,
                },
              },
            },
          });
          charts.push(chart);
        } else if (response.data[i].question_type === "boolean") {
          var x = [0, 0];
          for (var j = 0; j < temp1.length; j++) {
            if (temp1[j].answer === true) {
              x[0]++;
            } else if (temp1[j].answer === false) {
              x[1]++;
            }
          }
          var canvas = document.createElement("canvas");
          canvas.id = "chart" + i;
          document.getElementById("chart").appendChild(canvas);
          var chart = new Chart("chart" + i, {
            type: "pie",
            data: {
              labels: ["true", "false"],
              datasets: [
                {
                  data: x,
                },
              ],
            },
            options: {
              plugins: {
                title: {
                  display: true,
                  text: response.data[i].question,
                },
              },
            },
          });
          charts.push(chart);
        } else if (response.data[i].question_type === "text") {
          for (var j = 1; j < temp1.length; j++) {
            var oned = new Date(temp1[j - 1].date);
            var tned = new Date(temp1[j].date);
            if (oned.valueOf() > tned.valueOf()) {
              var tmp = temp1[j - 1];
              temp1[j - 1] = temp1[j];
              temp1[j] = tmp;
              j = 1;
            }
          }
          var canvas = document.createElement("div");
          canvas.id = "textWrapper";
          var title = document.createElement("div");
          title.id = "textTitle";
          title.appendChild(document.createTextNode(response.data[i].question));
          canvas.appendChild(title);
          for (var j = 0; j < temp1.length; j++) {
            var q = document.createElement("div");
            q.append(
              document.createTextNode(temp1[j].date + " - " + temp1[j].answer)
            );
            canvas.appendChild(q);
          }
          document.getElementById("chart").appendChild(canvas);
          charts.push([]);
        }
      }
      const sortedData = response.data.sort(
        (a, b) => a.question_order - b.question_order
      );
      setQuestions(sortedData);
      setReturnee(getData(0));
    });
  }, []);

  return (
    <div id="viewWrapper">
      <Topnav selected="view" />

      <button onClick={onDownload}>Download</button>
      <button onClick={toggleSwitch}>{viewState}</button>
      <div style={{ display: "block" }} id="chart"></div>
      <div
        style={{ display: "none", width: "200px", height: "200px" }}
        id="table"
      >
        <Cum_date_load />
        <div id="list">{returnee}</div>
      </div>
    </div>
  );
}
