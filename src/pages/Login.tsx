import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { login, getMyDetails } from "../service/auth";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { showAlert } from "../components/mini_components/Swail";

export default function Login() {
  const [username, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  
  const [errors, setErrors] = useState<any>({});
  const [touched, setTouched] = useState<any>({});
  
  const { setUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const newErrors: any = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (username && !emailRegex.test(username)) {
      newErrors.username = "Invalid email format.";
    }
    if (password && password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    setErrors(newErrors);
  }, [username, password]);

  const getBorderClass = (fieldName: string, value: string) => {
    if (!touched[fieldName] || !value) return "border-white/20"; 
    return errors[fieldName] ? "border-red-500" : "border-green-500";
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({ username: true, password: true });

    if (Object.keys(errors).length > 0 || !username || !password) {
      showAlert({ icon: "warning", title: "Wait!", text: "Please check your details." });
      return;
    }

    try {
      const data = await login(username, password);
      if (data?.data?.accessToken) {
        localStorage.setItem("accessToken", data.data.accessToken);
        localStorage.setItem("refreshToken", data.data.refreshToken);
        const resData = await getMyDetails();
        setUser(resData.data);
        await showAlert({ icon: "success", title: "Welcome!", text: "Login Successful." });
        
        const userRoles = resData.data.roles || [];
        if (userRoles.includes("ADMIN")) navigate("/admin/dashboard");
        else if (userRoles.includes("CUSTOMER")) navigate("/customer/home");
        else if (userRoles.includes("BARISTOR")) navigate("/baristor/dashboard");
        else navigate("/home");
      }
    } catch (err: any) {
      showAlert({ icon: "error", title: "Failed", text: "Invalid credentials." });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative font-sans overflow-hidden">
      <div className="absolute inset-0 z-0 bg-cover bg-center" >
        <img src={"https://i.ibb.co/Z6Gz2GmP/Coffee-Background.jpg"} className="w-full h-full object-cover" alt="BG" />
        <div className="absolute inset-0 bg-[#1b110b]/40"></div>
      </div>

      <div className="relative z-10 w-full max-w-md mx-4 bg-white/20 backdrop-blur-xl p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-white/30 animate-fade-in">
        <div className="text-center mb-8">
          <div className="text-3xl font-serif font-bold text-white tracking-tighter inline-flex items-center gap-2">
            <span className="bg-[#4a6741] text-white px-3 py-1 rounded-lg shadow-lg">AROMISTA</span>
          </div>
          <p className="text-white/80 mt-2 font-medium italic">Your daily cup of calm awaits.</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="flex flex-col">
            <label className="text-xs font-bold text-white/90 mb-1.5 ml-1 uppercase">Email Address</label>
            <input
              type="text" placeholder="coffee@aromista.com"
              value={username} onBlur={() => setTouched({...touched, username: true})}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-3.5 bg-white/10 text-white placeholder-white/40 border-2 rounded-xl outline-none transition-all ${getBorderClass("username", username)} focus:bg-white/20`}
            />
            {touched.username && errors.username && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.username}</span>}
          </div>

          <div className="flex flex-col">
            <label className="text-xs font-bold text-white/90 mb-1.5 ml-1 uppercase">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"} placeholder="••••••••"
                value={password} onBlur={() => setTouched({...touched, password: true})}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full p-3.5 bg-white/10 text-white placeholder-white/40 border-2 rounded-xl outline-none transition-all ${getBorderClass("password", password)} focus:bg-white/20`}
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60">
                {showPassword ? <FaRegEye size={20} /> : <FaRegEyeSlash size={20} />}
              </button>
            </div>
            {touched.password && errors.password && <span className="text-[10px] text-red-400 mt-1 ml-1 font-bold">{errors.password}</span>}
          </div>

          <button type="submit" className="w-full py-4 bg-[#4a6741] text-white rounded-xl font-bold text-lg hover:bg-[#3d5435] transition-all shadow-lg active:scale-95">
            Sign In
          </button>
        </form>
        
        <p className="text-center mt-8 text-sm text-white/80">
          New to Aromista? <Link to="/register" className="text-white font-bold ml-1 hover:underline">Create an account</Link>
        </p>
      </div>
    </div>
  );
}