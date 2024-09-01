import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";
import { useState,useEffect } from "react";
import axios from 'axios';

const TotalListing = ({percent,count}) => {

  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">Active</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percent} text={percent+"%"} strokeWidth={5} />
        </div>
        <p className="title">Total Active Users</p>
        <p className="amount">{count}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          
          <div className="item">
            <div className="itemTitle">Last Week Active </div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">14k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month Active</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">132k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TotalListing;
