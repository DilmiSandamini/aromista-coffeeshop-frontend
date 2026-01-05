import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope, FaPaperPlane } from "react-icons/fa";

export default function CustomerContact() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Fixed Background */}
            <div className="fixed inset-0 z-0">
                <img className="w-full h-full object-cover brightness-[0.2]" src="/src/assets/image/Coffee Background.jpg" alt="BG" />
                <div className="absolute inset-0 bg-[#1b110b]/70 backdrop-blur-md"></div>
            </div>

            <div className="relative z-10 max-w-7xl mx-auto pt-32 pb-20 px-6 md:px-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
                    
                    {/* Left: Contact Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} className="space-y-12">
                        <div>
                            <h1 className="text-6xl font-serif font-bold text-white mb-6">Let's <span className="text-[#bc8a5f]">Connect</span></h1>
                            <p className="text-stone-400 text-lg">Visit us or drop a message to start a conversation about fine coffee.</p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#bc8a5f]/20 rounded-2xl flex items-center justify-center text-[#bc8a5f]"><FaMapMarkerAlt size={22}/></div>
                                <div><p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Our Roastery</p><p className="text-white text-lg">No 45, Artisan Lane, Kandy, SL</p></div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#bc8a5f]/20 rounded-2xl flex items-center justify-center text-[#bc8a5f]"><FaPhoneAlt size={22}/></div>
                                <div><p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Call Barista</p><p className="text-white text-lg">+94 11 234 5678</p></div>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="w-14 h-14 bg-[#bc8a5f]/20 rounded-2xl flex items-center justify-center text-[#bc8a5f]"><FaEnvelope size={22}/></div>
                                <div><p className="text-stone-500 text-[10px] font-black uppercase tracking-widest">Email Journal</p><p className="text-white text-lg">hello@aromista.com</p></div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right: Contact Form */}
                    <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-10 md:p-14 rounded-[3rem] shadow-2xl">
                        <form className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[#bc8a5f] tracking-widest">Full Name</label>
                                    <input type="text" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#bc8a5f]" placeholder="Enter your name" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase text-[#bc8a5f] tracking-widest">Email Address</label>
                                    <input type="email" className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#bc8a5f]" placeholder="Enter your email" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#bc8a5f] tracking-widest">Message Topic</label>
                                <select className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none focus:border-[#bc8a5f]">
                                    <option className="bg-[#1b110b]">General Inquiry</option>
                                    <option className="bg-[#1b110b]">Bulk Bean Orders</option>
                                    <option className="bg-[#1b110b]">Private Booking</option>
                                </select>
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase text-[#bc8a5f] tracking-widest">Message</label>
                                <textarea rows={4} className="w-full bg-white/5 border border-white/10 rounded-3xl px-6 py-4 text-white outline-none focus:border-[#bc8a5f]" placeholder="Tell us your coffee story..."></textarea>
                            </div>
                            <button className="w-full bg-[#bc8a5f] hover:bg-white hover:text-[#3e2723] text-white py-5 rounded-2xl font-black uppercase tracking-[0.3em] text-xs transition-all duration-500 flex items-center justify-center gap-3">
                                <FaPaperPlane /> Send Message
                            </button>
                        </form>
                    </motion.div>

                </div>
            </div>
        </div>
    );
}