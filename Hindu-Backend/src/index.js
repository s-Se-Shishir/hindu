const app = require('./app');
const dotenv =require('dotenv').config();
const path = require('path');
const result = require('dotenv').config();

if (result.error) {
    console.error("Error loading .env file:", result.error);
} else {
    console.log("Environment variables loaded successfully");
}

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
