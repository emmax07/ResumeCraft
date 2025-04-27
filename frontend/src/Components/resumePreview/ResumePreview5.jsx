//  ResumePreview5.jsx (Functional Resume)

import { useLocation } from "react-router-dom";
import ResumePDFGenerator from "./ResumePDFGenerator";
import "./ResumePreview5.css";
import Navbar from "../Navbar/Navbar";

const ResumePreview5 = () => {
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
      <div className="resume-functional-container">
        <h1 className="name">{resumeData.fullName || "Your Name"}</h1>
        <p className="title">{resumeData.professional_title || "Your Title"}</p>

        <div className="contact">
          <p>{resumeData.email} | {resumeData.phone}</p>
          <p>{resumeData.linkedin} | {resumeData.portfolio}</p>
          <p>{resumeData.address}</p>
        </div>

        {resumeData.key_skills && resumeData.key_skills.trim() !== "" && (
          <section>
            <h2>Key Skills</h2>
            {renderList(resumeData.key_skills.split(","))}
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

        {resumeData.work_experience && resumeData.work_experience.length > 0 && (
          <section>
            <h2>Experience</h2>
            {renderList(resumeData.work_experience)}
          </section>
        )}

        {resumeData.education && resumeData.education.length > 0 && (
          <section>
            <h2>Education</h2>
            {renderList(resumeData.education)}
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

      <button className="download-btn" onClick={() => generatePDF(".resume-functional-container")}>Download as PDF</button>
    </div>
  );
};

export default ResumePreview5;