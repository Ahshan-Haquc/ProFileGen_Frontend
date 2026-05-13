import React, { useEffect } from "react";
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
import toastShow from "@/utils/toastShow";
import { useUpdateUserSkillsMutation } from "@/redux/features/skills/skillsApi";
import { useSkillsContext } from "@/redux/hooks";
import SkillsAddByCategory from "@/components/dashboard/skills/SkillsAddByCategory";
import { 
  Wrench, 
  Code2, 
  Database, 
  Cpu, 
  Palette, 
  Layers, 
  Lightbulb, 
  Save,
  Loader2,
  Sparkles
} from "lucide-react";

const Skills = () => {
  const { user } = useAuthUser();
  const { skills, setSkills } = useSkillsContext();
  const { userCV, setUserCV } = useUserCV();
  const [updateUserSkills, { isLoading }] = useUpdateUserSkillsMutation();

  const getCvId = () => {
    if (userCV?._id) {
      return userCV._id;
    }

    if (typeof window !== "undefined") {
      try {
        const saved = localStorage.getItem("userCV");
        if (saved) {
          const parsed = JSON.parse(saved);
          return parsed?._id || "";
        }
      } catch (err) {
        console.error("Failed to parse stored userCV", err);
      }
    }

    return "";
  };

  useEffect(() => {
    if (Object.keys(skills || {}).length === 0 && Object.keys(userCV?.skills || {}).length > 0) {
      setSkills(userCV.skills);
    }
  }, [skills, setSkills, userCV?.skills]);

  const submitData = async () => {
    const cvId = getCvId();
    if (!cvId) {
      toastShow("Unable to save skills: CV id is missing.", "error");
      return;
    }

    try {
      const data = await updateUserSkills({
        cvId,
        skills,
      }).unwrap();
      toastShow(data.message, "success");
      setUserCV(data.updatedCV);
    } catch (error) {
      console.log("Error submitting skills:", error);
      toastShow("Skill update failed due to network error", "error");
    }
  };

  // Data arrays (Keep your existing arrays here - omitted for brevity)
  const frontendSkillNames = ["HTML", "CSS", "JavaScript", "TypeScript", "React.js", "Next.js", "Vue.js", "Angular", "Svelte", "jQuery", "Tailwind CSS", "Bootstrap", "Sass/SCSS", "Less", "Webpack", "Vite"];
  const backendSkillNames = ["Node.js", "Express.js", "NestJS", "Koa.js", "PHP", "Laravel", "Python", "Django", "Flask", "Ruby on Rails", "Java (Spring Boot)", "Go (Gin, Echo)", "C# (.NET)", "GraphQL"];
  const uIuXNames = ["Figma", "Adobe XD", "Canva", "Sketch", "Adobe Photoshop", "Adobe Illustrator"];
  const databaseNames = ["MongoDB", "MySQL", "PostgreSQL", "Redis", "Cassandra", "Firebase Firestore", "AWS DynamoDB", "SQL Server"];
  const toolsAndTechnologiesNames = ["Postman", "Git & GitHub", "GitLab", "Bitbucket", "Docker", "Kubernetes", "OpenAI API", "VS Code", "npm", "Yarn", "Jenkins", "GitHub Actions", "GitLab CI/CD", "AWS (Amazon Web Services)", "Google Cloud Platform (GCP)", "Microsoft Azure", "Jira", "Confluence", "Slack", "Zoom", "Jest", "React Testing Library", "Cypress"];
  const softSkillName = ["Communication", "Problem-Solving", "Teamwork & Collaboration", "Adaptability", "Time Management", "Critical Thinking", "Attention to Detail", "Creativity", "Leadership", "Presentation Skills", "MS Office (Word, Excel, PowerPoint)", "Video Editing", "2D Animation", "Photo Editing"];

  const categories = [
    { title: "Frontend", icon: <Code2 size={20} />, data: frontendSkillNames, key: "Frontend" },
    { title: "Backend", icon: <Layers size={20} />, data: backendSkillNames, key: "Backend" },
    { title: "UI/UX", icon: <Palette size={20} />, data: uIuXNames, key: "UIUX" },
    { title: "Database", icon: <Database size={20} />, data: databaseNames, key: "Database" },
    { title: "Tools & Tech", icon: <Cpu size={20} />, data: toolsAndTechnologiesNames, key: "ToolsAndTechnology" },
    { title: "Soft Skills", icon: <Lightbulb size={20} />, data: softSkillName, key: "SoftSkills" },
  ];

  return (
    <div className="p-6 h-full max-w-6xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-[#210F37]/5 rounded-2xl">
            <Wrench className="text-[#210F37]" size={32} />
          </div>
          <div>
            <h2 className="text-3xl font-black text-[#210F37] tracking-tight">
              Skill Set
            </h2>
            <p className="text-gray-500 text-sm flex items-center gap-1">
              Select your expertise to boost your profile strength <Sparkles size={14} className="text-[#ff8757]" />
            </p>
          </div>
        </div>

        <button
          className={`h-14 px-8 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg shadow-[#210F37]/10 ${
            isLoading 
            ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
            : "bg-[#210F37] hover:bg-[#ff8757] text-white"
          }`}
          onClick={submitData}
          disabled={isLoading}
        >
          {isLoading ? <Loader2 className="animate-spin" /> : <Save size={20} />}
          {isLoading ? "Saving..." : "Update Skills"}
        </button>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {categories.map((cat, index) => (
          <div 
            key={index} 
            className="bg-white rounded-[2rem] border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-6 border-b border-gray-50 pb-4">
              <span className="text-[#ff8757]">{cat.icon}</span>
              <h3 className="text-xl font-black text-[#210F37]">{cat.title}</h3>
            </div>
            
            <div className="min-h-[100px]">
              <SkillsAddByCategory 
                category={cat.key}
                label={cat.title}
                values={cat.data} 
              />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Action for Mobile */}
      <div className="mt-12 flex justify-center lg:hidden">
        <button
          className="h-14 w-full bg-[#210F37] text-white rounded-2xl font-bold text-lg shadow-xl"
          onClick={submitData}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
};

export default Skills;