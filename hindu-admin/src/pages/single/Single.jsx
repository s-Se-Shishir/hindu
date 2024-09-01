import { useLocation, useParams } from "react-router-dom";
import "./single.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import Chart from "../../components/chart/Chart";
import List from "../../components/table/Table";
import { userRows } from "../../datatablesource"; // Import your data source
import { useState } from "react";

const Single = () => {
  const { id } = useParams(); // Get the user ID from the URL
  // const user = userRows.find((user) => user.id === parseInt(id));
  const location=useLocation();
  const [user,setUser]=useState(location?.state)

  if (!user) return <div>User not found</div>; // Handle case where user is not found

  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton">Edit</div>
            <h1 className="title">Information</h1>
            <div className="item">
              <img
                src={user.img} // Use the correct user image property
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{user.username}</h1> {/* Use the correct user name property */}
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">{user.address}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">State:</span>
                  <span className="itemValue">{user.state}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Category:</span>
                  <span className="itemValue">{user.category}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Business Name:</span>
                  <span className="itemValue">{user.businessName}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Status:</span>
                  <span className="itemValue">{user.status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
        </div>
        {/* <div className="bottom"> */}
          {/* <h1 className="title">Last Transactions</h1>
          <List /> */}
        {/* </div> */}

        <div className="right">
            <Chart aspect={3 / 1} title="User Spending (Last 6 Months)" />
          </div>
      </div>
    </div>
  );
};

export default Single;
