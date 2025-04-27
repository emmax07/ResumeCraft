import React from "react";
import styles from "./ResumePreview2.module.css";
import ResumePDFGenerator from "./ResumePDFGenerator"; // Import the PDF generator

const renderList = (items) => {
  return (
    <ul>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};

const ResumePreview2 = ({ resume }) => {
  const { generatePDF } = ResumePDFGenerator();  // Call to PDF generation function

  return (
    <div className={styles.templateContainer}>
      {/* Header Section */}
      <header className={styles.header}>
        <h1 className={styles.name}>{resume.fullName}</h1>
        <p className={styles.contactInfo}>
          {resume.phone} | {resume.email} | {resume.address}
        </p>
        <p>{resume.linkedin}</p>
      </header>

      {/* Summary Statement Section */}
      <section className={styles.summary}>
        <h2>SUMMARY STATEMENT</h2>
        {resume.summaryMode === "auto" ? (
          <p>{resume.profile_summary}</p>
        ) : resume.summaryMode === "list" ? (
          renderList(resume.profile_summary.split("\n"))
        ) : (
          <p>{resume.profile_summary}</p>
        )}
      </section>

      {/* Relevant Skills Section */}
      <section className={styles.skills}>
        <h2>RELEVANT SKILLS</h2>
        {resume.skillsMode === "list" ? renderList(resume.key_skills.split("\n")) : <p>{resume.key_skills}</p>}
      </section>

      {/* Work History Section */}
      <section className={styles.workHistory}>
        <h2>WORK HISTORY</h2>
        {resume.work_experience.map((job, idx) => (
          <div key={idx}>
            <h3>{job.jobTitle} ({job.dateRange})</h3>
            {job.experienceMode === "list" ? renderList(job.jobPoints.split("\n")) : <p>{job.jobPoints}</p>}
          </div>
        ))}
      </section>

      {/* Education Section */}
      <section className={styles.education}>
        <h2>EDUCATION</h2>
        {resume.educationMode === "list" ? renderList(resume.education.split("\n")) : <p>{resume.education}</p>}
      </section>

      {/* Certifications Section */}
      <section className={styles.certifications}>
        <h2>CERTIFICATIONS</h2>
        {resume.certificationsMode === "list" ? renderList(resume.certifications.split("\n")) : <p>{resume.certifications}</p>}
      </section>

      {/* Projects Section */}
      <section className={styles.projects}>
        <h2>PROJECTS</h2>
        {resume.projectsMode === "list" ? renderList(resume.projects.split("\n")) : <p>{resume.projects}</p>}
      </section>

      {/* Research Publications Section */}
      <section className={styles.researchPublications}>
        <h2>RESEARCH PUBLICATIONS</h2>
        {resume.researchMode === "list" ? renderList(resume.research_publications.split("\n")) : <p>{resume.research_publications}</p>}
      </section>

      {/* Awards Section */}
      <section className={styles.awards}>
        <h2>Awards</h2>
        {resume.awardsMode === "list" ? renderList(resume.awards.split("\n")) : <p>{resume.awards}</p>}
      </section>

      {/* Professional Membership Section */}
      <section className={styles.membership}>
        <h2>Professional Membership</h2>
        {resume.membershipMode === "list" ? renderList(resume.professional_membership.split("\n")) : <p>{resume.professional_membership}</p>}
      </section>

      {/* PDF Button */}
      <button
        className={styles.pdfButton}
        onClick={() => generatePDF(".templateContainer")}  // Trigger PDF generation
      >
        Download as PDF
      </button>
    </div>
  );
};

export default ResumePreview2;