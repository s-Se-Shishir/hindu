const Company = require('../model/companyModel'); // comp model path
const Review = require('../model/reviewModel');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const dotenv = require('dotenv').config();
const { formatDateTime } = require('../utility/helper');
const otpGenerator = require('otp-generator');
const { sendNoticeEmail } = require('../services/sendMailNotification');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const csv = require('csv-parser');
const { OAuth2Client } = require('google-auth-library');
// const upload = require('../services/cloudinaryMiddleware');

const client = new OAuth2Client(process.env.YOUR_GOOGLE_OAUTH_CLIENT_ID);


exports.compRegister = async (req, res, next) => {


    const { firstName, lastName, email, compName, contactNo, status, compPassword } = req.body;
    console.log('req body', req.body);

    try {
        const existingUser = await Company.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(compPassword, 15);

        const user = new Company({
            firstName,
            lastName,
            email,
            compName,
            contactNo: contactNo || undefined, // Only include if not null or undefined
            compPassword: hashedPassword,
            status: "Inactive",
            createdAt: formatDateTime(),
            modifyAt: formatDateTime(),
        });

        await user.save();
        console.log(" company registered sucessfully !");

        // Sending mail notification 
        const emailTemplateData = {
            subject: 'Registration Successful',
            clientName: `${firstName} ${lastName}`,
            clientEmail: email,
            clientPassword: compPassword,
        };

        const templateFilePath = "../views/userInvitation.ejs";
        const success = await sendNoticeEmail(email, emailTemplateData, templateFilePath);
        if (!success) {
            throw new Error('Failed to send email');
        }

        res.status(201).json({ message: 'User registered successfully', details: user });
    } catch (err) {
        console.error("error", err);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error', error: err });
        }
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.compListing = async (req, res) => {


    const { firstName, lastName, compName, email, compPassword, category, contactNo, address, state, pincode, country, place_Map_url } = req.body;
    console.log('req.body', req.body);


    try {
        const existingCompany = await Company.findOne({ email: req.body.email });
        if (!existingCompany) {
            return res.status(400).json({ message: 'Company and email does not exists please signup for listing.' });
        }

        // const hashedPassword = await bcrypt.hash(compPassword, 10);
        let hashedPassword = existingCompany.compPassword;
        if (compPassword) {
            hashedPassword = await bcrypt.hash(compPassword, 10);
        }

        // Update the existing company details
        existingCompany.firstName = firstName || existingCompany.firstName;
        existingCompany.lastName = lastName || existingCompany.lastName;
        existingCompany.compName = compName || existingCompany.compName;
        existingCompany.compPassword = hashedPassword; // Use the new password if provided
        existingCompany.category = category || existingCompany.category;
        existingCompany.contactNo = contactNo || existingCompany.contactNo;
        existingCompany.address = address || existingCompany.address;
        existingCompany.state = state || existingCompany.state;
        existingCompany.pincode = pincode || existingCompany.pincode;
        existingCompany.country = country || existingCompany.country;
        existingCompany.place_Map_url = place_Map_url || existingCompany.place_Map_url;
        existingCompany.modifyAt = formatDateTime(); // Update modifyAt timestamp


        // await company.save();
        await existingCompany.save();
        // Sending mail notification 
        const emailTemplateData = {                                       // data that is passed in template           
            subject: 'Company Details Updated Successfully',
            clientName: existingCompany.compName,
            clientEmail: existingCompany.email,
            clientPassword: compPassword || '(unchanged)', // Only display if password is updated
        };
        console.log('Mail data:', emailTemplateData);  // Logging email template data

        // Get and compile the template
        const templateFilePath = "../views/userInvitation.ejs";
        const success = await sendNoticeEmail(email, emailTemplateData, templateFilePath);
        if (!success) {
            throw new Error('Failed to send email');
        }

        res.status(201).json({ message: 'Company registered successfully', details: existingCompany });
    } catch (err) {
        console.error("error", err);
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Duplicate key error', error: err });
        }
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.compLogin = async (req, res) => {
    // Validation rules
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('compPassword').notEmpty().withMessage('Password is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, compPassword } = req.body;
    console.log('req.body for comp', req.body);

    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }
        // Check if status is Active
        // if (company.status !== 'Active') {
        //     return res.status(403).json({ success: false, message: 'Account is inactive. Admin will activate it.' });
        // }

        const isMatch = await bcrypt.compare(compPassword, company.compPassword);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }



        const token = jwt.sign({ companyId: company._id }, process.env.seckret_Key, { expiresIn: '1h' });
        // Save user session
        req.session.user = { id: company._id, email: company.email };
        console.log('Session set:', req.session.user);  // Add this line for debugging
        req.session.save(err => {
            if (err) {
                return res.status(500).json({ message: 'Failed to save session' });
            }
            res.status(200).json({ companyId: company, token, message: 'Logged in successfully', sessionsDat: req.session.user });
        });
    } catch (err) {
        console.error('error', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.compForgotPass = async (req, res) => {
    await body('email').isEmail().withMessage('Invalid email').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email } = req.body;
    console.log('email:', req.body);

    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: 'Email not found' });
        }
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false });


        // Generate OTP

        const otpExpires = Date.now() + 3600000; // 1 hour
        console.log("otp details :", otp, otpExpires);

        // Save OTP and expiration time in the database
        company.verifyOtp = otp;
        company.expireOtp = otpExpires;
        company.modifyAt = formatDateTime();
        const updateResult = await company.save();

        // If update fails, return error
        if (!updateResult) {
            throw new Error('Failed to update OTP');
        }
        const emailTemplateData = {
            subject: `Mail FORGOT PASSWORD for ${company.compName}`,
            email: email,
            clientName: company.compName,
            otp: otp,

        };

        const templateFilePath = "../views/forgotPassword.ejs";
        const success = await sendNoticeEmail(email, emailTemplateData, templateFilePath);

        // If email sending fails, return error
        if (!success) {
            throw new Error('Failed to send OTP email');
        }

        // In a real application, send the tempPassword via email instead
        res.status(200).json({ OTP: otp, message: 'OTP generated' });
    } catch (err) {
        console.error('error', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

exports.changePass = async (req, res) => {
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('otp').notEmpty().withMessage('OTP is required').run(req);
    await body('newPassword').isLength({ min: 6 }).withMessage('New password must be at least 6 characters').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, otp, newPassword } = req.body;

    try {
        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: 'Company not found' });
        }

        // Verify OTP
        if (company.verifyOtp !== otp || Date.now() > company.expireOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP' });
        }

        // Update the password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        company.compPassword = hashedNewPassword;

        // Update modification time
        company.modifyAt = formatDateTime();

        await company.save();

        res.status(200).json({ message: 'Password changed successfully' });
    } catch (err) {
        console.error('error', err);
        res.status(500).json({ message: 'Server error', error: err });
    }
};

