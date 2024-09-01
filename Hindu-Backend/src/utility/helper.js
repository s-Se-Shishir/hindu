const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();
const multer = require('multer');
const path = require('path');
const fs = require('fs');


transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.Gmail_user2,
    pass: process.env.Gmail_pass2,
  },
});
// console.log('Transporter created:', transporter); // Debug line


const formatDateTime = () => {
  const date = new Date();

  // Options for formatting date and time
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, // Enable 12-hour time format
  };

  // Format date and time
  return date.toLocaleString('en-US', options);
};

// Helper function to calculate date ranges
const calculateDateRange = (days) => {
  const currentDate = new Date();
  const pastDate = new Date(currentDate);
  pastDate.setDate(currentDate.getDate() - days);
  return pastDate;
};



// Define storage for uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const uploadDir = path.join(__dirname, '../../uploads/');

      // Check if the directory exists, if not create it
      if (!fs.existsSync(uploadDir)) {
          fs.mkdirSync(uploadDir, { recursive: true });
      }
        cb(null, 'uploads/'); // Folder where files will be saved
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname)); // Rename the file
        cb(null, file.originalname);
    }
});

// Initialize multer with storage configuration
const upload = multer({ storage: storage });


module.exports = { transporter, formatDateTime, calculateDateRange, upload };


