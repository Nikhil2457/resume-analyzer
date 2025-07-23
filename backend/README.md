# Resume Analyzer Backend

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   - Copy `.env.example` to `.env` and set your `DATABASE_URL` and `GOOGLE_API_KEY`.

3. **Database setup:**
   - Create the database if it doesn't exist.
   - Run the schema migration:
     ```bash
     psql $DATABASE_URL -f db/schema.sql
     ```
   - (Or use your preferred Postgres client to run `db/schema.sql`)

4. **Seed sample data:**
   ```bash
   node db/seed.js
   ```

5. **Start the backend server:**
   ```bash
   npm start
   ```

## Modernization Notes
- Modular analysis logic with keyword extraction and skill scoring.
- Improved error handling and validation.
- Easy database seeding for development/testing. 