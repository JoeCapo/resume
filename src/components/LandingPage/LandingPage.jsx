import { resumeData } from '../../data/resumeContent'
import './LandingPage.css'

export default function LandingPage({ onEnter3D }) {
    // Helper: Parse contact info
    // "South Windsor, CT | 860-268-6035 | jrcaporiccio@gmail.com"
    const contactParts = resumeData.profile.contact.split('|').map(s => s.trim())
    const [location, phone, email] = contactParts

    // Helper: Aggregate technical skills
    const technicalSkills = [
        ...resumeData.skills.frontend.data.Stack,
        ...resumeData.skills.backend.data.Languages,
        ...resumeData.skills.devops.data.Tools
    ]

    // Helper: Flatten education
    const educationItems = [
        ...resumeData.education.data.Degrees.map(d => ({ degree: d, year: "2018" })), // Year inferred or hardcoded if needed, or just display string
        ...resumeData.education.data.Certifications.map(c => ({ degree: c, year: "2021" }))
    ]

    return (
        <div className="landing-page">
            {/* Sticky 3D Button - Top Right */}
            <button className="sticky-cta-3d" onClick={onEnter3D}>
                <span className="cta-icon">🎮</span>
                <span>Explore in 3D</span>
            </button>

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-content">
                    <div className="avatar-container">
                        <div className="avatar">
                            <span className="avatar-initials">JC</span>
                        </div>
                    </div>

                    <div className="hero-text">
                        <h1>{resumeData.profile.name}</h1>
                        <h2 className="title">{resumeData.profile.title}</h2>
                        <div className="contact-info">
                            <span>{location}</span>
                            <span>•</span>
                            <a href={`tel:${phone}`}>{phone}</a>
                            <span>•</span>
                            <a href={`mailto:${email}`}>{email}</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* Summary */}
            <section className="summary-section">
                <div className="tech-corner tl"></div>
                <div className="tech-corner tr"></div>
                <div className="tech-corner bl"></div>
                <div className="tech-corner br"></div>
                <p className="summary">{resumeData.profile.summary}</p>
            </section>

            {/* Core Competencies */}
            <section className="section">
                <h3 className="section-title">Core Competencies</h3>
                <div className="competencies-grid">
                    {resumeData.profile.competencies.map((comp, i) => (
                        <div key={i} className="competency-pill">{comp}</div>
                    ))}
                </div>
                <div className="technical-foundation">
                    <strong>Technical Foundation:</strong> {technicalSkills.join(' | ')}
                </div>
            </section>

            {/* Experience */}
            <section className="section">
                <h3 className="section-title">Professional Experience</h3>
                <div className="experience-timeline">
                    {resumeData.experience.map((job, i) => (
                        <div key={i} className="experience-card">
                            <div className="tech-corner tl"></div>
                            <div className="tech-corner tr"></div>
                            <div className="tech-corner bl"></div>
                            <div className="tech-corner br"></div>

                            <div className="job-header">
                                <div>
                                    <h4 className="job-title">{job.role}</h4>
                                    <p className="company">{job.company}</p>
                                </div>
                                <span className="period">{job.period}</span>
                            </div>

                            <div className="job-details" style={{ whiteSpace: 'pre-line', lineHeight: '1.6', color: '#cbd5e1' }}>
                                {job.details}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Key Achievements */}
            <section className="section">
                <h3 className="section-title">Key Achievements</h3>
                <div className="achievements-grid">
                    {resumeData.achievements.map((achievement, i) => (
                        <div key={i} className="achievement-card">
                            <div className="tech-corner tl"></div>
                            <div className="tech-corner tr"></div>
                            <div className="tech-corner bl"></div>
                            <div className="tech-corner br"></div>
                            <span className="achievement-icon">✓</span>
                            <p>{achievement}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Education */}
            <section className="section">
                <h3 className="section-title">Education & Certifications</h3>
                <div className="education-grid">
                    {educationItems.map((edu, i) => (
                        <div key={i} className="education-card">
                            <div className="tech-corner tl"></div>
                            <div className="tech-corner tr"></div>
                            <div className="tech-corner bl"></div>
                            <div className="tech-corner br"></div>
                            <h4>{edu.degree}</h4>
                            {/* Year is optional or included in string now */}
                            {<p className="year">{edu.year}</p>}
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
