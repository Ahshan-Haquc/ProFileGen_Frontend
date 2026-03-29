import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { FaUser, FaEnvelope, FaLock, FaRocket } from "react-icons/fa";
import toastShow from "../utils/toastShow";

const Signup = () => {
  const [user, setUser] = useState({ email: "", password: "", name: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "Sign Up - ProFileGen";
    toastShow("You do not have to verify your email. So feel free to use a random email and password.", "info");
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userSignup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          password: user.password,
          name: user.name,
        }),
        credentials: "include",
      });

      const data = await response.json();
      if (response.ok) {
        toastShow("Signup successful! Please log in.", "success");
        navigate("/login");
      } else {
        toastShow(data.error || "Signup failed. Please try again.", "error");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      toastShow("An error occurred during signup. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      {/* Right side: The showcase and branding */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-[#210F37] text-[#DCA06D]">
        <div className="text-center p-8 rounded-lg border-2 border-[#4F1C51] bg-gradient-to-br from-[#4F1C51]/80 to-[#210F37]/90 max-w-sm">
          <FaRocket className="text-6xl mx-auto mb-4 text-[#DCA06D] animate-bounce-slow" />
          <h2 className="text-3xl font-bold mb-2">Launch Your Career</h2>
          <p className="text-md text-[#F5E6D3] font-light">
            Start building your stunning professional profile and take the first step towards your dream job.
          </p>
        </div>
      </div>
      {/* Left side: The signup form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#111827] tracking-tighter">Create an Account</h1>
            <p className="text-md text-gray-500 mt-2">Create your account and start building your resume in minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Name"
                className="w-full p-4 pl-12 border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-[#00bcd4] transition-all duration-300"
                required
                name="name"
                onChange={handleInput}
              />
              <FaUser className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                className="w-full p-4 pl-12 border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-[#00bcd4] transition-all duration-300"
                required
                name="email"
                onChange={handleInput}
              />
              <FaEnvelope className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            </div>

            <div className="relative">
              <input
                type="password"
                placeholder="Password"
                className="w-full p-4 pl-12 border-b-2 border-gray-300 bg-transparent text-gray-800 focus:outline-none focus:border-[#00bcd4] transition-all duration-300"
                required
                name="password"
                onChange={handleInput}
              />
              <FaLock className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 font-bold text-white bg-[#210F37] rounded-md shadow-md hover:bg-[#20273a] transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing Up..." : "Sign Up"}
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-[#111827] font-bold hover:underline transition-colors duration-200">
              Log In
            </NavLink>
          </p>
        </div>
      </div>


    </div>
  );
};

export default Signup;