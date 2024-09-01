// userColumns.js
import React from 'react';

export const userColumns = (handleStatusChange) => [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 200,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img className="cellImg" src={params.row.img} alt="avatar" />
        {params.row.firstName} &nbsp;
        {params.row.lastName}
      </div>
    ),
  },
  {
    field: "compName",
    headerName: "Business Name",
    width: 200,
  },
  
  {
    field: "email",
    headerName: "Email",
    width: 230,
  },
  
  {
    field: "address",
    headerName: "Address",
    width: 230,
  },
  {
    field: "state",
    headerName: "State",
    width: 100,
  },
  {
    field: "category",
    headerName: "Category",
    width: 130,
  },
 
  {
    field: "status",
    headerName: "Status",
    width: 200,
    renderCell: (params) => (
      <div className="statusButtons">
        <button
          className={`statusButton ${params.row.status === 'active' ? 'active' : ''}`}
          onClick={() => handleStatusChange(params.row.id, 'active')}
          disabled={params.row.status === 'active'}
        >
          Active
        </button>
        &nbsp;
        <button
          className={`statusButton ${params.row.status === 'inactive' ? 'inactive' : ''}`}
          onClick={() => handleStatusChange(params.row.id, 'inactive')}
          disabled={params.row.status === 'inactive'}
        >
          Inactive
        </button>
      </div>
    ),
  },
];



// temporary data
export const userRows = [
    {
      id: 1,
      username: "Shishir",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "gautamshiv170@gmail.com",
      address: "Sarai, Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Tech Solutions",
      status: "active",
    },
    {
      id: 2,
      username: "Vipin",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "vipin@example.com",
      address: "Sarai, Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Tech Solutions",
      status: "active",
    },
    {
      id: 3,
      username: "Amit",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "amit@example.com",
      address: "Sector 15, Faridabad",
      state: "Haryana",
      category: "Developer",
      businessName: "Code Innovators",
      status: "inactive",
    },
    {
      id: 4,
      username: "Rohit",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "rohit@example.com",
      address: "NIT, Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Build It Solutions",
      status: "active",
    },
    {
      id: 5,
      username: "Neha",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "neha@example.com",
      address: "Greenfield Colony, Faridabad",
      state: "Haryana",
      category: "Designer",
      businessName: "Creative Minds",
      status: "active",
    },
    {
      id: 6,
      username: "Ankit",
      img: "https://images.pexels.com/photos/1820770/pexels-photo-1820770.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500",
      email: "ankit@example.com",
      address: "Old Faridabad",
      state: "Haryana",
      category: "Engineer",
      businessName: "Innovative Solutions",
      status: "inactive",
    },

];
