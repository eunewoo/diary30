import React, { useState, useEffect } from "react";
import { questionsState, cumDateState } from "./states";
import { useRecoilState } from "recoil";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// component to control date(time), hand it over to log.js and view.js
export default function Cum_date_load(props) {
  const [questions, setQuestions] = useRecoilState(questionsState);
  const [cumDate, setCumDate] = useRecoilState(cumDateState);
  // date form for calendar module * different to the cumDate
  const [calendarDate, setCalendarDate] = useState(new Date());
  const { cum_year, cum_month, cum_day } = cumDate;

  // const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  //when date on calendar has clicked
  const handleChange = async (e) => {
    setIsOpen(!isOpen);
    setCalendarDate(e);
    var temp = await calenderDateToCumDate(e);
    loadList(temp);
  };
  // to check attendance(days have submitted answer)
  function checkAttend() {
    var attendedDates = [];
    if (questions != []) {
      for (var i in questions) {
        var tempAnswers = [...questions[i].question_answers];
        for (var i in tempAnswers) {
          var tempDate = [tempAnswers[i].date];
          if (tempDate[0] != undefined) {
            attendedDates.push(new Date(formatDate(...tempDate)));
          }
        }
      }
      return attendedDates;
    }
  }
  // turn "xxxx-xx-xx" to "xxxx","xx","xx" - form date that apropriate for calendar module
  function formatDate(dateString) {
    const dateArray = dateString.split("-");
    const numericDateArray = dateArray.map((dateString) =>
      parseInt(dateString)
    );
    return numericDateArray;
  }

  // convert date {} to cumData format and set cumDate
  async function calenderDateToCumDate(e) {
    var temp = {
      ...cumDate,
      cum_day: e.getDate(),
      cum_month: e.getMonth() + 1,
      cum_year: e.getFullYear(),
    };
    setCumDate(temp);
    return temp;
  }

  //when date on log page has clicked
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
  };

  // get and show question list of following day
  function loadList(temp) {
    var list = document.getElementById("list");

    //put input data into list
    for (var i = 0; i < list.childNodes.length; i++) {
      if (list.childNodes[i].childNodes.length === 7) {
        //if multiple choice
        list.childNodes[i].childNodes[1].checked = returnMultiple(
          questions[i],
          0,
          temp
        );
        list.childNodes[i].childNodes[3].checked = returnMultiple(
          questions[i],
          1,
          temp
        );
        list.childNodes[i].childNodes[5].checked = returnMultiple(
          questions[i],
          2,
          temp
        );
      }
      if (list.childNodes[i].childNodes.length === 5) {
        //if boolean choice
        list.childNodes[i].childNodes[1].checked = returnBoolean(
          questions[i],
          0,
          temp
        );
        list.childNodes[i].childNodes[3].checked = returnBoolean(
          questions[i],
          1,
          temp
        );
      }
      if (list.childNodes[i].childNodes.length === 2) {
        //if text choice
        if (returnText(questions[i], temp) === undefined) {
          list.childNodes[i].childNodes[1].value = "";
        } else {
          list.childNodes[i].childNodes[1].value = returnText(
            questions[i],
            temp
          );
        }
      }
    }
  }

  //going to previous day
  const clickPre = () => {
    var arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var temp = {};
    if (cumDate.cum_month == 1) {
      if (cumDate.cum_day == 1) {
        temp = {
          ...cumDate,
          cum_year: cum_year - 1,
          cum_month: 12,
          cum_day: 31,
        };
      } else {
        temp = {
          ...cumDate,
          cum_day: cum_day - 1,
        };
      }
    } else {
      if (cumDate.cum_day == 1) {
        temp = {
          ...cumDate,
          cum_month: cum_month - 1,
          cum_day: arr[cum_month - 2],
        };
      } else {
        temp = {
          ...cumDate,
          cum_day: cum_day - 1,
        };
      }
    }
    setCumDate(temp);
    // var list = document.getElementById("list");
    loadList(temp);
  };

  //going to next day
  const clickNext = () => {
    var arr = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    var temp = {};
    if (cumDate.cum_month == 12) {
      if (cumDate.cum_day == arr[cumDate.cum_month - 1]) {
        temp = {
          ...cumDate,
          cum_year: cum_year + 1,
          cum_month: 1,
          cum_day: 1,
        };
      } else {
        temp = {
          ...cumDate,
          cum_day: cum_day + 1,
        };
      }
    } else {
      if (cumDate.cum_day == arr[cumDate.cum_month - 1]) {
        temp = {
          ...cumDate,
          cum_month: cum_month + 1,
          cum_day: 1,
        };
      } else {
        temp = {
          ...cumDate,
          cum_day: cum_day + 1,
        };
      }
    }
    setCumDate(temp);
    loadList(temp);
  };

  //return multiple boolean of specific date
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

  return (
    <div id="logWrapper">
      <button onClick={clickPre}>
        <span className="material-icons md-18">arrow_back_ios</span>
      </button>
      <div>
        <button id="calenderButton" onClick={handleClick}>
          {cumDate.cum_year + "-" + cumDate.cum_month + "-" + cumDate.cum_day}
        </button>
        {isOpen && (
          <DatePicker
            selected={calendarDate}
            onChange={handleChange}
            inline
            highlightDates={checkAttend()}
          />
        )}
      </div>
      <button onClick={clickNext}>
        <span className="material-icons md-18">arrow_forward_ios</span>
      </button>
    </div>
  );
}
