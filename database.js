// Necessary Imports
const sqlite3 = require("sqlite3").verbose();
const bcrypt = require("bcrypt");

// Write Code For - new sqlite3.Database

// Write Code For - Creating the table


/**
 * Registers a new user by hashing the provided password and storing the username and hashed password in the database.
 *
 * @param {string} username - The username of the new user.
 * @param {string} password - The password of the new user.
 * @param {function} callback - A callback function to handle the registration result.
 *   - Takes one parameter: (error)
 *     - If registration is successful, 'error' is null.
 *     - If there is an error during the registration process, 'error' contains the error details.
 */
function registerUser(username, password, callback) {}


/**
 * Authenticates a user by checking the provided username and password against the database.
 *
 * @param {string} username - The username to authenticate.
 * @param {string} password - The password to authenticate.
 * @param {function} callback - A callback function to handle the authentication result.
 *   - Takes two parameters: (error, user)
 *     - If authentication is successful, 'error' is null and 'user' contains user information.
 *     - If authentication fails, 'error' is null and 'user' is false.
 *     - If there is an error during the authentication process, 'error' contains the error details and 'user' is null.
 */

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
