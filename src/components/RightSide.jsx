import React, { useEffect } from "react";
import Title from "../components/Headings";
import WorkExperience from "../components/WorkExperience";
import Education from "../components/Education";
import Acheivement from "../components/Acheivement";
import ExtracurricularActivities from "../components/ExtracurricularActivities";
import Projects from "./Projects";
import { useUserCV } from "../context/UserCVContext";

const RightSide = () => {
  const { userCV } = useUserCV();
  useEffect(() => {
    console.log(userCV?.name);
  }, [])

  return (
    <div className="w-full h-full flex-grow-1 p-5 bg-white">
      {/* name part  */}
      <div className="">
        <div className="text-6xl font-bold text-[#213448]">{userCV?.name}</div>
        <div className="mt-3 text-3xl font-bold">{userCV?.profession}</div>
        <div className="mt-6 text-2xl ">
          {userCV?.description}
        </div>
      </div>
      {/* projects part  */}
      {userCV?.projects.length > 0 && <Projects />}
      {/* work experience part  */}
      {userCV?.experience.length > 0 && (
        <div className="text-black mt-12 h-fit">
          <Title title="Work Experience" pageName="rightSide" />
          {userCV?.experience.map((work, index) => {
            return (
              <>
                <WorkExperience
                  position={work.position}
                  organizationName={work.organizationName}
                  organizationLocation={work.organizationAddress}
                  joiningDate={work.joiningDate}
                  endingDate={work.endingDate}
                  description={work.jobDescription}
                  key={index}
                />
              </>
            );
          })}
        </div>
      )}

      {/* education part */}
      {userCV?.education.length > 0 && (
        <div className="text-black mt-12 h-fit">
          <Title title="Education" pageName="rightSide" />
          {userCV?.education.map((education, index) => {
            return (
              <Education
                department={education.educationQualification}
                institution={education.educationInstitutionName}
                startingDate={education.startingDate}
                endingDate={education.endingDate}
                key={index}
              />
            );
          })}
        </div>
      )}

      {/* achievement */}
      {userCV?.achievement.length > 0 && (
        <div className="text-black mt-12 h-fit">
          <Title title="Achievement" pageName="rightSide" />
          <ul className="list-disc text-2xl mt-8 ml-8">
            {userCV?.achievement.map((achievement, index) => {
              return <Acheivement text={achievement} key={index} />;
            })}
          </ul>
        </div>
      )}

      {/* Extracurricular Activities */}
      {userCV?.activities.length > 0 && (
        <div className="text-black mt-12 h-fit">
          <Title title="Extracurricular Activities" pageName="rightSide" />
          <ul className="list-disc text-2xl mt-8 ml-8">
            {userCV?.activities.map((activities, index) => {
              return (
                <ExtracurricularActivities text={activities} key={index} />
              );
            })}
          </ul>
        </div>
      )}

      {/* Other sections */}
      {userCV?.otherSection.length > 0 && (
        <div className="text-black mt-8 h-fit">
          {userCV?.otherSection.map((section, index) => {
            return (
              <>
                <Title title={section.sectionName} pageName="rightSide" />
                <div key={index} className=" py-4">
                  <ul className="list-disc text-2xl  ml-8">
                    {section.sectionValues.map((value, idx) => (
                      <li key={idx}>{value}</li>
                    ))}
                  </ul>
                </div>
              </>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RightSide;
