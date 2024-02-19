const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const { registerUser, authenticateUser } = require("./database");

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(
  session({
    secret: "your_secret_key",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60000 }, // 1 minute
  })
);

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (!req.session.userId) {
    return res.send("You must login to view this page.");
  }
  next();
}

// Middleware to extend session expiry
function extendSessionExpiry(req, res, next) {
  if (req.session) {
    // Reset the expiration time after each request
    req.session._garbage = Date();
    req.session.touch();
  }
  next();
}

// Apply extendSessionExpiry middleware globally
app.use(extendSessionExpiry);

app.post('/register', (req, res) => {
    const { username, password } = req.body;
    console.log(req.body);
    // Validate input
    if (!username || !password) {
      return res.status(400).send('Username and password are required');
    }
  
    registerUser(username, password, (err) => {
      if (err) {
        // Handle unique constraint violation for username
        if (err.code === 'SQLITE_CONSTRAINT') {
          return res.status(409).send('This username is already taken.'); // 409 Conflict
        } else {
          console.error(err);
          return res.status(500).send('Failed to register user due to an unexpected error.'); // 500 Internal Server Error
        }
      }
      res.send('User registered successfully.');
    });
  });
  

// Login endpoint remains the same

// Protected home route
app.get("/home", isAuthenticated, (req, res) => {
  res.send("Welcome to the protected home page!");
});
// Login endpoint
app.post("/login", (req, res) => {
  const { username, password } = req.body;
  authenticateUser(username, password, (err, user) => {
    if (err || !user) {
      return res.send("Login failed.");
    }
    req.session.userId = user.id;
    res.send("Logged in successfully.");
  });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});