const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const dotenv =require("dotenv").config();




// Middleware to verify JWT token
exports.authenticateJWT = (req, res, next) => {
    // console.log('Authorization Header:', req.headers['authorization']); // Log header


    const bearerHeader = req.headers['authorization'];

    if (!bearerHeader) {
        return res.status(401).json({success:false, message: 'Authentication failed: No token provided' });
    }

    const bearer = bearerHeader.split(' ');
    // console.log('Bearer array:', bearer);
    
    if (bearer.length !== 2 || bearer[0].toLowerCase() !== 'bearer') {
        return res.status(401).json({success:false, message: 'Authentication failed: Invalid authorization header format' });
    }

    const token = bearer[1];
    console.log('Token:', token);

    jwt.verify(token, process.env.seckret_Key, (err, user) => {
        if (err) {
            console.error('JWT verification error:', err);
            return res.status(403).json({success:false, message: 'Authentication failed: Invalid token' });
        }

        req.user = user; // Attach the user to the request object
        console.log('User verified:', user);
        next(); // Continue to the protected route
    });
};





