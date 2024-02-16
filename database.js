const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

// Open a database
let db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the users database.');
});

db.run(`CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  username TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL
)`);

function registerUser(username, password, callback) {
  bcrypt.hash(password, 10, (err, hash) => {
    if (err) {
      return callback(err);
    }
    const sql = `INSERT INTO users (username, password) VALUES (?, ?)`;
    db.run(sql, [username, hash], function(err) {
      if (err) {
        return callback(err);
      }
      callback(null);
    });
  });
}

function authenticateUser(username, password, callback) {
  const sql = `SELECT * FROM users WHERE username = ?`;
  db.get(sql, [username], (err, row) => {
    if (err) {
      return callback(err, null);
    }
    if (row) {
      bcrypt.compare(password, row.password, (err, result) => {
        if (err) {
          return callback(err, null);
        }
        if (result) {
          return callback(null, row);
        } else {
          return callback(null, false);
        }
      });
    } else {
      return callback(null, false);
    }
  });
}

module.exports = { registerUser, authenticateUser };
