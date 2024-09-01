import React from "react";
import StatesWidget from "./WidgetData/StatesWidget";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import "./StatesData.scss"; // Import the new CSS file

const CategoriesData = () => {
  const widgetDataArray = [
    {
      stateName: "New South Wales",
      number: "5000",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 20,
    },
    {
      stateName: "Victoria",
      number: "3000",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 15,
    },
    {
      stateName: "Queensland",
      number: "4000",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 25,
    },
    {
      stateName: "Western Australia",
      number: "2500",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 10,
    },
    {
      stateName: "South Australia",
      number: "2000",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 12,
    },
    {
      stateName: "Tasmania",
      number: "1500",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 8,
    },
    {
      stateName: "Australian Capital Territory",
      number: "1200",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 5,
    },
    {
      stateName: "Northern Territory",
      number: "1000",
      linkText: "Read more",
      icon: <MapOutlinedIcon className="icon" />,
      percentage: 3,
    },
  ];

  return (
    <div className="widgetsContainer">
      {widgetDataArray.map((data, index) => (
        <StatesWidget key={index} data={data} />
      ))}
    </div>
  );
};

export default CategoriesData;
