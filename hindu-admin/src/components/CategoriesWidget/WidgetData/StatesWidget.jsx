import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "./StatesWidget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

const StatesWidget = ({ data }) => {
  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.stateName}</span>
        <span className="counter">{data.number}</span>
        <Link to={`/states/${data.stateName}`} className="link">
          {data.linkText}
        </Link>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {data.percentage}%
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default StatesWidget;
