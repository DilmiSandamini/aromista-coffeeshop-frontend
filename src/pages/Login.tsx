import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { login, getMyDetails } from "../service/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Please enter both email and password.");
      return;
    }

    try {
      const data = await login(username, password);

      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);

        const resData = await getMyDetails();
        const userRoles = resData.data.roles || [];

        setUser(resData.data);

        if (userRoles.includes("ADMIN")) {
          navigate("/admin/dashboard");
        } else if (userRoles.includes("CUSTOMER")) {
          navigate("/customer/home");
        } else if (userRoles.includes("BARISTOR")) {
          navigate("/baristor/dashboard");
        } else {
          navigate("/home");
        }
      } else {
        setErrorMessage("Login failed. Please check your credentials.");
      }
    } catch (err) {
      console.error("Login error:", err);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative font-sans overflow-hidden">
      {/* Background Image with Overlay */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-[#1b110b]/60 backdrop-blur-[2px]"></div>
      </div>

      {/* Login Card */}
      <div 
        className="relative z-10 w-full max-w-md mx-4 bg-white/95 backdrop-blur-md p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 animate-fade-in"
      >
        {/* Logo Section */}
        <div className="text-center mb-8">
          <div className="text-3xl font-serif font-bold text-[#3e2723] tracking-tighter inline-flex items-center gap-2">
            <span className="bg-[#4a6741] text-white px-3 py-1 rounded-lg">AROMISTA</span>
          </div>
          <p className="text-[#8a817c] mt-2 font-medium italic">Your daily cup of calm awaits.</p>
        </div>

        <h2 className="text-2xl font-bold text-[#3e2723] mb-6 text-center">Welcome Back!</h2>

        <form onSubmit={handleLogin} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-sm font-bold text-[#3e2723] mb-1.5 ml-1">Email Address</label>
            <input
              type="text"
              placeholder="coffee@aromista.com"
              value={username}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3.5 bg-gray-50 border border-[#eaddcf] rounded-xl text-[#3e2723] focus:ring-2 focus:ring-[#4a6741] focus:border-transparent outline-none transition-all"
            />
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-bold text-[#3e2723] mb-1.5 ml-1">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 bg-gray-50 border border-[#eaddcf] rounded-xl text-[#3e2723] focus:ring-2 focus:ring-[#4a6741] focus:border-transparent outline-none transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4a6741]"
              >
                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
              </button>
            </div>
            <p className="text-right text-xs text-[#bc8a5f] hover:underline cursor-pointer mt-2 font-semibold underline-offset-2">
              Forgot password?
            </p>
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-100 font-medium animate-shake">
              {errorMessage}
            </div>
          )}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-4 bg-[#4a6741] text-white rounded-xl font-bold text-lg hover:bg-[#3d5435] hover:scale-[1.02] transition-all shadow-lg shadow-[#4a6741]/20 mt-2"
          >
            Sign In
          </button>
        </form>
        <p className="text-center mt-8 text-sm text-[#8a817c]">
          New to Aromista? 
          <Link to="/register" className="text-[#4a6741] font-bold ml-1 hover:underline underline-offset-4">
            Create an account
          </Link>
        </p>

        <div className="relative my-8 text-center">
          <hr className="border-[#eaddcf]" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-4 text-xs text-gray-400 font-bold uppercase tracking-widest">or</span>
        </div>

        {/* Google Login */}
        <button className="w-full py-3 px-4 border border-[#eaddcf] bg-white text-gray-700 font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm">
          <img className="w-5" src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
          <span className="text-sm">Continue with Google</span>
        </button>
      </div>

      {/* Animation CSS */}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake { animation: shake 0.2s ease-in-out 0s 2; }
      `}</style>
    </div>
  );
}