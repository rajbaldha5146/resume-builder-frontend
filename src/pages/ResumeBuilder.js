import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Add useParams
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import { backend_url } from '../server';
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

  // Function to get the selected template component
  const renderTemplate = () => {
    const props = { resume };

    switch (selectedTemplate) {
      case "template1":
        return <Template1 {...props} />;
      case "template2":
        return <Template2 {...props} />;
      default:
        return <MyDocument {...props} />;
    }
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
                console.log("Fetching resume with ID:", id); // Debugging log
                const res = await axios.get(`${backend_url}/api/resumes/${id}`, {
                    headers: {
                        "x-auth-token": localStorage.getItem("token"),
                    },
                });
                console.log("Resume data fetched:", res.data); // Debugging log
                setResume(res.data.sections); // Populate form with existing data
                setSelectedTemplate(res.data.templateId); // Set the template
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
      // Handle form submission (create or update resume)
      const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!resume || !resume.name || !resume.email) {
            console.error("Resume data is incomplete.");
            return;
        }
    
        try {
            const url = id ? `${backend_url}/api/resumes/${id}` : `${backend_url}/api/resumes`; // Use PUT for update, POST for create
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
    
            console.log("Resume saved:", res.data);
            navigate("/dashboard");
        } catch (err) {
            console.error("Error saving resume:", err.response?.data?.msg || err.message);
        }
    };
    

  const templateComponents = {
    template1: Template1,
    template2: Template2,
    template3: Template3,
    template4: Template4,
  };

  const getTemplateComponent = (templateName) => {
    return templateComponents[templateName];
  };

  const SelectedTemplate = getTemplateComponent();

  return (
    <div className="resume-builder-container">
      {/* Your existing header */}
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

        {/* Template selection */}
        <div className="template-selection">
          <h2>Select Template</h2>
          <div className="template-options">
            <button
              className={`template-button ${
                selectedTemplate === "template1" ? "active" : ""
              }`}
              onClick={() => setSelectedTemplate("template1")}
            >
              Professional Classic
            </button>
            <button
              className={`template-button ${
                selectedTemplate === "template2" ? "active" : ""
              }`}
              onClick={() => setSelectedTemplate("template2")}
            >
              Modern Clean
            </button>
            <button
              className={`template-button ${
                selectedTemplate === "template3" ? "active" : ""
              }`}
              onClick={() => setSelectedTemplate("template3")}
            >
              Modern Split
            </button>
            <button
              className={`template-button ${
                selectedTemplate === "template4" ? "active" : ""
              }`}
              onClick={() => setSelectedTemplate("template4")}
            >
              Executive Minimal
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="resume-form">
          {/* Existing form sections remain unchanged */}
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

        {/* PDF download with selected template */}
        {resume.name && ( // Only show download button when there's content
          <PDFDownloadLink
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
        <p>&copy; 2023 ResumeGenius. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default ResumeBuilder;
