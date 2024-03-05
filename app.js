// Necessary Imports for Express App
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { registerUser, authenticateUser } = require("./database");

const app = express();
const PORT = 1337;

// ******************************************

// Modify Code Below This Line

// ******************************************

// Space For - Using the bodyParser middleware

// Space For - Using the express-session middleware (this is for session management)

// Space For - Writing the `isAuthenticated` middleware
function isAuthenticated(req, res, next) {}

// Space For - Writing the `extendSessionExpiry` middleware
function extendSessionExpiry(req, res, next) {}

// Applying `extendSessionExpiry` middleware globally
app.use(extendSessionExpiry);

// Space For - Writing `/register` route
app.post("/register", (req, res) => {});

// Space For - Writing `/login` route
app.post("/login", (req, res) => {});

// Space For - Writing `/home` route (Protected Route)
app.get("/home", (req, res) => {});




/************************************************

// Do not modify any code below this line


*/











// Do not modify any code below this line
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});








app.post("/checkDatabaseFunctions", (req, res) => {
  const { username, password } = req.body;
  registerUser(username, password, (err) => {
    if (err) {
     return "Implementation is Wrong"
    }
    res.send("User registered successfully.");
  });
  authenticateUser(username, password, (err) => {
    if (err) {
      return "Implementation is Wrong"
     }
   
    res.send("Logged in successfully.");
  });
});
