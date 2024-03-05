// Necessary Imports
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// Write Code For - new sqlite3.Database

// Write Code For - Creating the table

// Write Code For - Register user
function registerUser(username, password, callback) {}

// Write Code For - Authenticate user (to check if user is present in DB and to check for the correct password)
function authenticateUser(username, password, callback) {}









// Do not modify any code below this line

function getUser(username) {
  return new Promise((resolve, reject) => {
    const sql = `SELECT * FROM users WHERE username = ?`;
    db.get(sql, [username], (err, row) => {
      if (err) {
        reject(err);
      } else {
        resolve(row); // Resolve with the row (user data) or null if not found
      }
    });
  });
}

module.exports = { registerUser, authenticateUser, getUser };
