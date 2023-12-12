const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bcrypt = require('bcrypt'); 
const jwt = require('jsonwebtoken'); 
const app = express();

app.use(express.json());
app.use(cors());

const connection = mysql.createConnection({
  host: 'database-do-user-15358047-0.c.db.ondigitalocean.com',
  user: 'doadmin',
  password: 'AVNS_H-FHr7UDDnvoVphzNYM',
  database: 'defaultdb',
  port: 25060

});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL database');
  }
});

// Endpoint for user login
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM Users WHERE username = ?', [username], (err, results) => {
    if (err) {
      console.error('Error fetching user from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      if (results.length > 0) {
        const user = results[0];
        bcrypt.compare(password, user.password, (bcryptErr, bcryptResult) => {
          if (bcryptErr) {
            console.error('Error comparing passwords:', bcryptErr);
            res.status(500).json({ error: 'Internal Server Error' });
          } else {
            if (bcryptResult) {
              const token = jwt.sign({ username: user.username }, 'bma123', { expiresIn: '1h' });
              res.json({ token });
            } else {
              res.status(401).json({ error: 'Unauthorized' });
            }
          }
        });
      } else {
        res.status(401).json({ error: 'Unauthorized' });
      }
    }
  });
});

// Endpoint for user signup
app.post('/api/signup', (req, res) => {
  const { username, password } = req.body;

  connection.query('SELECT * FROM Users WHERE username = ?', [username], (selectErr, existingUser) => {
    if (selectErr) {
      console.error('Error checking existing user:', selectErr);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ error: 'Username is already taken' });
    }

    bcrypt.hash(password, 10, (bcryptErr, hash) => {
      if (bcryptErr) {
        console.error('Error hashing password:', bcryptErr);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const insertQuery = 'INSERT INTO Users (username, password) VALUES (?, ?)';
      const insertValues = [username, hash];

      connection.query(insertQuery, insertValues, (insertErr, results) => {
        if (insertErr) {
          console.error('Error adding user to MySQL:', insertErr);
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        const newUser = { username, id: results.insertId };
        res.status(201).json(newUser);
      });
    });
  });
});

// Endpoint for fetching all entries
app.get('/fetch', (req, res) => {
  connection.query('SELECT * FROM Budget', (err, results) => {
    if (err) {
      console.error('Error fetching entries from MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// Endpoint for adding a new entry
app.post('/add', (req, res) => {
  const { title, relatedValue, color } = req.body;
  const query = 'INSERT INTO Budget (title, relatedValue, color) VALUES (?, ?, ?)';
  const values = [title, relatedValue, color];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding entry to MySQL:', err);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      const newEntry = { title, relatedValue, color, id: results.insertId };
      res.status(201).json(newEntry);
    }
  });
});

app.use('/', express.static('public'));

app.listen(3001, () => {
  console.log('Server is listening on port 3100');
});
