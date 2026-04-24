import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAdminSignupMutation } from "../../redux/features/auth/authApi";
import toastShow from "../../utils/toastShow";

const SignupAdmin = () => {
    const [input, setInput] = useState({ email: "", password: "", confirmPassword: "" });
    const navigate = useNavigate();
    const [adminSignup, { isLoading }] = useAdminSignupMutation();
    const handleInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setInput(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            // validating form 
            if (!input.email || !input.password || !input.confirmPassword) {
                toastShow("You have to fill all fields", "error")
                return;
            }
            if (input.password.length < 8) {
                toastShow("Minimum 8 digit password is required.", "error");
                return;
            }
            if (input.password !== input.confirmPassword) {
                toastShow("Password is not matched", "error");
                return;
            }

            // calling api 
            const response = await adminSignup({
                email: input.email,
                password: input.password
            }).unwrap();
            
            toastShow(response.message || "Admin signup successful", "success");
            navigate('/login')

        } catch (error) {
            console.error(error);
            toastShow(error?.data?.message || "Something went wrong", "error")
        }
    }

    return (
        <>
            <div className="h-screen w-screen flex justify-center items-center center">
                <div className="h-[300px] md:h-[400px] w-[350px] md:w-[400px] p-4 bg-white border border-gray-200 rounded-lg shadow-lg flex flex-col items-center justify-evenly">
                    <h1 className="text-center text-2xl font-bold mb-4">Admin Sign Up dfe dfgr</h1>
                    <form
                        method="post"
                        onSubmit={handleSubmit}
                        className="w-full flex flex-col items-center"
                    >
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                            name="email"
                            onChange={handleInput}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                            name="password"
                            onChange={handleInput}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            className="w-full p-2 my-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                            required
                            name="confirmPassword"
                            onChange={handleInput}
                        />
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full p-2 bg-[#37B7C3] text-white rounded-md hover:bg-blue-600 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? "Signing up..." : "Sign Up"}
                        </button>
                    </form>
                    <p className="mt-4 text-sm text-gray-600">
                        Already have an account?{" "}
                        <NavLink to="/login" className="text-blue-500 hover:underline">
                            Log in
                        </NavLink>
                    </p>
                </div>
            </div>
        </>
    );
};

export default SignupAdmin;
