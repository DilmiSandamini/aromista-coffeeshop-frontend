import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoffee, FaBars, FaTimes, FaUserCircle, FaShoppingBasket, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { useCart } from "../../context/CartContext";
import { CartDrawer } from "../CartDrawer";

export default function CustomerHeader() {
  const { user, setUser } = useAuth(); 
  const navigate = useNavigate();
  const location = useLocation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { cartItems } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Logout Function
  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    navigate("/login");
  };

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/customer/home" },
    { name: "About", path: "/customer/about" },
    { name: "Orders", path: "/customer/orders" },
    { name: "Booking", path: "/customer/booking" },
    { name: "Service", path: "/customer/service" },
    { name: "Contact", path: "/customer/contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
        isScrolled ? "bg-white/90 backdrop-blur-lg shadow-sm py-3" : "bg-black/10 backdrop-blur-md py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Logo Section */}
        <Link to="/customer/home" className="flex items-center gap-2 group">
          <div className="bg-[#4a6741] p-2 rounded-xl rotate-[-10deg] group-hover:rotate-0 transition-transform duration-300">
            <FaCoffee className="text-white text-xl" />
          </div>
          <span className={`text-2xl font-serif font-black tracking-tighter transition-colors ${isScrolled ? "text-[#3e2723]" : "text-white"}`}>
            AROMISTA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className={`text-[10px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 ${
                location.pathname === link.path 
                  ? (isScrolled ? "text-[#4a6741]" : "text-white border-b border-white") 
                  : (isScrolled ? "text-stone-500 hover:text-[#4a6741]" : "text-stone-200 hover:text-white")
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Action Icons */}
        <div className="flex items-center gap-5">
          {/* Shopping Basket */}
          <button className={`relative transition-colors ${isScrolled ? "text-[#3e2723]" : "text-white"}`} onClick={() => setIsCartOpen(true)}>
            <FaShoppingBasket size={20} />
            <span className="absolute -top-2 -right-2 bg-[#bc8a5f] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {cartItems.length}
            </span>
          </button>

          {/* Profile Dropdown Container */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setIsProfileOpen(!isProfileOpen)}
              className={`flex items-center transition-transform active:scale-90 ${isScrolled ? "text-[#3e2723]" : "text-white"}`}
            >
              <FaUserCircle size={26} />
            </button>

            {/* Dropdown Menu */}
            <AnimatePresence>
              {isProfileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 mt-4 w-64 bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden"
                >
                  {/* User Profile Info */}
                  <div className="p-6 bg-[#FAF7F2] border-b border-stone-100">
                    <div className="flex items-center gap-3 mb-1">
                      <div className="w-10 h-10 rounded-full bg-[#4a6741] flex items-center justify-center text-white font-bold">
                        {user?.fullname?.charAt(0) || "U"}
                      </div>
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-[#3e2723] truncate w-32">{user?.fullname || "Guest User"}</span>
                        <span className="text-[10px] text-stone-400 font-medium truncate w-32">{user?.email || "No email provided"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Links */}
                  <div className="p-2">
                    <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 rounded-2xl transition-colors">
                      <FaUser size={14} className="text-[#bc8a5f]" /> My Profile
                    </button>
                    
                    <div className="h-[1px] bg-stone-100 my-1 mx-4"></div>
                    
                    {/* Logout Button */}
                    <button 
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-4 py-3 text-xs font-black text-red-500 hover:bg-red-50 rounded-2xl transition-colors uppercase tracking-widest"
                    >
                      <FaSignOutAlt size={14} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Mobile Menu Toggle */}
          <button 
            className={`md:hidden transition-colors ${isScrolled ? "text-[#3e2723]" : "text-white"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </header>
  );
}