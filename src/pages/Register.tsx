import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../service/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { showAlert } from "../components/mini_components/Swail";

export default function Register() {
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fullname, setFullname] = useState("");

  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({}); 

  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const newErrors: any = {};
    if (fullname && fullname.trim().length < 3) newErrors.fullname = "Minimum 3 characters required.";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email && !emailRegex.test(email)) newErrors.email = "Invalid email address.";
    if (contactNumber && contactNumber.length !== 10) newErrors.contactNumber = "Must be 10 digits.";
    if (password && password.length < 6) newErrors.password = "Minimum 6 characters.";
    if (confirmPassword && password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match.";
    setErrors(newErrors);
  }, [fullname, email, contactNumber, password, confirmPassword]);

  const getBorderClass = (fieldName: string, value: string) => {
    if (!touched[fieldName] || !value) return "border-white/20"; 
    return errors[fieldName] ? "border-red-500" : "border-green-500";
  };

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const allTouched = { fullname: true, email: true, contactNumber: true, password: true, confirmPassword: true };
    setTouched(allTouched);

    if (Object.keys(errors).length > 0 || !fullname || !email || !contactNumber || !password) {
      showAlert({ icon: "warning", title: "Wait!", text: "Please fix errors." });
      return;
    }

    try {
      await register(fullname, email, confirmPassword, Number(contactNumber));
      await showAlert({ icon: "success", title: "Success!", text: "Account created." });
      navigate("/login");
    } catch (err: any) {
      showAlert({ icon: "error", title: "Failed", text: err.response?.data?.message || "Error occurred." });
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden font-sans">
      <div className="absolute inset-0 z-0">
        <img src="src/assets/image/Coffee Background.jpg" className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-[#1b110b]/40"></div>
      </div>

      <form onSubmit={handleRegister} className="relative z-20 w-full max-w-xl bg-white/20 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/30 animate-fade-in mx-4">
        <div className="text-center mb-6">
          <div className="text-2xl font-serif font-bold text-white tracking-tighter inline-flex items-center gap-2">
            <span className="bg-[#4a6741] text-white px-3 py-1 rounded-lg shadow-lg">AROMISTA</span>
          </div>
          <h2 className="text-2xl font-bold text-white mt-4">Create Account</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-white/90 mb-1 ml-1 uppercase">Full Name</label>
            <input 
              type="text" value={fullname} onBlur={() => setTouched({...touched, fullname: true})}
              onChange={(e) => setFullname(e.target.value)}
              className={`p-3 bg-white/10 text-white border-2 rounded-xl text-sm outline-none transition-all ${getBorderClass("fullname", fullname)} focus:bg-white/20`} 
            />
            {touched.fullname && errors.fullname && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.fullname}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-white/90 mb-1 ml-1 uppercase">Contact Number</label>
            <input
              type="text" value={contactNumber} maxLength={10} onBlur={() => setTouched({...touched, contactNumber: true})}
              onChange={(e) => setContactNumber(e.target.value.replace(/\D/g, ""))}
              className={`p-3 bg-white/10 text-white border-2 rounded-xl text-sm outline-none transition-all ${getBorderClass("contactNumber", contactNumber)} focus:bg-white/20`}
            />
            {touched.contactNumber && errors.contactNumber && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.contactNumber}</span>}
          </div>
        </div>

        <div className="flex flex-col mt-4">
          <label className="text-xs font-bold text-white/90 mb-1 ml-1 uppercase">Email Address</label>
          <input
            type="email" value={email} onBlur={() => setTouched({...touched, email: true})}
            onChange={(e) => setEmail(e.target.value)}
            className={`p-3 bg-white/10 text-white border-2 rounded-xl text-sm outline-none transition-all ${getBorderClass("email", email)} focus:bg-white/20`}
          />
          {touched.email && errors.email && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.email}</span>}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-white/90 mb-1 ml-1 uppercase">Password</label>
            <div className="relative">
              <input
                type={showPassword1 ? "text" : "password"} value={password} onBlur={() => setTouched({...touched, password: true})}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3 bg-white/10 text-white border-2 rounded-xl text-sm outline-none transition-all ${getBorderClass("password", password)} focus:bg-white/20`}
              />
              <button type="button" onClick={() => setShowPassword1(!showPassword1)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                {showPassword1 ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
              </button>
            </div>
            {touched.password && errors.password && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.password}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-white/90 mb-1 ml-1 uppercase">Confirm Password</label>
            <div className="relative">
              <input
                type={showPassword2 ? "text" : "password"} value={confirmPassword} onBlur={() => setTouched({...touched, confirmPassword: true})}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full p-3 bg-white/10 text-white border-2 rounded-xl text-sm outline-none transition-all ${getBorderClass("confirmPassword", confirmPassword)} focus:bg-white/20`}
              />
              <button type="button" onClick={() => setShowPassword2(!showPassword2)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
                {showPassword2 ? <FaRegEye size={18} /> : <FaRegEyeSlash size={18} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.confirmPassword}</span>}
          </div>
        </div>

        <button type="submit" className="w-full mt-8 py-4 bg-[#4a6741] text-white rounded-xl font-bold text-lg hover:bg-[#3d5435] transition-all shadow-lg active:scale-95">
          Register Now
        </button>

        <p className="text-center mt-6 text-sm text-white/80">
          Already have an account? <Link to="/login" className="text-white font-bold ml-1 hover:underline">Login</Link>
        </p>
      </form>
    </div>
  );
}