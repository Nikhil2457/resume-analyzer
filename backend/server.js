const express = require('express');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Replace with your actual frontend URL
const allowedOrigins = [
  'https://resume-analyzer-sjpz.onrender.com', // <-- set this to your deployed frontend!
];

// CORS should be set up before routes
app.use(cors({
  origin: allowedOrigins,
  credentials: true, // if you use cookies/auth
}));

app.use(express.json());
app.use('/api/resumes', resumeRoutes);

app.get('/', (req, res) => {
  res.send('Resume Analyzer API is running!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const pool = require('./db');
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Database connection failed:', err.message);
  } else {
    console.log('Database connected:', res.rows[0]);
  }
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
});