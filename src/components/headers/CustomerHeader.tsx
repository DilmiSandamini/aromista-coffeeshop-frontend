import { useState, useEffect, useRef } from "react";
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  const navLinks = [
    { name: "Home", path: "/customer/home" },
    { name: "About", path: "/customer/about" },
    { name: "Orders", path: "/customer/orders" },
    { name: "Booking", path: "/customer/booking" },
    { name: "Service", path: "/customer/service" },
    { name: "Contact", path: "/customer/contact" },
  ];

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          isScrolled ? "bg-white/95 backdrop-blur-lg shadow-md py-3" : "bg-black/20 backdrop-blur-md py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center">
          
          <Link to="/customer/home" className="flex items-center gap-2 group shrink-0">
            <div className="bg-[#4a6741] p-1.5 sm:p-2 rounded-xl rotate-[-10deg] group-hover:rotate-0 transition-transform duration-300 shadow-lg shadow-[#4a6741]/20">
              <FaCoffee className="text-white text-lg sm:text-xl" />
            </div>
            <span className={`text-xl sm:text-2xl font-serif font-black tracking-tighter transition-colors ${isScrolled ? "text-[#3e2723]" : "text-white"}`}>
              AROMISTA
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`text-[10px] xl:text-[11px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                  location.pathname === link.path
                    ? (isScrolled ? "text-[#4a6741]" : "text-white")
                    : (isScrolled ? "text-stone-500 hover:text-[#4a6741]" : "text-stone-200 hover:text-white")
                }`}
              >
                {link.name}
                <span className={`absolute -bottom-1 left-0 w-full h-[2px] transition-transform duration-300 origin-left ${
                    location.pathname === link.path ? "scale-x-100 bg-current" : "scale-x-0 group-hover:scale-x-100 bg-current"
                }`}></span>
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <button 
              className={`relative p-2 transition-colors ${isScrolled ? "text-[#3e2723]" : "text-white"}`} 
              onClick={() => setIsCartOpen(true)}
            >
              <FaShoppingBasket className="text-xl sm:text-2xl" />
              <span className="absolute top-0 right-0 bg-[#bc8a5f] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-2 border-white/20">
                {cartItems.length}
              </span>
            </button>

            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className={`flex items-center p-1 transition-transform active:scale-90 ${isScrolled ? "text-[#3e2723]" : "text-white"}`}
              >
                <FaUserCircle className="text-2xl sm:text-3xl" />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-56 sm:w-64 bg-white rounded-3xl shadow-2xl border border-stone-100 overflow-hidden"
                  >
                    <div className="p-5 bg-[#FAF7F2] border-b border-stone-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#4a6741] flex items-center justify-center text-white font-bold shrink-0">
                          {user?.fullname?.charAt(0) || "U"}
                        </div>
                        <div className="flex flex-col overflow-hidden">
                          <span className="text-sm font-bold text-[#3e2723] truncate">{user?.fullname || "Guest User"}</span>
                          <span className="text-[10px] text-stone-400 font-medium truncate">{user?.email || "No email"}</span>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-stone-600 hover:bg-stone-50 rounded-2xl transition-colors">
                        <FaUser size={14} className="text-[#bc8a5f]" /> My Profile
                      </button>
                      <div className="h-[1px] bg-stone-100 my-1 mx-4"></div>
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

            <button
              className={`lg:hidden p-2 z-[110] transition-colors ${
                isMobileMenuOpen ? "text-[#3e2723]" : (isScrolled ? "text-[#3e2723]" : "text-white")
              }`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FaTimes size={26} /> : <FaBars size={26} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsMobileMenuOpen(false)}
                className="fixed inset-0 bg-[#3e2723]/40 backdrop-blur-md z-[105] lg:hidden"
              />
              
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-screen w-[280px] sm:w-[350px] bg-[#FAF7F2] z-[106] lg:hidden shadow-[-20px_0_50px_rgba(0,0,0,0.2)] flex flex-col"
              >
                {/* Mobile Menu Top Color Block */}
                <div className="h-32 w-full bg-gradient-to-br from-[#4a6741] to-[#364d30] p-8 flex items-end">
                    <div className="flex items-center gap-3 text-white">
                        <FaCoffee size={24} />
                        <span className="font-serif font-black text-xl tracking-widest">AROMISTA</span>
                    </div>
                </div>

                <div className="p-8 flex flex-col gap-5 overflow-y-auto flex-grow">
                  <span className="text-[10px] font-black text-[#bc8a5f] uppercase tracking-[0.4em] mb-2">Menu Navigation</span>
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      to={link.path}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className={`text-2xl font-serif font-bold transition-all py-1 ${
                        location.pathname === link.path 
                        ? "text-[#4a6741] pl-4 border-l-4 border-[#4a6741]" 
                        : "text-[#3e2723] hover:text-[#4a6741] hover:pl-2"
                      }`}
                    >
                      {link.name}
                    </Link>
                  ))}
                  
                  <div className="h-[1px] bg-stone-200 my-6"></div>
                  
                  <div className="flex flex-col gap-4">
                     <span className="text-[10px] font-black text-[#bc8a5f] uppercase tracking-[0.4em]">Personal Account</span>
                     <div className="flex flex-col gap-3 p-5 bg-white rounded-3xl border border-stone-100 shadow-sm">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-[#4a6741] flex items-center justify-center text-white text-xl font-bold shadow-md shadow-[#4a6741]/30">
                               {user?.fullname?.charAt(0) || "U"}
                            </div>
                            <div className="flex flex-col overflow-hidden">
                               <span className="text-sm font-bold text-[#3e2723] truncate">{user?.fullname || "Guest User"}</span>
                               <span className="text-[10px] text-stone-400 truncate">{user?.email || "Member"}</span>
                            </div>
                        </div>
                        <button 
                            onClick={handleLogout} 
                            className="mt-2 w-full py-3 bg-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                        >
                           <FaSignOutAlt /> Sign Out Now
                        </button>
                     </div>
                  </div>
                </div>
                
                <div className="p-8 bg-[#f5f0e8] flex items-center justify-between">
                   <div className="opacity-40">
                      <FaCoffee size={40} className="text-[#3e2723]" />
                   </div>
                   <p className="text-[9px] text-[#3e2723]/40 font-bold uppercase tracking-widest">© 2026 Aromista Coffee</p>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      </header>
    </>
  );
}