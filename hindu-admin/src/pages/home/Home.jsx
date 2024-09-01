import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
// import Widget from "../../components/widget/Widget";
import Widget from "../../components/widget/Widgett"
// import Featured from "../../components/featured/Featured";
import Chart from "../../components/chart/Chart";
import Table from "../../components/table/Table";
import TotalListing from "../../components/totalListing/TotalListing";
import InActive from "../../components/InActive/InActive";
import InActiveChart from "../../components/InActiveChart/InActiveChart";
import mapImage from "../../assets/images/map.jpg";
import { useState, useEffect } from 'react';
import axios from 'axios';

const Home = () => {
  const [count, setCount] = useState({
    active: 0,
    inActive: 0,
    total: 0,
  });

  const [percent, setPercent] = useState({
    active: 0,
    inActive: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const activeRes = await axios.get("http://localhost:4000/public/admin/companies?status=Active");
        const inActiveRes = await axios.get("http://localhost:4000/public/admin/companies?status=Inactive");

        const activeCount = activeRes.data.count;
        const inActiveCount = inActiveRes.data.count;
        const totalCount = activeCount + inActiveCount;

        setCount({
          active: activeCount,
          inActive: inActiveCount,
          total: totalCount,
        });

        setPercent({
          active: Math.round((activeCount / totalCount) * 100) || 0,
          inActive: Math.round((inActiveCount / totalCount) * 100) || 0,
        });
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" percent={percent.active} count={count.active}  />
          <Widget type="order" percent={percent.inActive} count={count.inActive} />
          <Widget type="earning" />
          <Widget type="balance" />
        </div>
        <div className="charts">
          <TotalListing percent={percent.active} count={count.active} />
          <Chart title="Provide the active user data for the past six months" aspect={2 / 1} />
        </div>
        <div className="charts">
          <InActive percent={percent.inActive} count={count.inActive} />
          <InActiveChart title="Provide the active user data for the past six months" aspect={2 / 1} />
        </div>
        <div className="listContainer">
          {/* <div className="listTitle">Total Datas</div> */}
          {/* <Table /> */}
          <img src={mapImage} alt="" style={{ width: "1200px", height: "200px" }} />
        </div>
      </div>
    </div>
  );
};

export default Home;
