import React from "react";
import myImage from "../assets/MyImage.jpg";
import Title from "../components/Headings";
import ContactText from "../components/ContactText";
import Skills from "../components/Skills";
import { useUserCV } from "../context/UserCVContext";

const LeftSide = () => {
  const { userCV } = useUserCV();
  return (
    <div className="min-w-[400px]  min-h-full  bg-[#213448] flex flex-col items-center">
      {/* image  */}
      <div className="h-[250px] w-[250px] rounded-full mt-8">
        <img
          src={userCV?.images}
          className="object-cover h-full w-full rounded-full"
          alt="Profile"
        />
      </div>

      {/* contact */}
      <div className="w-full h-fit mt-10 pl-6 ">
        <Title title="Contact" />
        <div className="">
          <ContactText text={userCV?.phoneNumber} logoName="fa-phone-flip" />
          <ContactText text={userCV?.emailId} logoName="fa-user" />
          <ContactText text={userCV?.linkedInId} logoName="fa-user" />
          <ContactText text={userCV?.githubId} logoName="fa-user" />
          <ContactText text={userCV?.portfolioLink} logoName="fa-user" />
          <ContactText text={userCV?.address} logoName="fa-location-dot" />
        </div>
      </div>
      {/* skills */}
      {userCV?.skills && (
        <div className="w-full h-fit mt-12 pl-6 ">
          <Title title="Skills" />
          <div className="pl-2">
            {userCV?.skills?.Frontend && userCV.skills.Frontend.length > 0 && (
              <Skills skillTitle="Frontend" skillNames={userCV.skills.Frontend} />
            )}
            {userCV?.skills?.Backend && userCV.skills.Backend.length > 0 && (
              <Skills skillTitle="Backend" skillNames={userCV.skills.Backend} />
            )}
            {userCV?.skills?.Database && userCV.skills.Database.length > 0 && (
              <Skills skillTitle="Database" skillNames={userCV.skills.Database} />
            )}
            {userCV?.skills?.UIUX && userCV.skills.UIUX.length > 0 && (
              <Skills skillTitle="UI/UX" skillNames={userCV.skills.UIUX} />
            )}
            {userCV?.skills?.ToolsAndTechnology && userCV.skills.ToolsAndTechnology.length > 0 && (
              <Skills skillTitle="Tools And Technology" skillNames={userCV.skills.ToolsAndTechnology} />
            )}
            {userCV?.skills?.SoftSkills && userCV.skills.SoftSkills.length > 0 && (
              <Skills skillTitle="Soft Skills" skillNames={userCV.skills.SoftSkills} />
            )}
          </div>
        </div>
      )}
      {/* reference */}
      {userCV?.reference.length && (
        <div className="w-full h-fit mt-12 pl-6 ">
          <Title title="Reference" />

          {userCV?.reference.map((ref, index) => {
            return (
              <div className="text-white ml-11 my-8">
                <div className="text-2xl font-bold">{ref.referenceName}</div>
                <div className="text-xl ">{ref.referenceCompany}</div>
                <div className="text-xl ">{ref.referenceEmail}</div>
                <div className="text-xl ">{ref.referencePhone}</div>
              </div>
            )
          })}

        </div>
      )}
    </div>
  );
};

export default LeftSide;
