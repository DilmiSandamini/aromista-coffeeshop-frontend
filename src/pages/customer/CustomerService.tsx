import { motion } from "framer-motion";
import { FaCoffee, FaTruck, FaLeaf, FaUserShield } from "react-icons/fa";

const services = [
    { icon: <FaCoffee />, title: "Artisan Brewing", desc: "Expertly crafted specialty coffee beans roasted to perfection." },
    { icon: <FaTruck />, title: "Swift Delivery", desc: "Freshly brewed coffee delivered to your doorstep in minutes." },
    { icon: <FaLeaf />, title: "Organic Sourcing", desc: "100% sustainably sourced beans from local mountain farmers." },
    { icon: <FaUserShield />, title: "Customer Care", desc: "Dedicated support team available 24/7 for your coffee needs." },
];

export default function CustomerService() {
    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            {/* Fixed Background */}
            <div className="fixed inset-0 z-0">
                <img className="w-full h-full object-cover brightness-[0.2]" src="/src/assets/image/Coffee Background.jpg" alt="BG" />
                <div className="absolute inset-0 bg-[#1b110b]/60 backdrop-blur-sm"></div>
            </div>

            <div className="relative z-10 max-w-6xl mx-auto pt-32 pb-20 px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-20">
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white uppercase tracking-tighter">
                        Our <span className="text-[#bc8a5f]">Concierge</span>
                    </h1>
                    <p className="text-stone-400 mt-4 uppercase tracking-[0.4em] text-[10px] font-black">Crafting moments, serving excellence</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((s, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -10 }}
                            className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[3rem] text-center group hover:bg-[#bc8a5f] transition-all duration-500"
                        >
                            <div className="text-4xl text-[#bc8a5f] group-hover:text-white mb-6 flex justify-center">{s.icon}</div>
                            <h3 className="text-white font-serif font-bold text-xl mb-4">{s.title}</h3>
                            <p className="text-stone-400 group-hover:text-white/80 text-sm leading-relaxed">{s.desc}</p>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 bg-white/5 backdrop-blur-md rounded-[3rem] border border-white/10 p-12 text-center">
                    <h2 className="text-3xl font-serif text-white mb-6 italic">"How can we perfect your cup today?"</h2>
                    <p className="text-stone-300 max-w-2xl mx-auto text-sm leading-relaxed">
                        Whether it's a bulk order for your workspace or a private tasting session, our team is here to provide an unparalleled artisan experience.
                    </p>
                </div>
            </div>
            
        </div>
        
    );
}