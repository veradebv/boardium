const express = require('express');
const dotenv = require('dotenv');
const pool = require('./config/db');
const connectMongo = require('./config/mongo');

dotenv.config();
const app = require('./app');

// Connect databases
connectMongo();
// pool is already connected in db.js when imported

// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, "0.0.0.0", () => {
    console.log('🚀 Server running on http://localhost:${PORT}');
});