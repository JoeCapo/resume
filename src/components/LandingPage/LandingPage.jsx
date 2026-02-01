import { resumeData } from '../../data/ResumeData'
import './LandingPage.css'


export default function LandingPage({ onEnter3D }) {
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
                        <h1>{resumeData.personal.name}</h1>
                        <h2 className="title">{resumeData.personal.title}</h2>
                        <div className="contact-info">
                            <span>{resumeData.personal.location}</span>
                            <span>•</span>
                            <a href={`tel:${resumeData.personal.phone}`}>{resumeData.personal.phone}</a>
                            <span>•</span>
                            <a href={`mailto:${resumeData.personal.email}`}>{resumeData.personal.email}</a>
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
                <p className="summary">{resumeData.personal.summary}</p>
            </section>

            {/* Core Competencies */}
            <section className="section">
                <h3 className="section-title">Core Competencies</h3>
                <div className="competencies-grid">
                    {resumeData.competencies.map((comp, i) => (
                        <div key={i} className="competency-pill">{comp}</div>
                    ))}
                </div>
                <div className="technical-foundation">
                    <strong>Technical Foundation:</strong> {resumeData.technicalSkills.join(' | ')}
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
                                    <h4 className="job-title">{job.title}</h4>
                                    <p className="company">{job.company}</p>
                                </div>
                                <span className="period">{job.period}</span>
                            </div>

                            {job.customerFacing && (
                                <div className="job-section">
                                    <h5>Customer-Facing Technical Work:</h5>
                                    <ul>
                                        {job.customerFacing.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {job.technical && (
                                <div className="job-section">
                                    <h5>Technical Implementation:</h5>
                                    <ul>
                                        {job.technical.map((item, j) => (
                                            <li key={j}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
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
                    {resumeData.education.map((edu, i) => (
                        <div key={i} className="education-card">
                            <div className="tech-corner tl"></div>
                            <div className="tech-corner tr"></div>
                            <div className="tech-corner bl"></div>
                            <div className="tech-corner br"></div>
                            <h4>{edu.degree}</h4>
                            {edu.institution && <p className="institution">{edu.institution}</p>}
                            <p className="year">{edu.year}</p>
                        </div>
                    ))}
                </div>
            </section>

        </div>
    )
}
