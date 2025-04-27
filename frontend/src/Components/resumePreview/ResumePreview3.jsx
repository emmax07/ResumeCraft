import { useLocation } from "react-router-dom";
import ResumePDFGenerator from "./ResumePDFGenerator";
import "./ResumePreview3.css";
import Navbar from "../Navbar/Navbar";

const ResumePreview3 = () => {
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
      <div className="resume-minimal-container">
        <h1 className="name">{resumeData.fullName || "Your Name"}</h1>
        <p className="title">{resumeData.professional_title || "Your Title"}</p>

        <p className="contact">
          {resumeData.email} | {resumeData.phone}
        </p>
        <p className="contact">
          {resumeData.linkedin} | {resumeData.portfolio}
        </p>

        {resumeData.profile_summary && (
          <section>
            <h2>Summary</h2>
            <p dangerouslySetInnerHTML={createMarkup(resumeData.profile_summary)}></p>
          </section>
        )}

        {resumeData.key_skills && resumeData.key_skills.trim() !== "" && (
          <section>
            <h2>Skills</h2>
            {renderList(resumeData.key_skills.split(","))}
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

        {(resumeData.certifications?.length > 0 || resumeData.projects?.length > 0) && (
          <section>
            <h2>Certifications & Projects</h2>
            {renderList(resumeData.certifications || [])}
            {renderList(resumeData.projects || [])}
          </section>
        )}

        {(resumeData.research_publications?.length > 0 || resumeData.awards?.length > 0) && (
          <section>
            <h2>Publications & Awards</h2>
            {renderList(resumeData.research_publications || [])}
            {renderList(resumeData.awards || [])}
          </section>
        )}

        {resumeData.professional_membership && resumeData.professional_membership.length > 0 && (
          <section>
            <h2>Memberships</h2>
            {renderList(resumeData.professional_membership)}
          </section>
        )}
      </div>

      <button className="download-btn" onClick={() => generatePDF(".resume-minimal-container")}>Download as PDF</button>
    </div>
  );
};

export default ResumePreview3;