// api to find all companies which comes in this search based on category and state

exports.getdetails = async (req, res) => {
    const { category, state } = req.body;
    console.log('req.body :', req.body);
    try {
        // Build the query object based on provided fields
        const query = {};
        if (category) {
            query.category = category;
        }
        if (state) {
            query.state = state;
        }

        const companies = await Company.find(query);
        if (companies.length === 0) {
            return res.status(400).json({ message: 'No companies found' });
        }

        res.status(200).json({ success: true, message: 'Companies found successfully', data: companies });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ msg: "Internal server error", err: error });
    }
}

exports.getActiveComp = async (req, res) => {
    const { category, state } = req.body;
    console.log('req.body :', req.body);
    try {
        // Build the query object based on provided fields
        const query = { status: 'Active' }; // Only include companies with 'Active' status
        if (category) {
            query.category = category;
        }
        if (state) {
            query.state = state;
        }

        const companies = await Company.find(query);
        if (companies.length === 0) {
            return res.status(400).json({ message: 'No companies found' });
        }

        res.status(200).json({ success: true, message: 'Companies found successfully', data: companies });
    } catch (error) {
        console.error('error', error);
        res.status(500).json({ msg: "Internal server error", err: error });
    }
}


exports.getOneCompany = async (req, res) => {
    // const {companyId,email} = req.body;
    // console.log('req body:',req.body);
    const { companyId, email } = req.query;
    console.log('req body:', req.query);

    // Validate input
    if (!companyId || !email) {
        return res.status(400).json({ error: 'companyId and email are required.' });
    }
    try {
        // Construct the query object based on the provided input
        const query = {};
        if (companyId) query._id = companyId;
        if (email) query.email = email;

        // const company = await Company.findOne({_id:companyId,email:email});
        const company = await Company.findOne(query);

        if (!company) {
            console.log('can not find comany in database')
        }

        res.status(200).json({ msg: "found company", details: company })
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg: "no company", err: error })
    }
}

