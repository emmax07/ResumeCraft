import { useLocation } from "react-router-dom";
import ResumePDFGenerator from "./ResumePDFGenerator";
import "./ResumePreview.css";
import Navbar from "../Navbar/Navbar";

const ResumePreview3 = () => {
  const location = useLocation();
  const resumeData = location.state?.resume || {};

  const { generatePDF } = ResumePDFGenerator();

  return (
    <div>
      <Navbar />
      <div className="resume-view-container">
        <h1>{resumeData.fullName || "N/A"}</h1>
        <p>
          <strong>Address:</strong> {resumeData.address || "N/A"}
        </p>
        <p>
          {resumeData.email || "N/A"}, {resumeData.phone || "N/A"},{" "}
          {resumeData.linkedin || "N/A"}
        </p>
        <p>
          <strong>Profile Summary:</strong> {resumeData.profileSummary || "N/A"}
        </p>
        <p>
          <strong>Key Skills:</strong> {resumeData.key_skills || "N/A"}
        </p>

        {/* Sections Rendering */}
        {resumeData.work_experience?.length > 0 && (
          <div className="content-container">
            <strong>Work Experience:</strong>
            {resumeData.work_experience.map((experience, index) => (
              <p className="new_para" key={index}>
                {experience}
              </p>
            ))}
          </div>
        )}

        {resumeData.education?.length > 0 && (
          <div className="content-container">
            <strong>Education:</strong>
            {resumeData.education.map((education, index) => (
              <p className="new_para" key={index}>
                {education}
              </p>
            ))}
          </div>
        )}

        {resumeData.certifications?.length > 0 && (
          <div className="content-container">
            <strong>Certifications:</strong>
            {resumeData.certifications.map((certification, index) => (
              <p className="new_para" key={index}>
                {certification}
              </p>
            ))}
          </div>
        )}

        {resumeData.projects?.length > 0 && (
          <div className="content-container">
            <strong>Projects:</strong>
            {resumeData.projects.map((project, index) => (
              <p className="new_para" key={index}>
                {project}
              </p>
            ))}
          </div>
        )}

        {resumeData.research_publications?.length > 0 && (
          <div className="content-container">
            <strong>Research Publications:</strong>
            {resumeData.research_publications.map((publication, index) => (
              <p className="new_para" key={index}>
                {publication}
              </p>
            ))}
          </div>
        )}

        {resumeData.awards?.length > 0 && (
          <div className="content-container">
            <strong>Awards:</strong>
            {resumeData.awards.map((award, index) => (
              <p className="new_para" key={index}>
                {award}
              </p>
            ))}
          </div>
        )}

        {resumeData.professional_membership?.length > 0 && (
          <div className="content-container">
            <strong>Professional Membership:</strong>
            {resumeData.professional_membership.map((membership, index) => (
              <p className="new_para" key={index}>
                {membership}
              </p>
            ))}
          </div>
        )}
      </div>
      <button onClick={() => generatePDF(".resume-view-container")}>
        Download as PDF
      </button>
    </div>
  );
};

export default ResumePreview3;
