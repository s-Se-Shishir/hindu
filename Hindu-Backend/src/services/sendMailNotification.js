// emailMiddleware.js

const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

const {transporter} = require('../utility/helper');
const nodemailer = require("nodemailer");

// // Function to send an email with attachments
// async function sendEmailWithAttachments(to, cc, subject, body, attachments) {
//     // Configure email options
//     const mailOptions = {
//         from: 'weldarcbackup@gmail.com',
//         to: to,
//         cc: cc,
//         subject: subject,
//         html: body,
//         attachments: attachments.map(filePath => ({
//             filename: path.basename(filePath),
//             path: filePath,
//         })),
//     };

//     try {
//         // Send email
//         const info = await transporter.sendMail(mailOptions);
//         console.log('Email sent: ' + info.response);
//         return true;
//     } catch (error) {
//         console.error('Error sending email:', error);
//         return false;
//     }
// }


// Function to send registration success email
async function sendNoticeEmail(email, templateData, templateFilePath) {
    // console.log('Transpoter:', transporter); // Debug line
    // Get and compile the template
    const compileTemplate = getCompileTemplate(templateFilePath);
    if (!compileTemplate) {
        console.error('Error getting or compiling the HTML template');
        return false;
    }
    // const transporter = nodemailer.createTransport({
    //     service: 'gmail',
    //     auth: {
    //         user: process.env.Gmail_user,
    //         pass: process.env.Gmail_pass,
    //     },
    // });
    


    // Configure email options
    const mailOptions = {
        from: 'weldarcbackup@gmail.com',
        to: email,
        subject: templateData.subject,
        html: compileTemplate(templateData),
    };

    try {
        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
        return true;
    } catch (error) {
        console.error('Error sending email:', error);
        return false;
    }
}

// Function to get and compile HTML template
function getCompileTemplate(filePath) {
    const mailFilePath = path.join(__dirname, filePath);

    try {
        const template = fs.readFileSync(mailFilePath, 'utf8');
        return ejs.compile(template);
    } catch (error) {
        console.error('Error reading or compiling the HTML template:', error);
        return null;
    }
}



module.exports = {sendNoticeEmail}
