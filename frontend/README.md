# Resume Analyzer Frontend

A beautiful, animated React frontend for the Resume Analyzer app. Instantly upload your resume, get AI-powered feedback, and view your analysis history.

---

## Features
- Upload PDF resumes and get instant AI analysis
- View detailed breakdowns: personal info, work experience, education, skills, projects, certifications, and feedback
- Search and filter past resume analyses
- Stunning gradient backgrounds and animated UI
- Responsive design for all devices

---

## Prerequisites
- Node.js (v16 or newer recommended)
- npm (comes with Node.js)
- Backend API running (see main project README)

---

## Local Setup Instructions

### 1. Clone the Repository
```
git clone https://github.com/your-username/resume-analyzer.git
cd resume-analyzer/frontend
```

### 2. Install Dependencies
```
npm install
```

### 3. Start the Frontend
```
npm start
```
- The app will run at [http://localhost:3000](http://localhost:3000)
- Make sure the backend is running at `http://localhost:5000` (default)

---

## Project Structure
```
frontend/
├── public/
├── src/
│   ├── components/
│   ├── App.js
│   ├── index.js
│   └── ...
├── package.json
└── README.md
```

---

## Environment & API
- No environment variables are required for the frontend by default.
- The frontend expects the backend API at `http://localhost:5000`.
- For production, update API URLs as needed.

---

## Build for Production
```
npm run build
```
- Creates an optimized build in the `build/` folder.

---

## Troubleshooting
- If you see CORS errors, ensure the backend allows requests from `localhost:3000`.
- If the backend is not running, resume analysis will fail.

---

## License
MIT

---

Made with ❤️ for modern job seekers and developers.
