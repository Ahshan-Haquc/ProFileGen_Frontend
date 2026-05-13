import React, { useState, useEffect } from "react";
import { useAuthUser } from "@/redux/hooks";
import { useUserCV } from "@/redux/hooks";
import toastShow from "@/utils/toastShow";
import { useNavigate } from "react-router-dom";
import { useUpdateUserProfileMutation } from "@/redux/features/dashboard/dashboardApi";
import { Camera, Upload, User, Briefcase, Check } from "lucide-react";

const Profile = () => {
  const { user } = useAuthUser();
  const { userCV, setUserCV } = useUserCV();
  const [inputValue, setInputValue] = useState({ name: "", profession: "" });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null); // Local state for image preview
  const navigate = useNavigate();

  useEffect(() => {
    if (userCV) {
      setInputValue({
        name: userCV.name || "",
        profession: userCV.profession || "",
      });
      // If user already has a photo in userCV, we could set initial preview here
      if (userCV.photo) setPreview(userCV.photo);
    }
  }, [userCV]);

  const handleInput = (e) => {
    setInputValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Generate preview URL
    }
  };

  const [updateUserProfile, {isLoading}] = useUpdateUserProfileMutation();

  const handleSubmit = async () => {
    if (!inputValue.name || !inputValue.profession) {
      toastShow("Name and Profession are required.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user._id);
    formData.append("name", inputValue.name);
    formData.append("profession", inputValue.profession);

    if (image) {
      formData.append("photo", image);
    }

    try {
      const data = await updateUserProfile(formData).unwrap();
      if (data.success) {
        toastShow(data.message, "success");
        if (data.updatedCV) setUserCV(data.updatedCV);
        navigate("/");
      } else {
        toastShow("Failed: " + data.message, "error");
      }
    } catch (error) {
      console.error(error);
      toastShow("Upload error.", "error");
    }
  };

  return (
    <div className="p-6 h-full max-w-2xl mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <div className="p-3 bg-[#210F37]/5 rounded-xl">
          <User className="text-[#210F37]" size={28} />
        </div>
        <h2 className="text-3xl font-black text-[#210F37] tracking-tight">
          Basic Info
        </h2>
      </div>

      <div className="flex flex-col gap-6">
        {/* --- IMPROVED IMAGE SECTION --- */}
        <div className="flex flex-col items-center sm:flex-row gap-6 p-6 bg-gray-50 rounded-3xl border border-dashed border-gray-200">
          <div className="relative group">
            <div className="h-28 w-28 rounded-full border-4 border-white shadow-md overflow-hidden bg-gray-200 flex items-center justify-center">
              {preview ? (
                <img src={preview} alt="Profile" className="h-full w-full object-cover" />
              ) : (
                <User size={40} className="text-gray-400" />
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-2 bg-[#ff8757] text-white rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
              <Camera size={16} />
              <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
            </label>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-[#210F37]">Choose your CV's photo</h4>
            <p className="text-sm text-gray-500 mb-3">
              {image ? `Selected: ${image.name}` : "Upload a professional headshot (JPG, PNG)"}
            </p>
            {!image && (
              <label className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-gray-200 text-sm font-bold text-[#210F37] hover:bg-[#210F37] hover:text-white transition-all cursor-pointer shadow-sm">
                <Upload size={16} /> Choose Image
                <input type="file" className="hidden" onChange={handleImageChange} accept="image/*" />
              </label>
            )}
            {image && (
              <div className="inline-flex items-center gap-2 text-emerald-600 text-sm font-bold bg-emerald-50 px-3 py-1 rounded-full">
                <Check size={14} /> Ready to update
              </div>
            )}
          </div>
        </div>

        {/* --- INPUT FIELDS --- */}
        <div className="grid gap-4">
          <div className="relative">
            <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="w-full h-14 pl-12 pr-4 border border-gray-200 rounded-2xl text-lg focus:border-[#ff8757] focus:ring-4 focus:ring-[#ff8757]/10 outline-none transition-all"
              onChange={handleInput}
              value={inputValue.name}
            />
          </div>

          <div className="relative">
            <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              name="profession"
              placeholder="Profession (e.g. Software Engineer)"
              className="w-full h-14 pl-12 pr-4 border border-gray-200 rounded-2xl text-lg focus:border-[#ff8757] focus:ring-4 focus:ring-[#ff8757]/10 outline-none transition-all"
              onChange={handleInput}
              value={inputValue.profession}
            />
          </div>
        </div>

        <button
          className="mt-4 h-14 w-full sm:w-[220px] bg-[#210F37] hover:bg-[#ff8757] text-white rounded-2xl font-bold text-lg shadow-lg shadow-[#210F37]/10 transition-all active:scale-95"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
};

export default Profile;
