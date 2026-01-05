import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaBell, FaGlobe, FaCamera, FaSave } from "react-icons/fa";
import { Button } from "../../components/mini_components/Button";
import { showAlert } from "../../components/mini_components/Swail";

export default function AdminSettings() {
    const [activeTab, setActiveTab] = useState("profile");

    // Profile State
    const [profile, setProfile] = useState({
        fullname: "Admin Aromista",
        email: "admin@aromista.com",
        contact: "0771234567"
    });

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();
        showAlert({ icon: "success", title: "Saved!", text: "Profile details updated." });
    };

    const tabs = [
        { id: "profile", label: "Profile Info", icon: <FaUser /> },
        { id: "security", label: "Security", icon: <FaLock /> },
        { id: "system", label: "Preferences", icon: <FaGlobe /> },
    ];

    return (
        <div className="animate-fade-in pb-20 px-4">
            {/* Header */}
            <div className="mb-12">
                <h1 className="text-3xl font-serif font-bold text-[#3e2723]">System Settings</h1>
                <p className="text-stone-500 italic">Configure your artisan dashboard preferences.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                
                {/* Sidebar Tabs */}
                <div className="lg:col-span-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold text-sm transition-all duration-300 ${
                                activeTab === tab.id 
                                ? "bg-[#3e2723] text-white shadow-lg shadow-[#3e2723]/20" 
                                : "text-stone-400 hover:bg-stone-100 hover:text-[#3e2723]"
                            }`}
                        >
                            {tab.icon} {tab.label}
                        </button>
                    ))}
                </div>

                {/* Main Settings Area */}
                <div className="lg:col-span-3 bg-white border border-stone-100 rounded-[2.5rem] p-10 shadow-sm">
                    
                    {activeTab === "profile" && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-10">
                            <div className="flex items-center gap-8 pb-10 border-b border-stone-100">
                                <div className="relative group">
                                    <div className="w-24 h-24 bg-[#f4f1ea] rounded-[2rem] overflow-hidden border-2 border-[#bc8a5f]/20 group-hover:brightness-75 transition-all">
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Admin" alt="Avatar" />
                                    </div>
                                    <button className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                        <FaCamera />
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-[#3e2723]">{profile.fullname}</h3>
                                    <p className="text-stone-400 text-xs font-medium uppercase tracking-widest mt-1">Master Roaster (Admin)</p>
                                </div>
                            </div>

                            <form onSubmit={handleUpdateProfile} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">Full Name</label>
                                    <input type="text" value={profile.fullname} className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 text-sm outline-none focus:border-[#bc8a5f]" onChange={(e) => setProfile({...profile, fullname: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">Email Address</label>
                                    <input type="email" value={profile.email} className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 text-sm outline-none focus:border-[#bc8a5f]" onChange={(e) => setProfile({...profile, email: e.target.value})} />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">Contact Number</label>
                                    <input type="text" value={profile.contact} className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 text-sm outline-none focus:border-[#bc8a5f]" onChange={(e) => setProfile({...profile, contact: e.target.value})} />
                                </div>
                                <div className="md:col-span-2 pt-4">
                                    <Button className="px-10 py-4"><FaSave className="mr-2" /> Save Changes</Button>
                                </div>
                            </form>
                        </motion.div>
                    )}

                    {activeTab === "security" && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <h3 className="text-xl font-bold text-[#3e2723] mb-6">Update Password</h3>
                            <div className="max-w-md space-y-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">Current Password</label>
                                    <input type="password" placeholder="••••••••" className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 text-sm outline-none focus:border-[#bc8a5f]" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-stone-400 tracking-widest ml-2">New Password</label>
                                    <input type="password" placeholder="Min 8 characters" className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 text-sm outline-none focus:border-[#bc8a5f]" />
                                </div>
                                <Button className="w-full py-4">Reset Password</Button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === "system" && (
                        <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="space-y-8">
                            <h3 className="text-xl font-bold text-[#3e2723]">Dashboard Preferences</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-6 bg-stone-50 rounded-2xl">
                                    <div className="flex items-center gap-4">
                                        <FaBell className="text-[#bc8a5f]" />
                                        <div>
                                            <p className="font-bold text-sm text-[#3e2723]">Order Notifications</p>
                                            <p className="text-[10px] text-stone-400">Receive alerts for new incoming artisan orders.</p>
                                        </div>
                                    </div>
                                    <input type="checkbox" className="w-5 h-5 accent-[#3e2723]" defaultChecked />
                                </div>
                                <div className="flex items-center justify-between p-6 bg-stone-50 rounded-2xl opacity-50">
                                    <div className="flex items-center gap-4">
                                        <FaGlobe className="text-[#bc8a5f]" />
                                        <div>
                                            <p className="font-bold text-sm text-[#3e2723]">Dark Mode (Beta)</p>
                                            <p className="text-[10px] text-stone-400">Switch between light and dark artisan theme.</p>
                                        </div>
                                    </div>
                                    <span className="text-[8px] font-black uppercase bg-stone-200 px-2 py-1 rounded">Coming Soon</span>
                                </div>
                            </div>
                        </motion.div>
                    )}

                </div>
            </div>
        </div>
    );
}