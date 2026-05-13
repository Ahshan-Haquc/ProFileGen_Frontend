import React, { useState, useEffect } from "react";
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
import toastShow from "@/utils/toastShow";
import { useNavigate } from "react-router-dom";
import { useUpdateUserContactMutation } from "@/redux/features/dashboard/dashboardApi";
import { 
  Phone, 
  Mail, 
  Linkedin, 
  Github, 
  Globe, 
  MapPin, 
  Save, 
  Loader2,
  Contact2
} from "lucide-react";

const Contact = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV(); // Ensure setUserCV is available here
  const navigate = useNavigate();
  const [contactValues, setContactValues] = useState({
    phoneNumber: "",
    emailId: "",
    linkedInId: "",
    githubId: "",
    portfolioLink: "",
    address: "",
  });

  useEffect(() => {
    if (userCV) {
      setContactValues({
        phoneNumber: userCV.phoneNumber || "",
        emailId: userCV.emailId || "",
        linkedInId: userCV.linkedInId || "",
        githubId: userCV.githubId || "",
        portfolioLink: userCV.portfolioLink || "",
        address: userCV.address || "",
      });
    }
  }, [userCV]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setContactValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const [updateUserContact, { isLoading }] = useUpdateUserContactMutation();

  const submitData = async () => {
    try {
      const data = await updateUserContact({
        cvId: userCV._id,
        ...contactValues
      }).unwrap();

      toastShow("Contact details updated!", "success");
      if (data.updatedCV) {
        setUserCV(data.updatedCV);
      }
      navigate("/home");
    } catch (error) {
      console.error("Error in submission:", error);
      toastShow("Update failed. Please check your connection.", "error");
    }
  };

  const inputFields = [
    { name: "phoneNumber", label: "Phone Number", placeholder: "+1 234 567 890", icon: Phone },
    { name: "emailId", label: "Professional Email", placeholder: "alex@example.com", icon: Mail },
    { name: "linkedInId", label: "LinkedIn Profile", placeholder: "linkedin.com/in/username", icon: Linkedin },
    { name: "githubId", label: "GitHub Profile", placeholder: "github.com/username", icon: Github },
    { name: "portfolioLink", label: "Portfolio Website", placeholder: "www.yourwebsite.com", icon: Globe },
    { name: "address", label: "Current Address", placeholder: "City, Country", icon: MapPin },
  ];

  return (
    <div className="p-6 h-full max-w-4xl mx-auto">
      {/* Header Section */}
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#210F37]/5 rounded-xl">
          <Contact2 className="text-[#210F37]" size={28} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-[#210F37] tracking-tight">
            Contact Information
          </h2>
          <p className="text-gray-500 text-sm">How should recruiters reach out to you?</p>
        </div>
      </div>

      {/* Form Grid */}
      <div className="bg-white rounded-[2rem] border border-gray-100 p-6 md:p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {inputFields.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
              <label className="text-xs font-black uppercase tracking-widest text-gray-400 ml-1">
                {field.label}
              </label>
              <div className="relative group">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#ff8757] transition-colors">
                  <field.icon size={18} />
                </div>
                <input
                  type="text"
                  name={field.name}
                  value={contactValues[field.name]}
                  onChange={handleInput}
                  placeholder={field.placeholder}
                  className="w-full h-14 pl-12 pr-4 bg-gray-50 border border-transparent rounded-2xl text-lg text-[#210F37] focus:bg-white focus:border-[#ff8757] focus:ring-4 focus:ring-[#ff8757]/10 outline-none transition-all placeholder:text-gray-300"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Action Button Section */}
        <div className="mt-10 pt-6 border-t border-gray-50 flex flex-col sm:flex-row items-center gap-4">
          <button
            className={`h-14 px-10 rounded-2xl font-bold text-lg flex items-center justify-center gap-3 transition-all active:scale-95 shadow-lg ${
              isLoading 
              ? "bg-gray-100 text-gray-400 cursor-not-allowed" 
              : "bg-[#210F37] hover:bg-[#ff8757] text-white shadow-[#210F37]/10"
            }`}
            onClick={submitData}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 size={20} className="animate-spin" />
                Saving Changes...
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-400 max-w-[200px] leading-tight">
            All your contact details are synced across all your resume versions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;