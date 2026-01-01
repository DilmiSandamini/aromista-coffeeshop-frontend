import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../service/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function Register() {
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const data = await register(fullname, email, confirmPassword, Number(contactNumber));
      alert(`Registration successful! Welcome to Aromista.`);
      navigate("/login");
    } catch (err) {
      console.error("Registration error:", err);
      alert("Registration failed. Please try again.");
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      
      {/* --- Background Image Section --- */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/src/assets/image/view-fresh-coffee-cup.jpg" 
          alt="Coffee Background" 
          className="w-full h-full object-cover"
        />
        {/* Dark Brownish Overlay for readability */}
        <div className="absolute inset-0 bg-[#1b110b]/60 backdrop-blur-[2px]"></div>
      </div>

      {/* --- Registration Form Card --- */}
      <form 
        onSubmit={handleRegister}
        className="relative z-20 w-full max-w-xl bg-white/95 p-8 md:p-10 rounded-3xl shadow-2xl border border-white/20 animate-fade-in mx-4"
      >
        <div className="text-center mb-6">
          <div className="text-2xl font-serif font-bold text-[#3e2723] tracking-tighter inline-flex items-center gap-2">
            <span className="bg-[#4a6741] text-white px-3 py-1 rounded-lg shadow-md">AROMISTA</span>
          </div>
          <h2 className="text-2xl font-bold text-[#3e2723] mt-4">Create Account</h2>
          <p className="text-[#8a817c] text-sm italic">Join our community of coffee lovers.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#3e2723] mb-1 ml-1 uppercase tracking-wider">Full Name</label>
            <input 
              type="text" 
              value={fullname}
              onChange={(e) => setFullname(e.target.value)}
              placeholder="John Doe"
              className="p-3 bg-gray-50 border border-[#eaddcf] rounded-xl text-sm focus:ring-2 focus:ring-[#4a6741] outline-none transition-all shadow-sm"
              required
            />
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#3e2723] mb-1 ml-1 uppercase tracking-wider">Contact Number</label>
            <input
              type="number"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
              placeholder="077 123 4567"
              className="p-3 bg-gray-50 border border-[#eaddcf] rounded-xl text-sm focus:ring-2 focus:ring-[#4a6741] outline-none transition-all shadow-sm"
              required
            />
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold text-[#3e2723] mb-1 ml-1 uppercase tracking-wider">Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@gmail.com"
            className="p-3 bg-gray-50 border border-[#eaddcf] rounded-xl text-sm focus:ring-2 focus:ring-[#4a6741] outline-none transition-all shadow-sm"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#3e2723] mb-1 ml-1 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-gray-50 border border-[#eaddcf] rounded-xl text-sm focus:ring-2 focus:ring-[#4a6741] outline-none transition-all shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword1(!showPassword1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4a6741] transition"
              >
                {showPassword1 ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-[#3e2723] mb-1 ml-1 uppercase tracking-wider">Confirm</label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full p-3 bg-gray-50 border border-[#eaddcf] rounded-xl text-sm focus:ring-2 focus:ring-[#4a6741] outline-none transition-all shadow-sm"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword2(!showPassword2)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#4a6741] transition"
              >
                {showPassword2 ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
              </button>
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mt-8 py-4 bg-[#4a6741] text-white rounded-xl font-bold text-lg hover:bg-[#3d5435] hover:scale-[1.01] active:scale-95 transition-all shadow-lg shadow-[#4a6741]/20"
        >
          Register Now
        </button>

        <p className="text-center mt-6 text-sm text-[#8a817c]">
          Already have an account? 
          <Link to="/login" className="text-[#4a6741] font-bold ml-1 hover:underline underline-offset-4">Login</Link>
        </p>

        <div className="relative my-6">
          <hr className="border-[#eaddcf]" />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-3 text-[10px] text-gray-400 font-bold uppercase tracking-widest">or</span>
        </div>

        <button 
          type="button"
          className="w-full py-3 border border-[#eaddcf] bg-white text-[#3e2723] font-bold rounded-xl flex items-center justify-center gap-3 hover:bg-gray-50 transition-all shadow-sm"
        >
          <img className="w-5" src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png" alt="Google" />
          <span className="text-sm">Continue with Google</span>
        </button>

        <style>{`
          @keyframes fade-in {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .animate-fade-in { animation: fade-in 0.8s ease-out forwards; }
        `}</style>
      </form>
    </div>
  );
}