import React from "react";
import SkillsAddByCategory from "./skills/SkillsAddByCategory";
import { useSkillsContext } from "../../context/SkillsAddingContext";
import { useAuthUser } from "../../context/AuthContext";
import { useUserCV } from "../../context/UserCVContext";
import toastShow from "../../utils/toastShow";

const Skills = () => {
  const { user } = useAuthUser();
  const { skills } = useSkillsContext();
  const { userCV, setUserCV } = useUserCV();

  const frontendSkillNames = [
    "HTML",
    "CSS",
    "JavaScript",
    "TypeScript", // Increasingly popular
    "React.js",
    "Next.js",
    "Vue.js", // Popular alternative to React/Angular
    "Angular", // Another major framework
    "Svelte", // Emerging popular framework
    "jQuery", // Still widely used in many projects
    "Tailwind CSS",
    "Bootstrap", // Corrected spelling from 'Boostrap'
    "Sass/SCSS", // CSS preprocessor
    "Less", // Another CSS preprocessor
    "Webpack", // Module bundler
    "Vite", // Fast build tool
  ];

  const backendSkillNames = [
    "Node.js",
    "Express.js",
    "NestJS", // Popular Node.js framework
    "Koa.js", // Lightweight Node.js framework
    "PHP",
    "Laravel",
    "Python",
    "Django",
    "Flask", // Python micro-framework
    "Ruby on Rails", // Ruby framework
    "Java (Spring Boot)", // Popular Java framework
    "Go (Gin, Echo)", // Popular for high-performance APIs
    "C# (.NET)", // Microsoft's framework
    "GraphQL", // API query language
  ];

  const uIuXNames = [
    "Figma",
    "Adobe XD", // Corrected spacing
    "Canva",
    "Sketch", // Popular for macOS users
    "Adobe Photoshop", // For image manipulation in design
    "Adobe Illustrator", // For vector graphics in design
  ];

  const databaseNames = [
    "MongoDB",
    "MySQL",
    "PostgreSQL",
    "Redis", // In-memory data structure store, often used as a cache/message broker
    "Cassandra", // NoSQL database for large-scale data
    "Firebase Firestore", // Google's NoSQL cloud database
    "AWS DynamoDB", // Amazon's NoSQL cloud database
    "SQL Server", // Microsoft's relational database
  ];

  const toolsAndTechnologiesNames = [
    "Postman",
    "Git & GitHub",
    "GitLab", // Alternative to GitHub
    "Bitbucket", // Another Git repository hosting service
    "Docker",
    "Kubernetes", // Container orchestration
    "OpenAI API", // For integrating AI
    "VS Code", // Common IDE
    "npm", // Node package manager
    "Yarn", // Alternative package manager
    "Jenkins", // CI/CD tool
    "GitHub Actions", // CI/CD integrated with GitHub
    "GitLab CI/CD", // CI/CD integrated with GitLab
    "AWS (Amazon Web Services)", // Cloud platform
    "Google Cloud Platform (GCP)", // Cloud platform
    "Microsoft Azure", // Cloud platform
    "Jira", // Project management tool
    "Confluence", // Documentation tool
    "Slack", // Communication tool
    "Zoom", // Video conferencing
    "Jest", // JavaScript testing framework
    "React Testing Library", // React component testing
    "Cypress", // End-to-end testing
  ];

  const softSkillName = [
    "Communication",
    "Problem-Solving",
    "Teamwork & Collaboration",
    "Adaptability",
    "Time Management",
    "Critical Thinking",
    "Attention to Detail",
    "Creativity",
    "Leadership",
    "Presentation Skills",
    "MS Office (Word, Excel, PowerPoint)", // Clarified MS Office
    "Video Editing", // Corrected spelling
    "2D Animation",
    "Photo Editing",
  ];

  // Function for storing skills in db
  const submitData = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/updateUserSkills`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          cvId: userCV._id,
          skills,
        }),
      });
      const data = await response.json();
      if (response.ok) {
        toastShow(data.message, "success");
        setUserCV(data.updatedCV);
      } else {
        alert("Skill update failed: " + data.message);
      }
    } catch (error) {
      console.log("Error submitting skills:", error);
      toastShow("Skill update failed due to network error");
    }
  };

  return (
    <div className="p-4 h-full min-w-full ">
      <div className="text-2xl text-[#213448] font-bold ">
        <i className="fas fa-tools mr-2"></i>Add Your Skill Set
      </div>
      <SkillsAddByCategory category="Frontend" values={frontendSkillNames} />
      <SkillsAddByCategory category="Backend" values={backendSkillNames} />
      <SkillsAddByCategory category="UI/UX" values={uIuXNames} />
      <SkillsAddByCategory category="Database" values={databaseNames} />
      <SkillsAddByCategory
        category="ToolsAndTechnology"
        values={toolsAndTechnologiesNames}
      />
      <SkillsAddByCategory category="SoftSkills" values={softSkillName} />
      <button
        className="h-12 w-[200px] mt-8 text-white bg-gray-600 hover:bg-gray-700 border border-gray-400 rounded-md p-2 text-xl block"
        onClick={submitData}
      >
        Update
      </button>
    </div>
  );
};

export default Skills;
