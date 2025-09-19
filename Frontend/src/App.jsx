import React, { useState, useEffect } from "react";
import {
  ChevronRight,
  ChevronsDown,
  Send,
  Download,
  Moon,
  Sun,
  Mail,
  Phone,
  MapPin,
  ExternalLink
} from "lucide-react";
import styles from "./App.module.css";
import profileImage from "/profile.jpg"; 

const topProjectsData = [
  {
    title: "AutoSight - Real-Time Indian Vehicle Classification and Detection",
    description: "Developed a real-time vehicle detection and classification system using YOLO and a Deep learning model",
    technologies: ["Yolo", "Mobilevit", "OpenCV", "Flask", "TensorFlow"],
    features: [
      "Two-stage deep learning pipeline boosting efficiency of model",
      "Lightweight YOLOv8n detector",
      "Fine-grained classification across 12 distinct vehicle classes",
      "Real-time multi-vehicle predictions in a single frame"
    ],
    github: "https://github.com/Sravan94-git/Indian-Vehicle-Detection-and-Classification",
  },
  {
    title: "FinanceShield – Loan Defaulter System",
    description: "Architected a pipeline for credit risk analysis that analyzes a dataset of 1,000,000 individuals to predict defaults and minimize institutional loss.",
    technologies: ["Scikit-learn", "PySpark", "Hadoop", "Python"],
    features: [
      "Predictive risk modeling",
      "Large dataset processing",
      "Institutional loss minimization"
    ],
    github: "https://github.com/Sravan94-git/Credit-Risk-Analysis",
  },
];

