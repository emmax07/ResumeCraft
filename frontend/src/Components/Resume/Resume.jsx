import { useState } from "react";
<<<<<<< HEAD
import { useNavigate, useParams } from "react-router-dom";
import ResumeFormHandler from "./ResumeFormHandler";
import "./Resume.css";
import Navbar from "../Navbar/Navbar";

const Resume = () => {
  const { id } = useParams();
  const navigate = useNavigate();

=======
import { useNavigate } from "react-router-dom";
import ResumeFormHandler from "./ResumeFormHandler";
import Navbar from "../Navbar/Navbar";
import PropTypes from "prop-types";
import "./Resume.css";

const Resume = ({ title, navigateTo }) => {
  // Accept the title and navigateTo prop
  const navigate = useNavigate();
>>>>>>> main
  const {
    formData,
    handleChange,
    handleArrayChange,
    handleAddArrayItem,
    handleRemoveArrayItem,
  } = ResumeFormHandler();

  const [error, setError] = useState("");
<<<<<<< HEAD
  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");
    navigate("/resume_preview3", { state: { resume: formData } });
=======

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.fullName || !formData.email) {
      setError("Full Name and Email are required!");
      return;
    }

    setError("");

    // Use the navigateTo prop to navigate to the correct route
    navigate(navigateTo, { state: { resume: formData } });
>>>>>>> main
  };

  return (
    <div>
      <Navbar />
      <div className="main-container">
        <div className="resume-container">
<<<<<<< HEAD
          <h1>Resume Template {id}</h1>
=======
          <h1>{title}</h1>
>>>>>>> main
          {error && <p className="error">{error}</p>}

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />
            <input
              type="text"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
            />
            <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn"
              value={formData.linkedin}
              onChange={handleChange}
            />
            <textarea
              name="profile_summary"
              placeholder="Profile Summary"
              value={formData.profile_summary}
              onChange={handleChange}
            />
            <textarea
              name="key_skills"
              placeholder="Key Skills"
              value={formData.key_skills}
              onChange={handleChange}
            />

            {/* Work Experience */}
            <div>
              {formData.work_experience.length > 0 && <h3>Work Experience</h3>}{" "}
              {/* Conditionally render <h3> */}
              {formData.work_experience.map((experience, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`workExperience-${index}`}
                      value={experience}
                      onChange={(e) =>
                        handleArrayChange(e, index, "work_experience")
                      }
                      placeholder={`Work Experience ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveArrayItem(index, "work_experience")
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("work_experience")}
              >
                Add Work Experience
              </button>
            </div>

            {/* Education */}
            <div>
              {formData.education.length > 0 && <h3>Education</h3>}{" "}
              {formData.education.map((education, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`Education-${index}`}
                      value={education}
                      onChange={(e) => handleArrayChange(e, index, "education")}
                      placeholder={`Education ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(index, "education")}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("education")}
              >
                Add Education
              </button>
            </div>

            {/* Certifications */}
            <div>
              {formData.certifications.length > 0 && <h3>Certifications</h3>}{" "}
              {formData.certifications.map((certifications, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`Certifications-${index}`}
                      value={certifications}
                      onChange={(e) =>
                        handleArrayChange(e, index, "certifications")
                      }
                      placeholder={`Certifications ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveArrayItem(index, "certifications")
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("certifications")}
              >
                Add Certifications
              </button>
            </div>

            {/* Projects */}
            <div>
              {formData.projects.length > 0 && <h3>Projects</h3>}{" "}
              {formData.projects.map((projects, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`Projects-${index}`}
                      value={projects}
                      onChange={(e) => handleArrayChange(e, index, "projects")}
                      placeholder={`Projects ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(index, "projects")}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("projects")}
              >
                Add Projects
              </button>
            </div>

            {/* Research_Publications */}
            <div>
              {formData.research_publications.length > 0 && (
                <h3>Research Publications</h3>
              )}{" "}
              {formData.research_publications.map((publications, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`Research Publications-${index}`}
                      value={publications}
                      onChange={(e) =>
                        handleArrayChange(e, index, "research_publications")
                      }
                      placeholder={`Research Publications ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveArrayItem(index, "research_publications")
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("research_publications")}
              >
                Add Research Publications
              </button>
            </div>

            {/* Awards */}
            <div>
              {formData.awards.length > 0 && <h3>Awards</h3>}{" "}
              {formData.awards.map((awards, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`Awards-${index}`}
                      value={awards}
                      onChange={(e) => handleArrayChange(e, index, "awards")}
                      placeholder={`Awards ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() => handleRemoveArrayItem(index, "awards")}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("awards")}
              >
                Add Awards
              </button>
            </div>

            {/* Professional Membership */}
            <div>
              {formData.professional_membership.length > 0 && (
                <h3>Professional Membership</h3>
              )}{" "}
              {formData.professional_membership.map((membership, index) => (
                <div key={index}>
                  <p>
                    <textarea
                      className="data-input"
                      name={`Professional Membership-${index}`}
                      value={membership}
                      onChange={(e) =>
                        handleArrayChange(e, index, "professional_membership")
                      }
                      placeholder={`Professional Membership ${index + 1}`}
                    />
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      handleRemoveArrayItem(index, "professional_membership")
                    }
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddArrayItem("professional_membership")}
              >
                Add Professional Membership
              </button>
            </div>

            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

<<<<<<< HEAD
=======
// Prop validation using PropTypes
Resume.propTypes = {
  title: PropTypes.string.isRequired,
  navigateTo: PropTypes.string.isRequired,
};

>>>>>>> main
export default Resume;
