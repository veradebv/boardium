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
app.use('/api/auth', require('./routes/authRoutes'));   
app.use('/api/boards',require('./routes/boardRoutes'));

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Boardium API is running 🚀');
});

app.get('/api/secret', authMiddleware, (req, res) => {
    res.json({
        message: 'You are authenticated ✅',
        userId: req.user 
    });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));