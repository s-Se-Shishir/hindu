import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./States.scss";
import StatesWidget from "../../components/StatesWidget/StatesData";


const States = () => {
  return (
    <div  className="home" >
       <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="listContainer">
        States Listing Datas
        </div>
        <div className="widgets">
          <StatesWidget />
        </div>
      </div>
    </div>
  )
}

export default States
