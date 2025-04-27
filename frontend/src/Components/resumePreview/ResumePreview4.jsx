// ResumePreview4.jsx (Creative Infographic Resume)

import { useLocation } from "react-router-dom";
import ResumePDFGenerator from "./ResumePDFGenerator";
import "./ResumePreview4.css";
import Navbar from "../Navbar/Navbar";

const ResumePreview4 = () => {
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
      <div className="resume-creative-container">
        <header className="header">
          <h1>{resumeData.fullName || "Your Name"}</h1>
          <h2>{resumeData.professional_title || "Your Title"}</h2>
          <p>{resumeData.email} | {resumeData.phone} | {resumeData.linkedin}</p>
          <p>{resumeData.portfolio}</p>
        </header>

        <div className="sections">
          {resumeData.profile_summary && (
            <section>
              <h3>Summary</h3>
              <p dangerouslySetInnerHTML={createMarkup(resumeData.profile_summary)}></p>
            </section>
          )}

          {resumeData.key_skills && resumeData.key_skills.trim() !== "" && (
            <section>
              <h3>Skills</h3>
              {renderList(resumeData.key_skills.split(","))}
            </section>
          )}

          {resumeData.work_experience && resumeData.work_experience.length > 0 && (
            <section>
              <h3>Experience</h3>
              {renderList(resumeData.work_experience)}
            </section>
          )}

          {resumeData.education && resumeData.education.length > 0 && (
            <section>
              <h3>Education</h3>
              {renderList(resumeData.education)}
            </section>
          )}

          {(resumeData.certifications?.length > 0 || resumeData.projects?.length > 0) && (
            <section>
              <h3>Certifications & Projects</h3>
              {renderList(resumeData.certifications || [])}
              {renderList(resumeData.projects || [])}
            </section>
          )}

          {(resumeData.research_publications?.length > 0 || resumeData.awards?.length > 0) && (
            <section>
              <h3>Publications & Awards</h3>
              {renderList(resumeData.research_publications || [])}
              {renderList(resumeData.awards || [])}
            </section>
          )}

          {resumeData.professional_membership && resumeData.professional_membership.length > 0 && (
            <section>
              <h3>Memberships</h3>
              {renderList(resumeData.professional_membership)}
            </section>
          )}
        </div>
      </div>

      <button className="download-btn" onClick={() => generatePDF(".resume-creative-container")}>Download as PDF</button>
    </div>
  );
};

export default ResumePreview4;
