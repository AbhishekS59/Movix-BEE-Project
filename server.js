// server.js

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const app = express();
const port = 3001;

// Sample user data (for demonstration purposes)
const users = [
  {
    id: 1,
    username: 'user1',
    // Hashed password for 'password123'
    passwordHash: '$2b$10$4UW1bQW6aSWtadC6N/lST.kL29UIF6ssB/av9uMmD1v7qrZ9htc7y',
  },
  // Add more users as needed
];

app.use(bodyParser.json());

app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find(u => u.username === username);

  if (user) {
    // Compare the provided password with the hashed password
    bcrypt.compare(password, user.passwordHash, (err, result) => {
      if (result) {
        // Passwords match, user is authenticated
        res.json({ message: 'Login successful' });
      } else {
        // Passwords do not match
        res.status(401).json({ message: 'Invalid credentials' });
      }
    });
  } else {
    // User not found
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
