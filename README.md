# Boardium Backend

Node.js + Express backend for a Trello-style app with PostgreSQL authentication.

## Setup

1. Create a PostgreSQL database named `boardium`
2. Run schema:
   ```bash
   psql -U your_user -d boardium -f sql/init.sql


npm install express mongoose dotenv cors bcryptjs jsonwebtoken

express => API server and route handling
mongoose =>	Database interaction with MongoDB
dotenv =>	Store secrets/configs securely
cors =>	Enable frontend/backend requests
bcryptjs =>	Hash and verify passwords
jsonwebtoken =>	Create and validate auth tokens




