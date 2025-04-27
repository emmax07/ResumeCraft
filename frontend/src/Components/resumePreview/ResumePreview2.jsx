// ✅ ResumePreview2.jsx (Rebuilt for Professional Look)

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
        <div className="header-section">
          <h1>{resumeData.fullName || "Your Name"}</h1>
          <p>{resumeData.phone} | {resumeData.email} | {resumeData.address}</p>
        </div>

        {resumeData.profile_summary && (
          <section>
            <div className="section-title">EXECUTIVE SUMMARY</div>
            <p className="text-justify" dangerouslySetInnerHTML={createMarkup(resumeData.profile_summary)}></p>
          </section>
        )}

        {resumeData.key_skills && resumeData.key_skills.trim() !== "" && (
          <section>
            <div className="section-title">KEY SKILLS</div>
            {renderList(resumeData.key_skills.split(","))}
          </section>
        )}

        {resumeData.work_experience && resumeData.work_experience.length > 0 && (
          <section>
            <div className="section-title">EXPERIENCE</div>
            {renderList(resumeData.work_experience)}
          </section>
        )}

        {(resumeData.certifications?.length > 0 || resumeData.projects?.length > 0) && (
          <section>
            <div className="section-title">MISC INFORMATION</div>
            {renderList(resumeData.certifications || [])}
            {renderList(resumeData.projects || [])}
          </section>
        )}
      </div>

      <button className="download-btn" onClick={() => generatePDF(".resume-preview-container")}>Download as PDF</button>
    </div>
  );
};

export default ResumePreview2;
