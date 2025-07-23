const pool = require('../db');
const { analyzeResume } = require('../services/analysisService');

const uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const fileBuffer = req.file.buffer;
        const fileName = req.file.originalname;

        // Analyze resume
        const analysis = await analyzeResume(fileBuffer);

        // Basic validation for required fields
        if (!analysis.name || !analysis.email) {
            return res.status(422).json({ error: 'Resume must include a name and email.' });
        }

        // Save to database
        const query = `
            INSERT INTO resumes (
                file_name, name, email, phone, linkedin_url, portfolio_url, summary,
                work_experience, education, technical_skills, soft_skills, projects,
                certifications, resume_rating, improvement_areas, upskill_suggestions
            )
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)
            RETURNING *
        `;
        const values = [
            fileName,
            analysis.name,
            analysis.email,
            analysis.phone,
            analysis.linkedin_url,
            analysis.portfolio_url,
            analysis.summary,
            JSON.stringify(analysis.work_experience),
            JSON.stringify(analysis.education),
            JSON.stringify(analysis.technical_skills),
            JSON.stringify(analysis.soft_skills),
            JSON.stringify(analysis.projects),
            JSON.stringify(analysis.certifications),
            analysis.resume_rating,
            analysis.improvement_areas,
            JSON.stringify(analysis.upskill_suggestions),
        ];

        const result = await pool.query(query, values);
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error in uploadResume:', error);
        if (error.message && error.message.includes('LLM response')) {
            return res.status(500).json({ error: 'Resume analysis failed. Please upload a clearer PDF.' });
        }
        res.status(500).json({ error: error.message });
    }
};

const getAllResumes = async (req, res) => {
    try {
        const result = await pool.query('SELECT id, file_name, name, email, uploaded_at FROM resumes ORDER BY uploaded_at DESC');
        res.json(result.rows);
    } catch (error) {
        console.error('Error in getAllResumes:', error);
        res.status(500).json({ error: 'Failed to fetch resumes' });
    }
};

const getResumeById = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await pool.query('SELECT * FROM resumes WHERE id = $1', [id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ error: 'Resume not found' });
        }
        res.json(result.rows[0]);
    } catch (error) {
        console.error('Error in getResumeById:', error);
        res.status(500).json({ error: 'Failed to fetch resume' });
    }
};

module.exports = { uploadResume, getAllResumes, getResumeById };