exports.getAll = async (req, res) => {
    try {
        const companies = await Company.find({}); // Fetch all companies
        res.status(200).json({success:true,message:"Data fetched successfully",data:companies});
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({success:false, message: 'Server error', error });
    }
}

exports.getByStatus = async (req, res) => {
    const { status } = req.query;

    try {
        const filter = {};
        if (status) {
            filter.status = status;
        }

        const companies = await Company.find(filter).sort({ createdAt: -1 });

        // Count the number of companies with the specified status
        const count = await Company.countDocuments(filter);

        res.status(200).json({ count, companies }); 
    } catch (error) {
        console.error('Error fetching companies:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}

// update one comp details
exports.updateCompanyDetails = async (req, res) => {
    try {
        const { companyId, email } = req.query;
        const updateData = req.body;

        // Validate input: companyId or email is required
        if (!companyId && !email) {
            return res.status(400).json({ error: 'Either companyId or email is required.' });
        }

        // Ensure that there is data to update
        if (Object.keys(updateData).length === 0) {
            return res.status(400).json({ error: 'No data provided for update.' });
        }

        // Construct the query object based on the provided companyId or email
        const query = {};
        if (companyId) query._id = companyId;
        if (email) query.email = email;

        // Find and update the company
        const company = await Company.findOneAndUpdate(query, updateData, { new: true });

        if (!company) {
            return res.status(404).json({ error: 'Company not found.' });
        }

        // Return the updated company data
        res.status(200).json(company);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while updating company data.' });
    }
};

//update comp status
exports.updateCompStatus = async (req, res) => {
    const { companyId } = req.params;

    try {
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Toggle the status
        company.status = company.status === 'Active' ? 'Inactive' : 'Active';
        company.modifyAt = new Date(); // Update modifyAt field

        await company.save();

        res.status(200).json({ message: `Company status changed to ${company.status}`, company });
    } catch (error) {
        console.error('Error changing company status:', error);
        res.status(500).json({ message: 'Server error', error });
    }
}



// API to get all companies with reviews sorted by highest rating and latest review date
exports.getTopRatedCompaniesReviews = async (req, res) => {
    try {
        // Fetch all companies with their reviews, sorted by highest average rating first
        const companies = await Company.find().sort({ averageRating: -1 }).lean();

        // For each company, fetch their reviews sorted by latest review date
        const companiesWithReviews = await Promise.all(companies.map(async (company) => {
            const reviews = await Review.find({ companyId: company._id }).sort({ reviewDate: -1 });
            return {
                company,
                reviews
            };
        }));

        res.status(200).json(companiesWithReviews);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message });
    }
};

// upload image of company
exports.uploadCompImage = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        // Check if files are uploaded
        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'No images uploaded' });
        }

        // Update company with new images
        company.image = req.files.map(file => file.path); // Save file paths in 'images' field
        await company.save();;

        res.status(200).json({ message: 'Image uploaded successfully', data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// upload video url of company
exports.uploadCompUrl = async (req, res) => {
    try {
        const { videoURL } = req.body;
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        company.videoURL = videoURL;
        await company.save();

        res.status(200).json({ message: 'Video URL saved successfully', data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};


// Update images and video URL for a company
exports.updateCompMedia = async (req, res) => {
    try {
        // Find the company by its ID from the request parameters
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Update images if provided
        if (req.files && req.files.length > 0) {
            // Remove old images from Cloudinary
            company.image.forEach(async (imagePath) => {
                const publicId = imagePath.split('/').pop().split('.')[0]; // Extract the public ID from the URL
                await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary
            });

            // Save new images, ensuring that no more than 3 are saved
            company.image = req.files.slice(0, 3).map(file => file.path);
        }

        // Update video URL if provided
        if (req.body.videoURL) {
            // If there's an old video URL, delete it from Cloudinary
            if (company.videoURL) {
                const publicId = company.videoURL.split('/').pop().split('.')[0]; // Extract the public ID from the URL
                await cloudinary.uploader.destroy(publicId, { resource_type: "video" }); // Delete the video from Cloudinary
            }

            // Save the new video URL
            company.videoURL = req.body.videoURL;
        }

        await company.save();

        // Respond with success and the updated company data
        res.status(200).json({ message: 'Company media updated successfully', data: company });
    } catch (error) {
        // If an error occurs, respond with a 500 status and the error details
        res.status(500).json({ message: 'An error occurred', error });
    }
};



// Delete specific images for a company
exports.deleteCompImage = async (req, res) => {
    try {
        const { imagePath } = req.body; // Expect the image path to be sent in the request body
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if the image exists in the company's images array
        const imageIndex = company.image.findIndex(img => img === imagePath);
        if (imageIndex === -1) {
            return res.status(404).json({ message: 'Image not found' });
        }

        // Remove the image from Cloudinary
        const publicId = imagePath.split('/').pop().split('.')[0]; // Extract the public ID from the URL
        await cloudinary.uploader.destroy(publicId); // Delete the image from Cloudinary

        // Remove the image from the array
        company.image.splice(imageIndex, 1);

        await company.save();
        res.status(200).json({ message: 'Image deleted successfully', data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

// update video URL link 
exports.updateCompVideoURL = async (req, res) => {
    try {
        const { videoURL } = req.body;
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // If there's an old video URL, delete it from Cloudinary
        if (company.videoURL) {
            const publicId = company.videoURL.split('/').pop().split('.')[0]; // Extract the public ID from the URL
            await cloudinary.uploader.destroy(publicId, { resource_type: "video" }); // Delete the video from Cloudinary
        }

        // Update the video URL
        company.videoURL = videoURL;
        await company.save();

        res.status(200).json({ message: 'Video URL updated successfully', data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};

//  delete video URL link
exports.deleteCompVideoURL = async (req, res) => {
    try {
        const company = await Company.findById(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // If there's an existing video URL, delete it from Cloudinary
        if (company.videoURL) {
            const publicId = company.videoURL.split('/').pop().split('.')[0]; // Extract the public ID from the URL
            await cloudinary.uploader.destroy(publicId, { resource_type: "video" }); // Delete the video from Cloudinary
        }

        // Remove the video URL from the database
        company.videoURL = null;
        await company.save();

        res.status(200).json({ message: 'Video URL deleted successfully', data: company });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred', error });
    }
};


exports.registerCompaniesFromCSV = async (req, res) => {
    const filePath = req.file.path; // Assuming file is uploaded using middleware like multer
    const companies = [];

    // Read CSV file and parse data
    fs.createReadStream(filePath)
        .pipe(csv())
        .on('data', async (row) => {
            try {
                // Extract data from CSV columns
                const { firstName, lastName, compName, email, contactNo, category, address, state, pincode, country, websiteURl, videoURL } = row;

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

exports.googleCompRegister = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.YOUR_GOOGLE_OAUTH_CLIENT_ID,
        });

        const { email, given_name, family_name, picture } = ticket.getPayload();

        let user = await Company.findOne({ email });

        if (user) {
            return res.status(400).json({ message: 'User already registered. Please log in.' });
        }

        user = new Company({
            firstName: given_name,
            lastName: family_name,
            email,
            avatar: picture,
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error('Error during Google Sign-Up:', error);
        res.status(500).json({ message: 'Google Sign-Up failed' });
    }
}


exports.googleCompLogin = async (req, res) => {
    const { tokenId } = req.body;

    try {
        const ticket = await client.verifyIdToken({
            idToken: tokenId,
            audience: process.env.YOUR_GOOGLE_OAUTH_CLIENT_ID,
        });

        const { email } = ticket.getPayload();

        const user = await Company.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found. Please sign up.' });
        }

        res.status(200).json({
            message: 'Login successful',
            companyId: user._id,
            token: 'some-generated-jwt-token', // Generate a token for the user
            sessionsDat: 'some-session-data',
        });
    } catch (error) {
        console.error('Error during Google Login:', error);
        res.status(500).json({ message: 'Google Login failed' });
    }
}

