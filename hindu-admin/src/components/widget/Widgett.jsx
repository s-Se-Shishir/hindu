// Widget.jsx
import "./widget.scss";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import PersonOffIcon from "@mui/icons-material/PersonOff";

// Define the widget data mapping
const widgetDataMap = {
  user: {
    title: "Active",
    amount: "100",
    link: "See all Active Users",
    perc:"20",

    icon: (
      <PersonOutlinedIcon
        className="icon"
        style={{ color: "crimson", backgroundColor: "rgba(255, 0, 0, 0.2)" }}
      />
    ),
  },
  order: {
    title: "Inactive",
    amount: "100",
    link: "View all Inactive Users",
    perc:"20",

    icon: (
      <PersonOffIcon
        className="icon"
        style={{
          backgroundColor: "rgba(218, 165, 32, 0.2)",
          color: "gray",
          opacity: 0.5,
          cursor: "not-allowed",
        }}
      />
    ),
  },
  earning: {
    title: "States",
    amount: "100",
    link: "View all states",
    perc:"20",

    icon: (
      <MapOutlinedIcon
        className="icon"
        style={{ backgroundColor: "rgba(0, 128, 0, 0.2)", color: "green" }}
      />
    ),
  },
  balance: {
    title: "Categories",
    amount: "100",
    link: "View all categories",
    perc:"20",
    icon: (
      <CategoryOutlinedIcon
        className="icon"
        style={{ backgroundColor: "rgba(128, 0, 128, 0.2)", color: "purple" }}
      />
    ),
  },
};

const Widget = ({percent="",count="", type="" }) => {
  const data = widgetDataMap[type];

  if (!data) {
    return <div>Invalid widget type</div>;
  }

  return (
    <div className="widget">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">{type==="earning" ? "8" :type==="balance"? "22" :count}</span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right">
        <div className="percentage positive">
          <KeyboardArrowUpIcon />
          {/* Assuming you want to show a fixed percentage */}
         {percent && percent+ " %"}
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;
