import React from "react";
import { Outlet } from "react-router-dom";
import CustomerHeader from "../headers/CustomerHeader";

function CustomerLayout() {
  return (
    <div className="min-h-screen bg-[#faf7f2] font-sans selection:bg-[#4a6741] selection:text-white">
      {/* පාරිභෝගිකයාට සැමවිටම ඉහළින් පෙනෙන Header එක */}
      <CustomerHeader />
      
      {/* පිටුවල ප්‍රධාන අන්තර්ගතය මෙතැනින් දර්ශනය වේ */}
      <main className="pt-24 pb-12">
        <div className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Footer එකක් අවශ්‍ය නම් මෙතැනට ඇතුළත් කළ හැකියි */}
      <footer className="py-10 text-center border-t border-stone-100">
        <p className="text-xs text-stone-400 font-medium uppercase tracking-widest">
          © 2025 Aromista Coffee House. Brewed with Passion.
        </p>
      </footer>
    </div>
  );
}

export default CustomerLayout;