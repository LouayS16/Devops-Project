const express = require('express');
const cors = require('cors'); // Import CORS
const app = express();
const PORT = 5000;

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Sample in-memory users data
let users = [
  { id: 1, name: 'John Doe', email: 'john.doe@example.com' },
  { id: 2, name: 'Jane Smith', email: 'jane.smith@example.com' },
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the User Management API');
});

// GET: Fetch all users
app.get('/users', (req, res) => {
  res.json(users);
});

// POST: Add a new user
app.post('/users', (req, res) => {
  const { name, email } = req.body;
  const newUser = { id: users.length + 1, name, email };
  users.push(newUser);
  res.status(201).json(newUser); // Return the created user
});

// PUT: Update a user's information
app.put('/users/:id', (req, res) => {
  const { id } = req.params;
  const { name, email } = req.body;

  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Update user data
  users[userIndex] = { id: parseInt(id), name, email };
  res.json(users[userIndex]);
});

// DELETE: Delete a user
app.delete('/users/:id', (req, res) => {
  const { id } = req.params;
  const userIndex = users.findIndex((user) => user.id === parseInt(id));
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  // Remove user from the array
  users = users.filter((user) => user.id !== parseInt(id));
  res.status(204).send(); // No content to return after successful deletion
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
