const pool = require('./index');

async function seed() {
    const sampleResumes = [
        {
            file_name: 'john_doe_resume.pdf',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+1-555-123-4567',
            linkedin_url: 'https://linkedin.com/in/johndoe',
            portfolio_url: 'https://johndoe.dev',
            summary: 'Experienced software engineer with a passion for building scalable web applications.',
            work_experience: [
                { role: 'Software Engineer', company: 'TechCorp', duration: '2019-2023', description: ['Developed REST APIs', 'Led a team of 4 developers'] }
            ],
            education: [
                { degree: 'B.Sc. Computer Science', institution: 'State University', graduation_year: '2019' }
            ],
            technical_skills: ['JavaScript', 'Node.js', 'React', 'PostgreSQL'],
            soft_skills: ['Teamwork', 'Communication'],
            projects: [
                { name: 'Resume Analyzer', description: 'A web app to analyze and rate resumes.' }
            ],
            certifications: [
                { name: 'AWS Certified Developer', issuer: 'Amazon', year: '2022' }
            ],
            resume_rating: 8.5,
            improvement_areas: 'Add more leadership experience.',
            upskill_suggestions: ['Learn TypeScript', 'Contribute to open source']
        },
        {
            file_name: 'jane_smith_resume.pdf',
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            phone: '+1-555-987-6543',
            linkedin_url: 'https://linkedin.com/in/janesmith',
            portfolio_url: 'https://janesmith.io',
            summary: 'Creative UI/UX designer with 5+ years of experience.',
            work_experience: [
                { role: 'UI/UX Designer', company: 'Designify', duration: '2018-2023', description: ['Designed mobile apps', 'Improved user retention by 20%'] }
            ],
            education: [
                { degree: 'B.A. Graphic Design', institution: 'Art College', graduation_year: '2018' }
            ],
            technical_skills: ['Figma', 'Sketch', 'Adobe XD'],
            soft_skills: ['Creativity', 'Empathy'],
            projects: [
                { name: 'Portfolio Website', description: 'Personal portfolio and blog.' }
            ],
            certifications: [
                { name: 'Certified UX Professional', issuer: 'UX Institute', year: '2021' }
            ],
            resume_rating: 9.0,
            improvement_areas: 'Showcase more case studies.',
            upskill_suggestions: ['Learn motion design', 'Explore AR/VR interfaces']
        }
    ];

    for (const resume of sampleResumes) {
        await pool.query(
            `INSERT INTO resumes (
                file_name, name, email, phone, linkedin_url, portfolio_url, summary,
                work_experience, education, technical_skills, soft_skills, projects,
                certifications, resume_rating, improvement_areas, upskill_suggestions
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16)`,
            [
                resume.file_name,
                resume.name,
                resume.email,
                resume.phone,
                resume.linkedin_url,
                resume.portfolio_url,
                resume.summary,
                JSON.stringify(resume.work_experience),
                JSON.stringify(resume.education),
                JSON.stringify(resume.technical_skills),
                JSON.stringify(resume.soft_skills),
                JSON.stringify(resume.projects),
                JSON.stringify(resume.certifications),
                resume.resume_rating,
                resume.improvement_areas,
                JSON.stringify(resume.upskill_suggestions)
            ]
        );
    }
    console.log('Database seeded with sample resumes.');
    process.exit();
}

seed().catch(err => {
    console.error('Seeding failed:', err);
    process.exit(1);
}); 