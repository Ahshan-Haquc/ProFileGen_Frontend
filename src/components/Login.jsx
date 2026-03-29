import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthUser } from "../context/AuthContext";
import toastShow from "../utils/toastShow";
import { FaEnvelope, FaLock, FaFileAlt } from "react-icons/fa";

const Login = () => {
  const [formUser, setFormUser] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useAuthUser();

  useEffect(() => {
    document.title = "Login - ProFileGen";
    toastShow("You do not have to verify your email. So feel free to use a random email and password to explore this website.", "info");
  }, []);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormUser({ ...formUser, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/userLogin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          email: formUser.email,
          password: formUser.password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        if (data.user.role === "admin") {
          navigate("/adminDashboard");
        } else {
          navigate("/cvDashboard");
        }
      } else {
        toastShow(data.message || "Login unsuccessful. Please check your credentials.", "error");
      }
    } catch (err) {
      console.error("Login error in frontend:", err);
      toastShow("An unexpected error occurred. Please try again.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row font-sans">
      {/* Left side: The login form */}
      <div className="flex-1 flex items-center justify-center p-4 md:p-8 bg-white">
        <div className="w-full max-w-sm">
          <div className="text-center mb-10">
            <h1 className="text-4xl font-extrabold text-[#111827] tracking-tighter">ProFileGen</h1>
            <p className="text-md text-gray-500 mt-2">Log in to update your professional profile.</p>
          </div>

          <form onSubmit={handleSubmit} className="w-full space-y-6">
            <div className="relative">
              <input
                type="email"
                placeholder="Email address"
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

            <div className="w-full text-right mt-2">
              <NavLink to="#" className="text-sm text-gray-500 hover:text-[#00bcd4] transition-colors duration-200">
                Forgot password?
              </NavLink>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full p-4 font-bold text-white bg-[#210F37] rounded-md shadow-md hover:bg-[#20273a] transition-all duration-300 hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <p className="mt-8 text-sm text-center text-gray-600">
            Don't have an account?{" "}
            <NavLink to="/signup" className="text-[#4F1C51] font-bold hover:underline transition-colors duration-200">
              Sign Up
            </NavLink>
          </p>
        </div>
      </div>

      {/* Right side: The showcase and branding */}
      <div className="hidden md:flex flex-1 items-center justify-center p-8 bg-[#210F37] text-white">
        <div className="text-center p-8 rounded-lg border-2 border-[#4F1C51] max-w-sm bg-gradient-to-br from-[#4F1C51]/80 to-[#210F37]/90 shadow-xl">
          <FaFileAlt className="text-6xl mx-auto mb-4 text-[#DCA06D] transform transition-transform duration-500 hover:scale-110" />
          <h2 className="text-3xl font-bold mb-2 text-[#DCA06D]">
            Build Your Dream Resume or CV
          </h2>
          <p className="text-md text-[#F5E6D3] font-light">
            Choose from stunning, professional templates and keep your profile
            updated for a lifetime.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;