const otherProjectsData = [
  { 
  title: "CineSense",
  description: "An intelligent movie recommendation system that analyzes the sentiment of user reviews to generate more meaningful and accurate movie suggestions.",
  technologies: ["Python", "Flask", "Scikit-learn", "BeautifulSoup", "TMDB API"],
  github: "https://github.com/Sravan94-git/Movie-Recommendation-System"

  },
  { 
  
  title: "Early Alzheimers Stage Classification using Deep Learning",
  description: "A deep learning project to identify and categorize the early stages of Alzheimer's disease using medical imaging data.",
  technologies: ["Python", "TensorFlow", "Keras", "Scikit-learn", "Pandas"],
  github: "https://github.com/Sravan94-git/Alzheimers-disease-detection"

  },
  { 
    
  title: "Domain Classification of Legal Documents",
  description: "A machine learning project to automatically classify legal documents into their respective domains using NLP techniques.",
  technologies: ["Python", "Scikit-learn", "NLTK", "Pandas"],
  github: "https://github.com/Sravan94-git/Domain-classification-of-legal-documents"

  },
  { 
    title: "Real-Time Language Translator",
    description: "A web application that translates spoken or written language in real-time using web APIs.",
    technologies: ["JavaScript", "HTML5", "CSS3", "Web Speech API", "Translation API"],
    github: "https://github.com/Sravan94-git/Real-Time-Language-Translator" 
  },
  
];

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('darkMode');
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("");
  const [topProjects, setTopProjects] = useState([]);
  const [otherProjects, setOtherProjects] = useState([]);

  useEffect(() => {
    
    if (isDarkMode) {
      document.body.classList.add('dark');
      document.body.classList.remove('light');
    } else {
      document.body.classList.add('light');
      document.body.classList.remove('dark');
    }
    
    
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const topRes = await fetch("http://localhost:8080/api/projects/top");
        const topData = await topRes.json();
        setTopProjects(topData);

        const otherRes = await fetch("http://localhost:8080/api/projects/other");
        const otherData = await otherRes.json();
        setOtherProjects(otherData);
      } catch (err) {
        console.error("Backend not running, using fallback data:", err);
        setTopProjects(topProjectsData);
        setOtherProjects(otherProjectsData);
      }
    };
    fetchProjects();

    const handleScroll = () => setIsScrolled(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus("Sending...");
    try {
      const response = await fetch("http://localhost:8080/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setSubmissionStatus("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setSubmissionStatus("Failed to send message. Please try again.");
      }
    } catch (error) {
      console.error("An error occurred:", error);
      setSubmissionStatus("An error occurred. Please try again later.");
    } finally {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSubmissionStatus("");
  };

  return (
    <div
      className={`${styles.appContainer} ${
        isDarkMode ? styles.dark : styles.light
      }`}
    >
      {/* Navbar */}
      <nav className={styles.nav}>
        <div className={styles.navContainer}>
          <a
            href="#home"
            className={styles.navLogo}
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
          >
            Sravan's Portfolio
          </a>
          <div className={styles.navLinks}>
            {["home", "about", "projects", "contact"].map((section) => (
              <a
                key={section}
                href={`#${section}`}
                className={
                  activeSection === section
                    ? styles.navLinkActive
                    : styles.navLink
                }
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(section);
                }}
              >
                {section.toUpperCase()}
              </a>
            ))}
            <button onClick={toggleTheme} className={styles.themeToggle}>
              {isDarkMode ? <Sun size={22} /> : <Moon size={22} />}
            </button>
          </div>
        </div>
      </nav>

      <main>
        {/* Home Section */}
        <section id="home" className={`${styles.section} ${styles.homeSection}`}>
          <h1 className={styles.homeTitle}>Hello, I'm Sravan.</h1>
          <p className={styles.homeSubtitle}>
            I build intelligent systems that solve real-world data challenges.
          </p>
          <a
            href="/Sravan_Resume.pdf"
            download="Sravan_Resume.pdf"
            className={styles.button}
          >
            <Download size={18} />
            <span>Download Resume</span>
          </a>
          <div
            className={`${styles.scrollIconContainer} ${
              isScrolled ? styles.hidden : ""
            }`}
          >
            <ChevronsDown size={28} className={styles.scrollIcon} />
          </div>
        </section>

        {/* About Section */}
        <section id="about" className={`${styles.section} ${styles.aboutSection}`}>
          <div className={styles.aboutContainer}>
            <div className={styles.aboutText}>
              <h2 className={styles.sectionTitle}>About Me</h2>
              <p>
                As a Java Developer, specialized in AI/ML with expertise in building
                end-to-end solutions for computer vision, NLP, and recommendation
                engines. I'm passionate about solving real-world problems using
                emerging technologies and creating impactful digital experiences.
              </p>
            </div>
            <div className={styles.profileImage}>
              <img src={profileImage} alt="Sravan" />
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className={`${styles.section} ${styles.projectsSection}`}>
          <h2 className={styles.sectionTitle}>Latest Projects</h2>
          
          <div className={styles.topProjectsContainer}>
            {topProjects.map((project, index) => (
              <div key={index} className={styles.card}>
                <div className={styles.projectHeader}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                </div>
                <p className={styles.projectDescription}>{project.description}</p>
                
                <div className={styles.techStack}>
                  {project.technologies && project.technologies.map((tech, i) => (
                    <span key={i} className={styles.techPill}>{tech}</span>
                  ))}
                </div>
                
                <ul className={styles.featuresList}>
                  {project.features && project.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.projectLink}
                >
                  View on GitHub
                </a>
              </div>
            ))}
          </div>

          <h3 className={styles.subSectionTitle}>Other Projects</h3>
          <div className={styles.otherProjectsGrid}>
            {otherProjects.map((project, index) => (
              <a
                key={index}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.otherProjectCard}
              >
                <h4>{project.title}</h4>
                <p className={styles.projectDescSmall}>{project.description}</p>
                <div className={styles.techStackSmall}>
                  {project.technologies && project.technologies.map((tech, i) => (
                    <span key={i} className={styles.techPillSmall}>{tech}</span>
                  ))}
                </div>
                <ExternalLink size={18} className={styles.projectArrow} />
              </a>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className={`${styles.section} ${styles.contactSection}`}>
          <h2 className={styles.sectionTitle}>Ready to Collaborate?</h2>
          
          <div className={styles.contactContainer}>
            {/* Left - Contact Info */}
            <div className={styles.contactInfo}>
              <h3>Contact Me</h3>
              <p>
                Let's discuss how we can work together to bring your ideas to life. 
                I'm always open to new challenges and interesting collaborations.
              </p>
              <div className={styles.infoItem}>
                <Mail size={18} /> sravansunkara04@gmail.com
              </div>
              <div className={styles.infoItem}>
                <Phone size={18} /> +91 6281682082
              </div>
              <div className={styles.infoItem}>
                <MapPin size={18} /> Ongole, Andhra Pradesh, India
              </div>
            </div>

            {/* Right - Contact Form */}
            <div className={styles.contactForm}>
              <h3>Send a Message</h3>
              <form onSubmit={handleFormSubmit}>
                <div className={styles.formGroup}>
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={styles.formInput}
                    required
                  />
                </div>
                
                <div className={styles.formGroup}>
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    placeholder="Tell me about your project or just say hello..."
                    value={formData.message}
                    onChange={handleInputChange}
                    className={styles.formTextarea}
                    required
                  />
                </div>
                
                <button type="submit" className={styles.button}>
                  <span>Send Message</span>
                  <Send size={18} />
                </button>
              </form>
            </div>
          </div>
        </section>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>{submissionStatus.includes("success") ? "Success!" : "Oops!"}</h3>
            <p>{submissionStatus}</p>
            <button onClick={closeModal} className={styles.button}>
              Close
            </button>
          </div>
        </div>
      )}

      <footer className={styles.footer}>
        <p>© 2025 Sravan. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;