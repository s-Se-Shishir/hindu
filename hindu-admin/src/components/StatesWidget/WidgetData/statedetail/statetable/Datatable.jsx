import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import DownloadOutlinedIcon from '@mui/icons-material/DownloadOutlined';
// import UpdateModal from '../UpdateModal/UpdateModal';
import { userColumns, userRows } from '../../../../../statetablesource';
import './datatable.scss';

// Convert data to CSV format
const convertToCSV = (data) => {
  const header = Object.keys(data[0]).join(',');
  const rows = data.map(item => Object.values(item).join(','));
  return [header, ...rows].join('\n');
};

// Trigger file download
const downloadCSV = (data) => {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'user_data.csv';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const Datatable = () => {
  const [data, setData] = useState(userRows);
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailDetails, setEmailDetails] = useState({ to: '', subject: '' });

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleStatusChange = (id, newStatus) => {
    setData(data.map((item) =>
      item.id === id ? { ...item, status: newStatus } : item
    ));
  };

  const handleUpdate = (updatedUser) => {
    setData(data.map((item) =>
      item.id === updatedUser.id ? updatedUser : item
    ));
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredData = userRows.filter((item) =>
      Object.values(item).some((value) =>
        value.toString().toLowerCase().includes(term)
      )
    );
    setData(filteredData);
  };

  const openModal = (user) => {
    setCurrentUser(user);
    setIsModalOpen(true);
  };

  const openEmailModal = () => {
    setIsEmailModalOpen(true);
    const selectedEmails = selectedUsers.map(user => user.email).join(', ');
    setEmailDetails({ ...emailDetails, to: selectedEmails });
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    setEmailDetails({ ...emailDetails, [name]: value });
  };

  const sendEmail = (e) => {
    e.preventDefault();
    // Implement the email sending functionality here
    console.log('Email sent to:', emailDetails.to);
    console.log('Subject:', emailDetails.subject);
    setIsEmailModalOpen(false);
  };

  // const actionColumn = [
  //   {
  //     field: 'action',
  //     headerName: 'Action',
  //     width: 300,
  //     renderCell: (params) => (
  //       <div className="cellAction">
  //         <Link to={`/users/${params.row.id}`} style={{ textDecoration: 'none' }}>
  //           <div className="viewButton">View</div>
  //         </Link>
  //         <div className="deleteButton" onClick={() => handleDelete(params.row.id)}>
  //           Delete
  //         </div>
  //         <div className="updateButton" onClick={() => openModal(params.row)}>
  //           Update
  //         </div>
  //       </div>
  //     ),
  //   },
  // ];

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {/* Email Button */}
        <button 
          onClick={openEmailModal} 
          className="emailButton"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#d14836',
            color: 'white',
            border: 'none',
            padding: '10px  20px 10px 20px',
            marginLeft: '0px',
            borderRadius: '5px',
            cursor: 'pointer',
            marginRight: '10px'
          }}
        >
          Send Email
        </button>

        {/* Download Button */}
        <button 
          onClick={() => downloadCSV(data)} 
          className="downloadButton"
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            padding: '10px 20px',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          <DownloadOutlinedIcon 
            style={{
              marginRight: '8px',
              fontSize: '20px'
            }}
          />
          Download CSV
        </button>

        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearch}
          />
          <SearchOutlinedIcon />
        </div>
      </div>
      <DataGrid
        className="datagrid"
        rows={data}
        columns={userColumns(handleStatusChange)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        onSelectionModelChange={(newSelection) => {
          const selectedIDs = new Set(newSelection);
          const selectedUsersList = data.filter((row) => selectedIDs.has(row.id));
          setSelectedUsers(selectedUsersList);
        }}
      />
  
      {isEmailModalOpen && (
        <div className="emailModal" style={{ width: '40%', height: '40%' }}>
  <div 
    className="emailModalContent" 
    style={{ 
      padding: '2%', 
      position: 'relative',
      backgroundColor: 'white',
    }}
  >
    <button 
      type="button" 
      onClick={() => setIsEmailModalOpen(false)}
      style={{
        position: 'absolute',
        top: '10px',
        right: '10px',
        background: 'none',
        border: 'none',
        fontSize: '24px',
        cursor: 'pointer',
        color: '#333'
      }}
    >
      &times;
    </button>
    <h2>Compose Email</h2>
    <form onSubmit={sendEmail}>
      <div className="formGroup">
        <label>To:</label>
        <input 
          type="text" 
          name="to" 
          value={emailDetails.to} 
          onChange={handleEmailChange}
          readOnly
          style={{ width: '100%', padding: '8px', border: '1px solid #ccc', borderRadius: '4px' }}
        />
      </div>
      <div className="formGroup">
        <textarea 
          id="subject" 
          name="subject" 
          value={emailDetails.subject} 
          onChange={handleEmailChange} 
          rows="4" 
          cols="50" 
          placeholder="Enter the subject here..."
          style={{
            width: '100%',
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            boxSizing: 'border-box'
          }}
        />
      </div>
      <button 
        type="submit" 
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}
      >
        Send
      </button>
    </form>
  </div>
</div>

      )}
    </div>
  );
};

export default Datatable;
