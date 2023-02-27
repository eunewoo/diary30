import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useRef, useState } from "react";
import { DisplayImageAtom } from "../model/states";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function Topnav({ selected }) {
  const [displayImage, setDisplayImage] = useRecoilState(DisplayImageAtom);
  const [startDate, setStartDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (e) => {
    setIsOpen(!isOpen);
    setStartDate(e);
  };
  const handleClick = (e) => {
    e.preventDefault();
    setIsOpen(!isOpen);
    console.log("startDate", startDate);
  };
  const imageKeyRef = useRef("imageKeyRef");

  function format(date, formatStr) {
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return formatStr
      .replace("dd", day)
      .replace("MM", month)
      .replace("yyyy", year);
  }

  return (
    <div>
      <div id="navWrapper">
        <p id="navTitle">Diary 30</p>
        <div id="linksWrapper">
          <Link to="/log" id={selected === "log" ? "selected" : ""}>
            Log Day
          </Link>
          <Link to="/edit" id={selected === "edit" ? "selected" : ""}>
            Edit Questions
          </Link>
          <Link to="/view" id={selected === "view" ? "selected" : ""}>
            View Data
          </Link>
        </div>
        <>
          <button className="example-custom-input" onClick={handleClick}>
            {format(startDate, "yyyy-MM-dd")}
          </button>
          {isOpen && (
            <DatePicker selected={startDate} onChange={handleChange} inline />
          )}
        </>
        <Link id="navProfile" to="/profile">
          <img src={displayImage} alt="profile" />
        </Link>
      </div>
    </div>
  );
}
