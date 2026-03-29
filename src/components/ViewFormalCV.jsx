import React, { useEffect, useRef, useState } from "react";
import { useUserCV } from "../context/UserCVContext";
import { NavLink } from "react-router-dom";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";
import Loading from "../commonComponents/Loading";
import { loadingOnPageLoad } from "../controllers/loadingOnPageLoad";
import { toPng } from "html-to-image";

const ViewFormalCV = () => {
  const [loading, setLoading] = useState(true);
  const [loadingForDownloadPDF, setLoadingForDownloadPDF] = useState(false);

  const { userCV } = useUserCV();
  if (!userCV) return <p className="text-center text-xl">No user cv founded.</p>;
  // const printRef = useRef(null);


  //generate pdf and then download
  // const handleDownloadPdf = async () => {
  //   setLoadingForDownloadPDF(true);

  //   const element = printRef.current;
  //   const scale = 2;

  //   try {
  //     const dataUrl = await domtoimage.toPng(element, {
  //       width: element.offsetWidth * scale,
  //       height: element.offsetHeight * scale,
  //       style: {
  //         transform: `scale(${scale})`,
  //         transformOrigin: "top left",
  //       },
  //     });

  //     const img = new Image();
  //     img.src = dataUrl;

  //     img.onload = () => {
  //       const pdf = new jsPDF("p", "mm", "a4");
  //       const pdfWidth = pdf.internal.pageSize.getWidth();
  //       const pdfHeight = pdf.internal.pageSize.getHeight();

  //       // Convert image dimensions to mm with 96 dpi base
  //       const pxToMm = (px) => (px * 25.4) / 96;
  //       const imgWidthMm = pxToMm(img.width);
  //       const imgHeightMm = pxToMm(img.height);

  //       const ratio = imgWidthMm / imgHeightMm;
  //       const scaledImgWidth = pdfWidth;
  //       const scaledImgHeight = pdfWidth / ratio;

  //       const pages = Math.ceil(scaledImgHeight / pdfHeight);

  //       for (let i = 0; i < pages; i++) {
  //         if (i > 0) pdf.addPage();
  //         pdf.addImage(
  //           dataUrl,
  //           "PNG",
  //           0,
  //           -i * pdfHeight,
  //           scaledImgWidth,
  //           scaledImgHeight
  //         );
  //       }
  //       setLoadingForDownloadPDF(false)

  //       pdf.save("cv.pdf");
  //     };
  //   } catch (error) {
  //     console.error("PDF generation failed:", error);
  //   }
  // };

  const pageRef = useRef(null);
  const handleDownloadPdf = async () => {
    if (!pageRef.current) return;

    try {
      const dataUrl = await toPng(pageRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "screenshot.png";
      link.click();
    } catch (err) {
      console.error("Screenshot failed", err);
    }
  };
  // for loading when someone first access in this page 
  loadingOnPageLoad(setLoading);

  return (
    <>
      {/* loading showing */}
      {loading && <Loading loadingMessage="Generating CV..." />}

      {/* generating pdf loading showing  */}
      {loadingForDownloadPDF && <Loading loadingMessage="Generating PDF..." />}

      <div className="bg-gray-100 min-h-screen p-6">
        <div
          ref={pageRef}
          className="max-w-4xl mx-auto bg-white p-8 shadow-md rounded-md text-[#213448]"
        >
          {/* HEADER */}
          <div className="text-center mb-6">
            <img
              src={userCV.images}
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto object-cover border-2 border-gray-400"
            />
            <h1 className="text-3xl font-bold mt-4">{userCV.name}</h1>
            <h2 className="text-xl text-gray-600">{userCV.profession}</h2>
          </div>

          {/* PROFILE SUMMARY */}
          <div className="mb-6">
            <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1">
              Profile Summary
            </h3>
            <p className="mt-2">{userCV.description}</p>
          </div>

          {/* CONTACT INFO */}
          <div className="grid grid-cols-2 gap-4 mb-6 text-gray-700">
            <p><strong>Email:</strong> {userCV.emailId}</p>
            <p><strong>Phone:</strong> {userCV.phoneNumber}</p>
            <p><strong>LinkedIn:</strong> {userCV.linkedInId}</p>
            <p><strong>GitHub:</strong> {userCV.githubId}</p>
            <p><strong>Portfolio:</strong> {userCV.portfolioLink}</p>
            <p><strong>Address:</strong> {userCV.address}</p>
          </div>

          {/* SKILLS */}
          {userCV.skills && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Skills</h3>
              <div className="grid grid-cols-2 gap-4">
                {userCV.skills &&
                  Object.entries(userCV.skills).map(([category, skillList], idx) => (
                    <div key={idx}>
                      <h4 className="font-bold">{category}</h4>
                      <ul className="list-disc list-inside">
                        {skillList.map((skill, index) => (
                          <li key={index}>{skill}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {userCV.education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Education</h3>
              {userCV.education.map((edu, index) => (
                <div key={index} className="mb-2">
                  <p className="font-bold">{edu.educationQualification}</p>
                  <p>{edu.educationInstitutionName}</p>
                  <p className="text-sm text-gray-600">{edu.startingDate} - {edu.endingDate}</p>
                </div>
              ))}
            </div>
          )}

          {/* EXPERIENCE */}
          {userCV.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Experience</h3>
              {userCV.experience.map((exp, index) => (
                <div key={index} className="mb-2">
                  <p className="font-bold">{exp.position} at {exp.organizationName}</p>
                  <p>{exp.organizationAddress}</p>
                  <p className="text-sm text-gray-600">{exp.joiningDate} - {exp.endingDate}</p>
                  <p>{exp.jobDescription}</p>
                </div>
              ))}
            </div>
          )}

          {/* PROJECTS */}
          {userCV.projects.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Projects</h3>
              {userCV.projects.map((proj, index) => (
                <div key={index} className="mb-2">
                  <p className="font-bold">{proj.projectName}</p>
                  <p>{proj.projectDescription}</p>
                  <p className="text-sm text-gray-600">{proj.projectToolsAndTechnologies}</p>
                </div>
              ))}
            </div>
          )}

          {/* ACHIEVEMENTS */}
          {userCV.achievement.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Achievements</h3>
              <ul className="list-disc list-inside">
                {userCV.achievement.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* ACTIVITIES */}
          {userCV.activities.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">Activities</h3>
              <ul className="list-disc list-inside">
                {userCV.activities.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* REFERENCES */}
          {userCV.reference.length > 0 && (
            <div className="mb-6">
              <h3 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-2">References</h3>
              {userCV.reference.map((ref, index) => (
                <div key={index} className="mb-2">
                  <p className="font-bold">{ref.referenceName}</p>
                  <p>{ref.referenceCompany}</p>
                  <p>{ref.referenceEmail} | {ref.referencePhone}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Download PDF Button */}
      <div
        onClick={handleDownloadPdf}
        className="fixed bottom-4 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center cursor-pointer"
      >
        <i className="fa-solid fa-download"></i>
      </div>

      {/* Back to Dashboard Button */}
      <NavLink
        to={"/"}
        className="fixed bottom-20 right-4 h-10 w-10 rounded-full hover:bg-black bg-amber-600 text-white flex justify-center items-center"
      >
        <i className="fa-solid fa-arrow-left"></i>
      </NavLink>
    </>
  );
};

export default ViewFormalCV;
