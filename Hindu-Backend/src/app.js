const express = require('express');
const path = require('path');
const setupDBClient = require('./configure/dataBase');
const router = require('./routes/indexRoute');
const session = require('express-session');
const cors = require('cors');
require('dotenv').config();

setupDBClient();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Define CORS options
const corsOptions = {
  origin: ['http://localhost:5173','http://localhost:3000'], // Update with your allowed origin
  methods: ['GET', 'POST','PUT',"DELETE"],
  credentials: true,
};
app.use(cors(corsOptions));

// Custom CORS middleware
// const corsMiddleware = (req, res, next) => {
//   if (req.path.startsWith('/admin') || req.path.startsWith('/company')) {
//     cors(corsOptions)(req, res, next);
//   } else {
//     next();
//   }
// };

// app.use(corsMiddleware);

app.use(session({
  secret: process.env.Session_SECRET_KEY ,
  resave: false,
  saveUninitialized: true,
  rolling: true,
  cookie: {
    httpOnly: true,
    maxAge: 60000 * 30,              // 30 minutes
    secure: false,                  // set to true if using HTTPS
    sameSite: 'lax', // Adjust based on your needs: 'strict', 'lax', or 'none'
   } 
}));

// Set the view engine to EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
const publicPath = path.join(__dirname, 'public/local') ;
console.log('public path',publicPath);

app.use(express.static(publicPath));

// Middleware for protecting routes
const isAuthenticated = (req, res, next) => {
  console.log('Session ID:', req.sessionID);                  // Debug line to check session ID
  console.log('Session user:', req.session.user);             // Debug line
  if (req.session && req.session.user) {
    return next();
  }
  res.status(401).json({ message: 'Unauthorized' });
};


// Public routes (no authentication required)
app.use('/public', router.publicRoutes);

// Protected routes (authentication required)
app.use('/private', isAuthenticated, router.privateRoutes);
// app.use('/private', router.privateRoutes);


app.get('/hello', (req, res) => {
  console.log('hello');
  res.send("hello world");
});

// Use this middleware for protected routes
app.get('/protected-route', isAuthenticated, (req, res) => {
  res.json({ message: 'You have access' });
});

app.get('/test-session', (req, res) => {
  res.json({ session: req.session, sessionId:req.sessionID });
});

// Logout API
app.post('/logout', (req, res) => {
  // Destroy the session
  req.session.destroy(err => {
    if (err) {
      return res.status(500).json({ message: 'Failed to log out' });
    }
    // Clear the session cookie
    res.clearCookie('connect.sid', { path: '/' });
    res.status(200).json({ message: 'Logged out successfully' });
  });
});


// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

module.exports = app;
