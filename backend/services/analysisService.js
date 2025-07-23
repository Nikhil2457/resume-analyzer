const pdfParse = require('pdf-parse');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

// Utility: Extract keywords from resume text
function extractKeywords(resumeText) {
    // Simple keyword extraction (can be replaced with NLP)
    const keywords = ['JavaScript', 'Node.js', 'React', 'PostgreSQL', 'Figma', 'Sketch', 'Adobe XD', 'AWS', 'TypeScript'];
    const found = keywords.filter(kw => resumeText.includes(kw));
    return found;
}

// Utility: Score skills based on presence in resume
function scoreSkills(technicalSkills, resumeText) {
    if (!Array.isArray(technicalSkills)) return 0;
    let score = 0;
    technicalSkills.forEach(skill => {
        if (resumeText.toLowerCase().includes(skill.toLowerCase())) {
            score += 1;
        }
    });
    return score;
}

async function analyzeResume(fileBuffer) {
    try {
        // Parse PDF
        const pdfData = await pdfParse(fileBuffer);
        const resumeText = pdfData.text;

        // Construct prompt
        const prompt = `
        You are an expert technical recruiter and career coach. Analyze the following resume text and extract the information into a valid JSON object. The JSON object must conform to the following structure, and all fields must be populated. Do not include any text or markdown formatting before or after the JSON object.

        Resume Text:
        """
        ${resumeText}
        """

        JSON Structure:
        {
            "name": "string | null",
            "email": "string | null",
            "phone": "string | null",
            "linkedin_url": "string | null",
            "portfolio_url": "string | null",
            "summary": "string | null",
            "work_experience": [{ "role": "string", "company": "string", "duration": "string", "description": ["string"] }],
            "education": [{ "degree": "string", "institution": "string", "graduation_year": "string" }],
            "technical_skills": ["string"],
            "soft_skills": ["string"],
            "projects": [{ "name": "string", "description": "string" }],
            "certifications": [{ "name": "string", "issuer": "string", "year": "string" }],
            "resume_rating": "number (1-10)",
            "improvement_areas": "string",
            "upskill_suggestions": ["string"]
        }
        `;

        // Call Gemini API
        const result = await model.generateContent(prompt);
        const responseText = result.response.text();

        // Extract JSON from response
        const jsonMatch = responseText.match(/{[\s\S]*}/);
        if (!jsonMatch) {
            throw new Error('No JSON object found in LLM response');
        }
        let parsedData;
        try {
            parsedData = JSON.parse(jsonMatch[0]);
        } catch (parseError) {
            throw new Error('Failed to parse extracted JSON from LLM response');
        }

        // Enhance with keyword extraction and skill scoring
        parsedData.keywords_found = extractKeywords(resumeText);
        parsedData.skill_score = scoreSkills(parsedData.technical_skills, resumeText);

        return parsedData;
    } catch (error) {
        throw new Error(`Analysis failed: ${error.message}`);
    }
}

module.exports = { analyzeResume };
