import React from "react";
import { Outlet } from "react-router-dom";
import AdminPanel from "../headers/AdminPanel";

function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-[#faf7f2] font-sans">
      {/* Sidebar - Fixed for desktop */}
      <AdminPanel />

      {/* Main Area */}
      <div className="flex-1 ml-64 flex flex-col">
        {/* Top Header Bar */}
        <header className="h-16 bg-white border-b border-stone-200 sticky top-0 z-40 flex items-center justify-between px-8 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#bc8a5f] uppercase tracking-widest">
              Aromista Control Center
            </span>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-[#4a6741] flex items-center justify-center text-white font-bold">
              A
            </div>
            <span className="text-sm font-semibold text-[#3e2723]">
              Admin Mode
            </span>
          </div>
        </header>

        {/* Content Area */}
        <main className="p-8 flex-grow">
          <div className="max-w-6xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;
