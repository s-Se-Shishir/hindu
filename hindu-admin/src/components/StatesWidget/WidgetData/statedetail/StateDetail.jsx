import React from "react";
import { useParams } from "react-router-dom";
import Sidebar from "../../../sidebar/Sidebar";
import Navbar from "../../../navbar/Navbar";
import "./StateDetail.scss";
import Datatable from "./statetable/Datatable";

const StateDetail = () => {
  const { stateName } = useParams();

  // Here you would fetch or access the state details based on stateName
  // For now, we will just display the stateName
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
        Details for {stateName}
        </div>

        <div className="listContainer">

{/* Table */}
<Datatable/> 

        </div>

        
      </div>
    </div>
  );
};

export default StateDetail;
