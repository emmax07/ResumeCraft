// ✅ ResumePreview2.jsx (Classic Chronological Resume) - Updated Conditional Headings

import { useLocation } from "react-router-dom";
import ResumePDFGenerator from "./ResumePDFGenerator";
import "./ResumePreview2.css";
import Navbar from "../Navbar/Navbar";

const ResumePreview2 = () => {
  const location = useLocation();
  const resumeData = location.state?.resume || {};
  const { generatePDF } = ResumePDFGenerator();

  const createMarkup = (text) => {
    return { __html: text.replace(/\n/g, "<br/>") };
  };

  const renderList = (items) => (
    <ul>
      {items.map((item, index) => (
        <li key={index} dangerouslySetInnerHTML={createMarkup(item)}></li>
      ))}
    </ul>
  );

  return (
    <div>
      <Navbar />
      <div className="resume-preview-container">
        <h1 className="name">{resumeData.fullName || "Your Name"}</h1>
        <p className="title">{resumeData.professional_title || "Your Title"}</p>

        <p className="contact">
          {resumeData.email} | {resumeData.phone} | {resumeData.address}
        </p>
        <p className="contact">{resumeData.linkedin}</p>
        <p className="contact">{resumeData.portfolio}</p>

        {resumeData.profile_summary && (
          <section>
            <h2>Profile Summary</h2>
            <p dangerouslySetInnerHTML={createMarkup(resumeData.profile_summary)}></p>
          </section>
        )}

        {resumeData.key_skills && resumeData.key_skills.trim() !== "" && (
          <section>
            <h2>Key Skills</h2>
            {renderList(resumeData.key_skills.split(","))}
          </section>
        )}

        {resumeData.work_experience && resumeData.work_experience.length > 0 && (
          <section>
            <h2>Work Experience</h2>
            {renderList(resumeData.work_experience)}
          </section>
        )}

        {resumeData.education && resumeData.education.length > 0 && (
          <section>
            <h2>Education</h2>
            {renderList(resumeData.education)}
          </section>
        )}

        {resumeData.certifications && resumeData.certifications.length > 0 && (
          <section>
            <h2>Certifications</h2>
            {renderList(resumeData.certifications)}
          </section>
        )}

        {resumeData.projects && resumeData.projects.length > 0 && (
          <section>
            <h2>Projects</h2>
            {renderList(resumeData.projects)}
          </section>
        )}

        {resumeData.research_publications && resumeData.research_publications.length > 0 && (
          <section>
            <h2>Research Publications</h2>
            {renderList(resumeData.research_publications)}
          </section>
        )}

        {resumeData.awards && resumeData.awards.length > 0 && (
          <section>
            <h2>Awards</h2>
            {renderList(resumeData.awards)}
          </section>
        )}

        {resumeData.professional_membership && resumeData.professional_membership.length > 0 && (
          <section>
            <h2>Professional Memberships</h2>
            {renderList(resumeData.professional_membership)}
          </section>
        )}
      </div>

      <button className="download-btn" onClick={() => generatePDF(".resume-preview-container")}>Download as PDF</button>
    </div>
  );
};

export default ResumePreview2;