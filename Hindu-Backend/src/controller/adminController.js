const Admin = require('../model/adminModel');     // admin model path
const Company = require('../model/companyModel'); // comp model path
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const otpGenerator = require('otp-generator');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv').config();
const { transporter } = require('../utility/helper');
const { calculateDateRange } = require('../utility/helper');
const AdminMsg = require('../model/adminMsgModel');
// const nodemailer = require('nodemailer');
const { formatDateTime } = require('../utility/helper');



// API of administrator 
exports.adminSignup = async (req, res) => {
  // Validation rules
  await body('fullName').isString().notEmpty().withMessage('Full name is required').run(req);
  await body('email').isEmail().withMessage('Invalid email').run(req);
  await body('adminPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);
  await body('contactNo').isNumeric().withMessage('Contact number must be numeric').run(req);


  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullName, email, adminPassword, contactNo } = req.body;
  console.log('req.body', req.body);

  try {
    const existingAdmin = await Admin.findOne({ email: req.body.email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);

    const admin = new Admin({
      fullName,
      email,
      adminPassword: hashedPassword,
      contactNo,
      status: "Active",
    });

    await admin.save();

    res.status(201).json({ message: 'Admin registered successfully', details: admin });
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.adminLogin = async (req, res) => {
  // Validation rules
  await body('email').isEmail().withMessage('Invalid email').run(req);
  await body('adminPassword').notEmpty().withMessage('Password is required').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, adminPassword } = req.body;
  console.log('req.body:', req.body);

  try {
    const admin = await Admin.findOne({ email });
    console.log('admin:', admin?._id?.toString());

    if (!admin) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(adminPassword, admin.adminPassword);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ adminId: admin?._id?.toString() }, process.env.seckret_Key, { expiresIn: '1h' });

    req.session.user = { id: admin._id, email: admin.email };
    console.log('Session set:', req.session.user);
    req.session.save(err => {
      if (err) {
        return res.status(500).json({ message: 'Failed to save session' });
      }
      // res.status(200).json({ adminId: admin?._id?.toString(), token, message: 'Logged in successfully' });
    });

    res.status(200).json({ adminId: admin?._id?.toString(), token, message: 'Logged in successfully', sessionData: req.session.user });
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};


exports.adminForgotPass = async (req, res) => {

  await body('email').isEmail().withMessage('Invalid email').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Email not found' });
    }

    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });
    const otpExpires = Date.now() + 3600000; // 1 hour
    console.log("otp details :", otp, otpExpires);
    admin.verifyOtp = otp;
    admin.expireOtp = otpExpires;
    // const tempPassword = Math.random().toString(36).slice(-8);
    // const hashedTempPassword = await bcrypt.hash(tempPassword, 10);
    // console.log('temp password',tempPassword);
    // admin.adminPassword = hashedTempPassword;
    const updateResult = await admin.save();
    // If update fails, return error
    if (!updateResult) {
      throw new Error('Failed to update OTP');
    }

    const mailOptions = {
      from: 'weldarcbackup@gmail.com',
      to: email,
      subject: 'Admin forgot password OTP mail',
      html: `The admin forgot password OTP :${otp} for mail-id :${email}`,
    };

    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);
      // return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
    res.status(200).json({ OTP: otp, message: `OTP generated check mail :${admin.email}` });
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

exports.adminChangePass = async (req, res) => {
  await body('email').isEmail().withMessage('Invalid email').run(req);
  await body('otp').notEmpty().withMessage('OTP is required').run(req);
  await body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters').run(req);

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, otp, newPassword } = req.body;

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Admin not found' });
    }

    // const isMatch = await bcrypt.compare(oldPassword, admin.adminPassword);
    // if (!isMatch) {
    //   return res.status(400).json({ message: 'Old password is incorrect' });
    // }
    // Verify OTP
    if (admin.verifyOtp !== otp || Date.now() > admin.expireOtp) {
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);
    admin.adminPassword = hashedNewPassword;
    await admin.save();

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (err) {
    console.error('error', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
};

// API of comany edit and delete in admin dashboard 

exports.deleteCompany = async (req, res) => {
  const { companyId } = req.params;

  try {
    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.status(200).json({ message: 'Company deleted successfully' });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


exports.updateCompany = async (req, res) => {
  const { _id } = req.body
  const updateData = req.body;
  console.log('Update Data:', updateData); // Log the request body

  try {
    const company = await Company.findByIdAndUpdate(_id, updateData, { new: true, runValidators: true });

    if (!company) {
      return res.status(404).json({success:false, message: 'Company not found' });
    }

    res.status(200).json({success:true, message: 'Company updated successfully', company });
  } catch (error) {
    console.error('error', error);
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.showLatestComp = async (req, res) => {
  try {
    const days = parseInt(req.query.days, 10) || 1; // Default to 1 day if no query parameter is provided
    const startDate = calculateDateRange(days);

    const newCompanies = await Company.find({ createdAt: { $gte: startDate } })
      .select('compName email category state createdAt');

    res.status(200).json({
      days,
      companies: newCompanies
    });
  } catch (err) {
    console.error('Error fetching new signups:', err);
    res.status(500).json({ message: 'Server error', error: err });
  }
}

// api to take msg for admin from home page 
exports.adminMsg = async (req, res) => {
  await body('name').isString().notEmpty().withMessage('User name is required').run(req);
  await body('comment').isString().notEmpty().withMessage('coment is required').run(req);
  await body('email').isEmail().withMessage('Invalid email').run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, email, phoneNo, comment } = req.body;
    console.log('req body', req.body);

    // Create a new AdminMsg instance
    const newMsg = new AdminMsg({
      name,
      email,
      phoneNo,
      comment,
      msgDate: formatDateTime()
    });

    // Save the message to the database
    await newMsg.save();

    // Set up the email options
    const mailOptions = {
      from: 'hindueconomicforum@gmail.com',
      to: 'weldarcbackup@gmail.com', // Admin email address
      subject: 'New Message Received check details .',
      text: `You have received a new message from ${name}.\n\nDetails:\nName: ${name}\nEmail: ${email}\nPhone No: ${phoneNo}\nComment: ${comment}\nDate: ${newMsg.msgDate}`
    };

    // Send the email to the admin
    try {
      // Send email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }

    // Send a response back to the frontend
    res.status(200).json({ message: 'Message submitted successfully and email sent to admin.' });

  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ error: 'An error occurred while submitting the message.' });
  }
}

exports.sendMailMsg = async (req, res) => {
  await body('email').isEmail().withMessage('Invalid email').run(req);
  await body('subject').isString().notEmpty().withMessage('subject is required').run(req);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { sendTo, message } = req.body;

    // Set up the email options
    const mailOptions = {
      from: 'hindueconomicforum@gmail.com',
      to: sendTo, // Admin email address
      subject: 'New Message Received check details .',
      text: message
    };


    try {
      // Send email to companies
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ' + info.response);

    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }

  } catch (error) {
    console.error('Error submitting message:', error);
    res.status(500).json({ error: 'An error occurred while submitting the message.' });
  }
}