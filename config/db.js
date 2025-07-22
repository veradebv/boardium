const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

// Add this block to confirm connection
pool.connect()
  .then(() => console.log('✅ Connected to PostgreSQL database' + process.env.DATABASE_URL))
  .catch((err) => console.error('❌ DB connection failed:', err));

module.exports = pool;
