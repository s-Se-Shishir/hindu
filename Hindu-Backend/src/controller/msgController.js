const Message = require('../model/messageModel');
const { body, validationResult } = require('express-validator');
const { formatDateTime } = require("../utility/helper");
const Company = require('../model/companyModel');

exports.addMsg = async (req, res) => {
    await body('userName').isString().notEmpty().withMessage('User name is required').run(req);
    await body('comment').isString().notEmpty().withMessage('coment is required').run(req);
    await body('userEmail').isEmail().withMessage('Invalid email').run(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { companyId, userName, userEmail, comment } = req.body;
    console.log('req body', req.body);
    try {
        const userMsg = new Message({
            companyId,
            userName,
            userEmail,
            comment,
            msgDate: formatDateTime()
        })

        await userMsg.save();

        res.status(201).json({ message: "User msg is send to company ", name: userName, email: userEmail, date: userMsg.msgDate })

    } catch (error) {
        console.log('error:', error);
        res.status(500).json({ message: 'Server error', err: error });
    }
}


exports.notifications = async (req, res) => {


    try {
        const { companyId } = req.params;

        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ message: "Company not found" });
        }
        const data = await Message.find({companyId}).sort({ msgDate: -1 });
        console.log('msg data:',data);

        res.status(200).json({msg:"msg data for comp", details:data});

    } catch (error) {
        console.log('error', error);
        res.status(500).json({ message: 'Server error', err: error });
    }

}

