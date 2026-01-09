import { motion } from "framer-motion";
import { FaHistory, FaLeaf, FaHeart, FaCoffee } from "react-icons/fa";

export default function About() {
  return (
    <div className="relative min-h-screen w-full">
      {/* --- Fixed Background Image --- */}
      <div 
        className="fixed inset-0 w-full h-full z-0"
        style={{
          backgroundImage: `url('https://i.ibb.co/G38W9V0G/top-view-tasty-coffee-with-coffee-beans.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed' 
        }}
      >
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      {/* --- Scrollable Content --- */}
      <div className="relative z-10 w-full">
        {/* Main Content Area */}
        <div className="max-w-4xl mx-auto px-6 pt-32 pb-20">
          
          {/* Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center mb-32"
          >
            <span className="text-[#bc8a5f] font-black uppercase tracking-[0.5em] text-[10px] mb-4 block">
              Our Artisan Story
            </span>
            <h1 className="text-5xl md:text-8xl font-serif font-bold text-white leading-tight">
              Brewed with <br /> <span className="italic text-[#FAF9F6]">Passion.</span>
            </h1>
            <div className="w-20 h-[1px] bg-[#bc8a5f] mx-auto mt-10"></div>
          </motion.div>

          {/* Story Blocks */}
          <div className="space-y-40">
            
            {/* Block 1: The Origin */}
            <motion.section 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1.5 }}
              className="bg-white/10 backdrop-blur-xl p-10 md:p-20 rounded-[40px] border border-white/10"
            >
              <div className="flex items-center gap-4 mb-8 text-[#bc8a5f]">
                <FaHistory size={24} />
                <h2 className="text-2xl font-serif font-bold text-white uppercase tracking-widest">The Beginning</h2>
              </div>
              <p className="text-stone-200 text-xl md:text-2xl leading-relaxed font-serif italic">
                Aromista started in 2025 with a simple dream: to serve more than just coffee. 
                We wanted to create a sanctuary where the rich aroma of hand-roasted beans 
                meets the warmth of a community. Every cup we brew is a tribute to the 
                farmers who nurture the soil.
              </p>
            </motion.section>

            {/* Block 2: Our Values Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10"
              >
                <FaLeaf className="text-[#4a6741] mb-6" size={30} />
                <h3 className="text-white text-xl font-bold mb-4">Ethical Sourcing</h3>
                <p className="text-stone-400 text-sm leading-loose uppercase tracking-wider">
                  We partner directly with small-scale farmers to ensure every bean is 
                  traded fairly and grown sustainably.
                </p>
              </motion.div>

              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-white/5 backdrop-blur-md p-10 rounded-[40px] border border-white/10"
              >
                <FaHeart className="text-rose-400 mb-6" size={30} />
                <h3 className="text-white text-xl font-bold mb-4">Crafted with Love</h3>
                <p className="text-stone-400 text-sm leading-loose uppercase tracking-wider">
                  Our baristas are artisans who see every pour as an art form, 
                  ensuring your perfect cup, every single time.
                </p>
              </motion.div>
            </div>

            {/* Block 3: Final Quote */}
            <motion.section 
              initial={{ scale: 0.9, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              className="text-center py-20"
            >
              <FaCoffee className="text-white/20 mx-auto mb-10" size={60} />
              <h2 className="text-3xl md:text-5xl font-serif text-white italic leading-relaxed">
                "We don't just make coffee. <br /> We make your morning better."
              </h2>
              <p className="mt-8 text-[#bc8a5f] font-black uppercase tracking-[0.4em] text-xs">
                — Aromista House —
              </p>
            </motion.section>

          </div>
        </div>
      </div>
    </div>
  );
}