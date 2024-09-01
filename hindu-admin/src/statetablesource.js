// userColumns.js
import React from 'react';

export const userColumns = (handleStatusChange) => [
  { field: "id", headerName: "ID", width: 70 },
  {
    field: "user",
    headerName: "User",
    width: 230,
    renderCell: (params) => (
      <div className="cellWithImg">
        <img className="cellImg" src={params.row.img} alt="avatar" />
        {params.row.username}
      </div>
    ),
  },
  {
    field: "businessName",
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
  // {
  //   field: "state",
  //   headerName: "State",
  //   width: 230,
  // },
  {
    field: "category",
    headerName: "Category",
    width: 100,
  },
  // {
  //   field: "status",
  //   headerName: "Status",
  //   width: 300,
  //   renderCell: (params) => (
  //     <div className="statusButtons">
  //       <button
  //         className={`statusButton ${params.row.status === 'active' ? 'active' : ''}`}
  //         onClick={() => handleStatusChange(params.row.id, 'active')}
  //         disabled={params.row.status === 'active'}
  //       >
  //         Active
  //       </button>
  //       <button
  //         className={`statusButton ${params.row.status === 'inactive' ? 'inactive' : ''}`}
  //         onClick={() => handleStatusChange(params.row.id, 'inactive')}
  //         disabled={params.row.status === 'inactive'}
  //       >
  //         Inactive
  //       </button>
  //     </div>
  //   ),
  // },
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
    }


];
