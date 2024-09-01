import "./featured.scss";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpOutlinedIcon from "@mui/icons-material/KeyboardArrowUpOutlined";

const InActive = ({percent,count}) => {
  return (
    <div className="featured">
      <div className="top">
        <h1 className="title">InActive</h1>
        <MoreVertIcon fontSize="small" />
      </div>
      <div className="bottom">
        <div className="featuredChart">
          <CircularProgressbar value={percent} text={percent+"%"} strokeWidth={5} />
        </div>
        <p className="title">Total InActive Users</p>
        <p className="amount">{count}</p>
        <p className="desc">
          Previous transactions processing. Last payments may not be included.
        </p>
        <div className="summary">
          
          <div className="item">
            <div className="itemTitle">Last Week InActive </div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">16k</div>
            </div>
          </div>
          <div className="item">
            <div className="itemTitle">Last Month InActive</div>
            <div className="itemResult positive">
              <KeyboardArrowUpOutlinedIcon fontSize="small"/>
              <div className="resultAmount">142k</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InActive;
