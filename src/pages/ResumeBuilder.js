import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { backend_url } from "../server";
import { PDFDownloadLink } from "@react-pdf/renderer";
import MyDocument from "../components/MyDocument";
import Template1 from "../components/Template1";
import Template2 from "../components/Template2";
import Template3 from "../components/Template3";
import Template4 from "../components/Template4";
import "./ResumeBuilder.css";

const ResumeBuilder = () => {
  const { user } = useAuth();
  const { id } = useParams();
  const navigate = useNavigate();

  // Add template selection state
  const [selectedTemplate, setSelectedTemplate] = useState("template1");
  const [pdfKey, setPdfKey] = useState(0); // Add this for PDF refresh

  // State for resume data
  const [resume, setResume] = useState({
    name: "",
    email: "",
    phone: "",
    summary: "",
    skills: [],
    experience: [],
    education: [],
  });

  // State for AI feedback
  const [aiFeedback, setAiFeedback] = useState("");
  const [loadingFeedback, setLoadingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState("");

    // Function to get the selected template component with error handling
    const renderTemplate = () => {
      try {
        const props = {
          resume: {
            ...resume,
            skills: Array.isArray(resume.skills) ? resume.skills : [],
            experience: Array.isArray(resume.experience) ? resume.experience : [],
            education: Array.isArray(resume.education) ? resume.education : [],
          }
        };
    
        const templates = {
          template1: Template1,
          template2: Template2,
          template3: Template3,
          template4: Template4,
          default: MyDocument
        };
    
        const SelectedTemplate = templates[selectedTemplate] || templates.default;
        return <SelectedTemplate {...props} />;
      } catch (error) {
        console.error("Error rendering template:", error);
        return <Template1 resume={resume} />;
      }
    };
    

     // Handle template change
  const handleTemplateChange = (newTemplate) => {
    setSelectedTemplate(newTemplate);
    setPdfKey(prevKey => prevKey + 1); // Force PDF refresh
  };

  // Fetch AI feedback when summary changes
  useEffect(() => {
    if (resume.summary.trim()) {
      setLoadingFeedback(true);
      setFeedbackError("");
      getAIFeedback(resume.summary);
    } else {
      setAiFeedback("");
    }
  }, [resume.summary]);

  // Fetch resume data if editing
  useEffect(() => {
    if (id) {
      const fetchResume = async () => {
        try {
          // console.log("Fetching resume with ID:", id);
          const res = await axios.get(`${backend_url}/api/resumes/${id}`, {
            headers: {
              "x-auth-token": localStorage.getItem("token"),
            },
          });
          // console.log("Resume data fetched:", res.data);
          setResume(res.data.sections);
          setSelectedTemplate(res.data.templateId);
        } catch (err) {
          console.error(
            "Error fetching resume:",
            err.response?.data || err.message
          );
        }
      };
      fetchResume();
    }
  }, [id]);

  // Function to get AI feedback
  const getAIFeedback = async (content) => {
    try {
      const res = await axios.post(
        `${backend_url}/api/ai/feedback`,
        { content },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      setAiFeedback(res.data.feedback);
    } catch (err) {
      console.error("Error fetching AI feedback:", err);
      setFeedbackError("Failed to fetch AI feedback. Please try again later.");
    } finally {
      setLoadingFeedback(false);
    }
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResume({ ...resume, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!resume || !resume.name || !resume.email) {
      console.error("Resume data is incomplete.");
      return;
    }

    try {
      const url = id
        ? `${backend_url}/api/resumes/${id}`
        : `${backend_url}/api/resumes`;
      const method = id ? "put" : "post";

      const res = await axios({
        method: method,
        url: url,
        data: {
          templateId: selectedTemplate,
          sections: resume,
        },
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "Content-Type": "application/json",
        },
      });

      // console.log("Resume saved:", res.data);
      navigate("/dashboard");
    } catch (err) {
      console.error(
        "Error saving resume:",
        err.response?.data?.msg || err.message
      );
    }
  };

  // Function to remove experience
  const handleRemoveExperience = (indexToRemove) => {
    setResume(prevResume => ({
      ...prevResume,
      experience: prevResume.experience.filter((_, index) => index !== indexToRemove),
    }));
    setPdfKey(prevKey => prevKey + 1); // Force re-render of PDF
  };
  

  // Function to remove education
  const handleRemoveEducation = (indexToRemove) => {
    setResume(prevResume => ({
      ...prevResume,
      education: prevResume.education.filter((_, index) => index !== indexToRemove),
    }));
    setPdfKey(prevKey => prevKey + 1); // Force re-render of PDF
  };
  

  return (
    <div className="resume-builder-container">
      <header className="header">
        <div className="logo">ResumeGenius</div>
        <nav className="nav">
          <button onClick={() => navigate("/dashboard")} className="nav-button">
            Dashboard
          </button>
          <button onClick={() => navigate("/logout")} className="nav-button">
            Logout
          </button>
        </nav>
      </header>

      <main className="main-content">
        <h1 className="main-title">Resume Builder</h1>

        <div className="template-selection">
          <h2>Select Template</h2>
          <div className="template-options">
            <button
              className={`template-button ${
                selectedTemplate === "template1" ? "active" : ""
              }`}
              onClick={() => handleTemplateChange("template1")}
            >
              Professional Classic
            </button>
            <button
              className={`template-button ${
                selectedTemplate === "template2" ? "active" : ""
              }`}
              onClick={() => handleTemplateChange("template2")}
            >
              Modern Clean
            </button>
            <button
              className={`template-button ${
                selectedTemplate === "template3" ? "active" : ""
              }`}
              onClick={() => handleTemplateChange("template3")}
            >
              Modern Split
            </button>
            <button
              className={`template-button ${
                selectedTemplate === "template4" ? "active" : ""
              }`}
              onClick={() => handleTemplateChange("template4")}
            >
              Executive Minimal
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="resume-form">
          <div className="form-section">
            <h2>Personal Information</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={resume.name}
              onChange={handleInputChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={resume.email}
              onChange={handleInputChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={resume.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-section">
            <h2>Summary</h2>
            <textarea
              name="summary"
              placeholder="Write a brief summary about yourself..."
              value={resume.summary}
              onChange={handleInputChange}
              required
            />
            <div className="ai-feedback">
              <h3>AI Feedback</h3>
              {loadingFeedback ? (
                <p>Loading feedback...</p>
              ) : feedbackError ? (
                <p className="error">{feedbackError}</p>
              ) : (
                <p>{aiFeedback}</p>
              )}
            </div>
          </div>

          <div className="form-section">
            <h2>Skills</h2>
            <input
              type="text"
              name="skills"
              placeholder="Add skills (comma separated)"
              value={resume.skills.join(", ")}
              onChange={(e) => {
                const skills = e.target.value
                  .split(",")
                  .map((skill) => skill.trim());
                setResume({ ...resume, skills });
              }}
              required
            />
          </div>

          <div className="form-section">
            <h2>Work Experience</h2>
            {resume.experience.map((exp, index) => (
              <div key={index} className="experience-item">
                <div className="experience-header">
                  <button
                    type="button"
                    onClick={() => handleRemoveExperience(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    placeholder="Job Title"
                    value={exp.title}
                    onChange={(e) => {
                      const updatedExperience = [...resume.experience];
                      updatedExperience[index].title = e.target.value;
                      setResume({ ...resume, experience: updatedExperience });
                    }}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => {
                    const updatedExperience = [...resume.experience];
                    updatedExperience[index].company = e.target.value;
                    setResume({ ...resume, experience: updatedExperience });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={exp.duration}
                  onChange={(e) => {
                    const updatedExperience = [...resume.experience];
                    updatedExperience[index].duration = e.target.value;
                    setResume({ ...resume, experience: updatedExperience });
                  }}
                  required
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => {
                    const updatedExperience = [...resume.experience];
                    updatedExperience[index].description = e.target.value;
                    setResume({ ...resume, experience: updatedExperience });
                  }}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setResume({
                  ...resume,
                  experience: [
                    ...resume.experience,
                    { title: "", company: "", duration: "", description: "" },
                  ],
                });
              }}
              className="add-button"
            >
              Add Experience
            </button>
          </div>

          <div className="form-section">
            <h2>Education</h2>
            {resume.education.map((edu, index) => (
              <div key={index} className="education-item">
                <div className="education-header">
                  <button
                    type="button"
                    onClick={() => handleRemoveEducation(index)}
                    className="remove-button"
                  >
                    Remove
                  </button>
                  <input
                    type="text"
                    placeholder="Degree"
                    value={edu.degree}
                    onChange={(e) => {
                      const updatedEducation = [...resume.education];
                      updatedEducation[index].degree = e.target.value;
                      setResume({ ...resume, education: updatedEducation });
                    }}
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => {
                    const updatedEducation = [...resume.education];
                    updatedEducation[index].institution = e.target.value;
                    setResume({ ...resume, education: updatedEducation });
                  }}
                  required
                />
                <input
                  type="text"
                  placeholder="Duration"
                  value={edu.duration}
                  onChange={(e) => {
                    const updatedEducation = [...resume.education];
                    updatedEducation[index].duration = e.target.value;
                    setResume({ ...resume, education: updatedEducation });
                  }}
                  required
                />
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                setResume({
                  ...resume,
                  education: [
                    ...resume.education,
                    { degree: "", institution: "", duration: "" },
                  ],
                });
              }}
              className="add-button"
            >
              Add Education
            </button>
          </div>

          <button type="submit" className="submit-button">
            Save Resume
          </button>
        </form>

       {/* Update the PDF download section */}
        {resume.name && (
          <PDFDownloadLink
            key={pdfKey} // Add this key prop
            document={renderTemplate()}
            fileName="resume.pdf"
            className="pdf-button"
          >
            {({ blob, url, loading, error }) =>
              loading ? "Generating PDF..." : "Download PDF"
            }
          </PDFDownloadLink>
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2025 ResumeGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ResumeBuilder;
