const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authMiddleware = require('./middleware/authMiddleware');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const authRoutes = require('./routes/authRoutes');
const boardRoutes = require('./routes/boardRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/boards', boardRoutes);

// Root test
app.get('/', (req, res) => {
  res.send('Boardium API is running 🚀');
});

// Protected test route
app.get('/api/secret', authMiddleware, (req, res) => {
  res.json({
    message: 'You are authenticated ✅',
    userId: req.user,
  });
});

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`🚀 Server started on port ${PORT}`));