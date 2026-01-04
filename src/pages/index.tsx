import { Link } from "react-router-dom";

export default function Index() {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 relative">
      
      {/* --- Full Background Image with Overlay --- */}
      <div 
        className="fixed inset-0 z-0 bg-cover bg-center"
        style={{ 
          backgroundImage: "url(src/assets/image/top-view-tasty-coffee-with-coffee-beans.jpg)",
        }}
      >
        {/* Dark Brownish Overlay */}
        <div className="absolute inset-0 bg-[#2c1a12]/70"></div>
      </div>

      {/* --- Navigation Bar --- */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-white/95 backdrop-blur-md shadow-md top-0">
        <div className="text-2xl font-serif font-bold text-[#3e2723] tracking-tighter flex items-center gap-2">
          <span className="bg-[#4a6741] text-white px-2 py-1 rounded">AROMISTA</span>
        </div>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-bold text-[#3e2723]">
          <a href="#" className="hover:text-[#4a6741] transition">Home</a>
          <a href="#" className="hover:text-[#4a6741] transition">Our Coffee</a>
          <a href="#" className="hover:text-[#4a6741] transition">Sustainability</a>
        </div>

        <div className="flex items-center space-x-4">
          <Link to="/login" className="text-sm font-bold text-[#3e2723] hover:text-[#4a6741]">Login</Link>
          <Link 
            to="/register" 
            className="px-6 py-2 bg-[#4a6741] text-white text-sm font-bold rounded-full hover:bg-[#3d5435] transition shadow-lg"
          >
            Register
          </Link>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <main className="relative z-10 flex flex-col items-center justify-center px-6 text-center py-20">
        <div className="max-w-4xl">
          <span className="inline-block px-4 py-1 rounded-full bg-[#4a6741]/20 border border-[#4a6741] text-[#a8c69f] text-xs font-bold uppercase tracking-[0.2em] mb-6">
            100% Organic & Handpicked
          </span>
          
          <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-tight mb-6">
            Pure Taste of <br />
            <span className="text-[#a8c69f]">Nature's Brew</span>
          </h1>
          
          <p className="text-gray-300 text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
            Experience the perfect harmony of rich <span className="text-white font-semibold text-nowrap underline decoration-[#4a6741]">Roasted Beans</span> and 
            fresh <span className="text-white font-semibold text-nowrap underline decoration-[#4a6741]">Natural Vibes</span>. 
            Crafted for the conscious coffee lover.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center">
            <button className="px-10 py-4 bg-[#4a6741] text-white rounded-full font-bold text-lg hover:bg-[#3d5435] hover:scale-105 transition-all shadow-2xl shadow-[#4a6741]/30">
              Order Your Coffee
            </button>
            <button className="px-10 py-4 bg-white text-[#3e2723] rounded-full font-bold text-lg hover:bg-gray-100 transition shadow-xl">
              View Menu
            </button>
          </div>
        </div>
      </main>

      {/* --- Footer (Sticks to bottom) --- */}
      <footer className="relative z-10 bg-[#1b110b] text-white py-12 px-6 md:px-12 border-t border-[#4a6741]/30">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12">
          
          {/* Brand & Theme info */}
          <div className="space-y-4">
            <h2 className="text-2xl font-serif font-bold text-[#a8c69f]">AROMISTA</h2>
            <p className="text-sm text-gray-400 leading-relaxed">
              We combine the deep, earthy tones of premium <b>Brown</b> roasted beans with the 
              fresh, <b>Green</b> spirit of nature.
            </p>
          </div>

          {/* Useful Links */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-[#a8c69f] font-bold mb-4 uppercase text-xs tracking-widest">Shop</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Beans</a></li>
                <li><a href="#" className="hover:text-white transition">Equipment</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#a8c69f] font-bold mb-4 uppercase text-xs tracking-widest">Company</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-white transition">Our Story</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm text-gray-400">
            <h3 className="text-[#a8c69f] font-bold mb-4 uppercase text-xs tracking-widest">Find Us</h3>
            <p>📍 Green Garden Walk, Colombo 03</p>
            <p>📞 +94 112 345 678</p>
            <p>✉️ hello@aromista.com</p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} Aromista Coffee Co. | Sustainably Brewed</p>
        </div>
      </footer>
    </div>
  );
}