import React from "react";
import Title from "../components/Headings";
import { useUserCV } from "../context/UserCVContext";

const Projects = () => {
  const { userCV } = useUserCV();
  return (
    <>
      <div className="text-black mt-12 h-fit">
        <Title title="Projects" pageName="rightSide" />
        <div className="h-full">
          {/* project 1 */}

          {userCV?.projects.map((project, index) => {
            return (
              <div className="flex h-full mt-3 " key={index}>
                {/* vartical line */}
                <div className="min-h-fit min-w-5 flex justify-center relative">
                  <div className="h-5 w-5 bg-black rounded-full absolute top-3"></div>
                  <div className="h-full w-[2px] bg-black mt-3"></div>
                </div>
                {/* project info */}
                <div className="pl-3">
                  <div className="text-3xl font-bold">
                    {project.projectName}
                  </div>
                  <div className="mt-6 text-2xl ">
                    {project.projectDescription}
                  </div>
                  <div className="mt-6 text-2xl">
                    {project.projectToolsAndTechnologies}
                  </div>
                  <br />
                  <br />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Projects;
