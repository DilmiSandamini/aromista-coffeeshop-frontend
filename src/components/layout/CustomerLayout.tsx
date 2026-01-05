import { Outlet } from "react-router-dom";
import CustomerHeader from "../headers/CustomerHeader";

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans selection:bg-[#4a6741] selection:text-white">
      <CustomerHeader />
      
      <main className="pt-24 pb-12">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>


    <footer className="w-full bg-[#1b110b] text-white py-16 border-t border-[#4a6741]/30 relative z-10">
      <div className="w-full px-6 md:px-12 lg:px-20">
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-6">
            <h2 className="text-3xl font-serif font-bold text-[#a8c69f] tracking-tighter">
              AROMISTA
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed max-w-xs">
              We combine the deep, earthy tones of premium <b>Brown</b> roasted beans with the 
              fresh, <b>Green</b> spirit of nature. Sustainably sourced, artisanally brewed.
            </p>
            <div className="flex space-x-4">
                <div className="w-8 h-8 rounded-full bg-[#4a6741]/20 flex items-center justify-center hover:bg-[#4a6741] transition cursor-pointer">f</div>
                <div className="w-8 h-8 rounded-full bg-[#4a6741]/20 flex items-center justify-center hover:bg-[#4a6741] transition cursor-pointer">in</div>
                <div className="w-8 h-8 rounded-full bg-[#4a6741]/20 flex items-center justify-center hover:bg-[#4a6741] transition cursor-pointer">ig</div>
            </div>
          </div>

          <div>
            <h3 className="text-[#a8c69f] font-bold mb-6 uppercase text-xs tracking-widest border-b border-[#4a6741]/30 pb-2 inline-block">
              Shop Selection
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Premium Coffee Beans</a></li>
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Brewing Equipment</a></li>
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Seasonal Blends</a></li>
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Gift Bundles</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[#a8c69f] font-bold mb-6 uppercase text-xs tracking-widest border-b border-[#4a6741]/30 pb-2 inline-block">
              Our Company
            </h3>
            <ul className="space-y-3 text-sm text-gray-400">
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Our Artisan Story</a></li>
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Sustainability Commitment</a></li>
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Careers</a></li>
              <li><a href="#" className="hover:text-[#a8c69f] hover:translate-x-1 transition-all inline-block">Contact Us</a></li>
            </ul>
          </div>

          <div className="space-y-4">
            <h3 className="text-[#a8c69f] font-bold mb-6 uppercase text-xs tracking-widest border-b border-[#4a6741]/30 pb-2 inline-block">
              Find Us
            </h3>
            <div className="space-y-4 text-sm text-gray-400">
              <div className="flex items-start space-x-3">
                <span className="text-[#4a6741]">📍</span>
                <span>Green Garden Walk, Colombo 03, Sri Lanka</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[#4a6741]">📞</span>
                <span>+94 112 345 678</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-[#4a6741]">✉️</span>
                <span>hello@aromista.com</span>
              </div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 text-[10px] font-bold uppercase tracking-widest text-gray-500">
          <p>© {new Date().getFullYear()} Aromista Coffee Co. | Sustainably Brewed</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
    </div>
  );
}

export default CustomerLayout;