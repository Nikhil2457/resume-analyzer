# Resume Analyzer

A full-stack web application that uses AI to analyze resumes, provide feedback, and help users improve their skills. Upload your PDF resume and instantly get:

- **AI-powered resume analysis**
- **Skill and upskill suggestions**
- **Improvement areas and tips**
- **History of past analyses with search and filter**
- **Stunning, animated, responsive UI**

---

## Features
- Upload PDF resumes and get instant feedback
- View detailed breakdowns: personal info, work experience, education, skills, projects, certifications, and AI feedback
- Search and filter past resume analyses
- Beautiful gradient backgrounds and animated UI
- Responsive design for all devices

---

## Tech Stack
- **Frontend:** React, Bootstrap, Custom CSS
- **Backend:** Node.js, Express.js
- **Database:** PostgreSQL (JSONB columns)
- **AI:** Google Gemini LLM API

---

## Prerequisites
- Node.js (v16 or newer recommended)
- npm (comes with Node.js)
- PostgreSQL database
- Gemini API key

---

## Local Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer
```

### 2. Install Dependencies
```
cd backend
npm install
cd ../frontend
npm install
```

### 3. Configure Environment Variables
- In the `backend` folder, create a `.env` file:
```
DATABASE_URL=your_postgres_connection_string
GEMINI_API_KEY=your_gemini_api_key
```

### 4. Start the Backend
```
cd backend
npm start
```
- The backend will run at `http://localhost:5000`

### 5. Start the Frontend
```
cd frontend
npm start
```
- The frontend will run at [http://localhost:3000](http://localhost:3000)

---

## Project Structure
```
resume-analyzer/
├── backend/
│   ├── controllers/
│   ├── db/
│   ├── routes/
│   ├── services/
│   ├── .env
│   ├── server.js
│   └── ...
├── frontend/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

---

## Usage
- Go to the Upload tab, select your PDF resume, and click "Analyze Resume"
- View detailed analysis and suggestions
- Switch to History tab to view/search past uploads

---

## Troubleshooting
- If you see CORS errors, ensure the backend allows requests from `localhost:3000`
- If the backend is not running, resume analysis will fail
- For production, update API URLs as needed

---

## License
MIT

---

Made with ❤️ for modern job seekers and developers.
