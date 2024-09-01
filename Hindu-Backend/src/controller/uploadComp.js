const fs = require('fs');
const csv = require('csv-parser');
const bcrypt = require('bcrypt');
const {sendNoticeEmail} = require('../services/sendMailNotification'); // Assume you have a configured transporter
const Company = require('../model/companyModel'); 

exports.registerCompaniesFromCSV = async (req, res) => {
    const filePath = req.file.path; // Assuming file is uploaded using middleware like multer
    const companies = [];

    // Read CSV file and parse data
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
            try {
                // Extract data from CSV columns
                const { firstName, lastName, compName, email, contactNo, category, status, address, state, pincode, country, websiteURl, videoURL } = row;

                console.log('req body',req.body);
                // Check if the company already exists
                const existingCompany = await Company.findOne({ email });
                if (existingCompany) {
                    console.log(`Company with email ${email} already exists.`);
                    return;
                }

                // Generate a password
                const compPassword = Math.random().toString(36).slice(-8); // Generate a random 8-character password
                const hashedPassword = await bcrypt.hash(compPassword, 10);

                // Create the company in the database
                const newCompany = new Company({
                    firstName,
                    lastName,
                    compName,
                    email,
                    contactNo,
                    category,
                    status,
                    address,
                    state,
                    pincode,
                    country,
                    websiteURl,
                    videoURL,
                    compPassword: hashedPassword,
                    createdAt: new Date(),
                    modifyAt: new Date()
                });

                await newCompany.save();
                companies.push(newCompany);

                // Send registration email
                const emailTemplateData = {
                    subject: 'Registration Successful',
                    clientName: `${firstName} ${lastName}`,
                    clientEmail: email,
                    clientPassword: compPassword, // Send plain password in email
                };

                const templateFilePath = "../views/userInvitation.ejs"; // Assuming you have this EJS template
                const success = await sendNoticeEmail(email, emailTemplateData, templateFilePath);
                if (!success) {
                    throw new Error('Failed to send email');
                }
            } catch (err) {
                console.error(`Error processing company ${row.email}: `, err);
            }
        })
        .on('end', () => {
            res.status(200).json({ message: 'CSV file processed successfully', companies });
        })
        .on('error', (err) => {
            res.status(500).json({ message: 'Error reading CSV file', error: err });
        });
};

