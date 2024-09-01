const { body, validationResult } = require('express-validator');


const validateSignUp = async (req, res, next) => {
    await body('firstName').isString().notEmpty().withMessage('First name is required').run(req);
    await body('lastName').isString().notEmpty().withMessage('Last name is required').run(req);
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('compPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};
 

const validateCompListing = async (req, res, next) => {
    await body('firstName').isString().notEmpty().withMessage('First name is required').run(req);
    await body('lastName').isString().notEmpty().withMessage('Last name is required').run(req);
    await body('email').isEmail().withMessage('Invalid email').run(req);
    await body('compPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters').run(req);
    await body('compName').isString().notEmpty().withMessage('Company name is required').run(req);
    await body('contactNo').isNumeric().withMessage('Contact number must be numeric').run(req);
    await body('category').isString().notEmpty().withMessage('Category is required').run(req);
    await body('address').isString().notEmpty().withMessage('Address is required').run(req);
    await body('state').isString().notEmpty().withMessage('State is required').run(req);
    await body('pincode').isString().notEmpty().withMessage('Pincode is required').run(req);
    await body('country').isString().notEmpty().withMessage('Country is required').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {validateCompListing,validateSignUp}