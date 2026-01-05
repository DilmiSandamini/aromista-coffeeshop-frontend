import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight, FaCoffee, FaList, FaUtensils } from "react-icons/fa";
import { Button } from "../../components/mini_components/Button";
import { getAllItemsForCustomer } from "../../service/item";
import { getAllCategories } from "../../service/category";
import { ItemCard } from "../../components/ItemCard";

export default function CustomerDashBoard() {
    // --- States ---
    const [items, setItems] = useState<any[]>([]);
    const [categories, setCategories] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState("ALL");
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // --- Data Fetching ---
    useEffect(() => {
        const loadDashboardData = async () => {
            try {
                setLoading(true);
                const [itemRes, catRes] = await Promise.all([
                    getAllItemsForCustomer(),
                    getAllCategories()
                ]);
                setItems(itemRes.items || []);
                setCategories(catRes.categories || catRes || []);
            } catch (error) {
                console.error("Error loading data:", error);
            } finally {
                setLoading(false);
            }
        };
        loadDashboardData();
    }, []);

    // --- Filtering Logic ---
    const filteredItems = selectedCategory === "ALL" 
        ? items 
        : items.filter(item => item.category === selectedCategory);

    return (
        <div className="relative w-full bg-[#faf9f6]">
            
            {/* 1. Full Screen Hero Section */}
            <section className="relative h-screen w-full overflow-hidden -mt-24 mb-20">
                <img 
                    className="absolute inset-0 w-full h-full object-cover" 
                    src="/src/assets/image/Coffee wallpaper 01.jpeg" 
                    alt="Hero Background" 
                />
                <div className="absolute inset-0 bg-black/40"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-[#1b110b] via-[#1b110b]/40 to-transparent"></div>

                <div className="relative h-full flex flex-col justify-center px-10 md:px-24 lg:px-32">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                        className="max-w-3xl space-y-8"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-[#eaddcf] font-bold uppercase tracking-[0.3em] text-[10px] border border-white/10">
                            <FaCoffee className="text-[#bc8a5f]" /> <span>Established 2025 • Aromista House</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-serif font-bold text-white leading-[1.1]">
                            The Art of <br /> <span className="text-[#bc8a5f]">Fine Brewing</span>
                        </h1>
                        <p className="text-stone-200 text-lg md:text-2xl max-w-xl font-medium leading-relaxed italic opacity-90">
                            "Start your morning with the rich aroma of hand-roasted beans. Crafting stories in every single cup."
                        </p>
                        <Button className="px-12 py-5 text-lg shadow-2xl">
                            Order Now <FaArrowRight className="ml-3 text-sm" />
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* 2. Main Menu Section */}
            <section className="max-w-[1600px] mx-auto px-6 pb-32">
                <div className="flex flex-col lg:flex-row gap-12">
                    
                    {/* --- Left Sidebar: Categories (Desktop Only) --- */}
                    <aside className="hidden lg:block lg:w-1/5">
                        <div className="sticky top-32 space-y-10">
                            <div className="relative">
                                <span className="text-[#4a6741] font-black uppercase tracking-[0.4em] text-[10px] block mb-2">Selection</span>
                                <h3 className="text-3xl font-serif font-bold text-[#3e2723]">Categories</h3>
                                <div className="w-12 h-[2px] bg-[#bc8a5f] mt-4"></div>
                            </div>
                            <nav className="flex flex-col gap-3">
                                <button 
                                    onClick={() => setSelectedCategory("ALL")}
                                    className={`group flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500
                                    ${selectedCategory === "ALL" ? "bg-[#3e2723] text-white shadow-xl translate-x-2" : "text-stone-400 hover:bg-stone-100"}`}
                                >
                                    <span>All Selections</span>
                                    <FaList className={selectedCategory === "ALL" ? "text-[#bc8a5f]" : "opacity-0"} />
                                </button>
                                {categories.map((cat) => (
                                    <button 
                                        key={cat._id}
                                        onClick={() => setSelectedCategory(cat.categoryName)}
                                        className={`group flex items-center justify-between px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all duration-500
                                        ${selectedCategory === cat.categoryName ? "bg-[#3e2723] text-white shadow-xl translate-x-2" : "text-stone-400 hover:bg-stone-100"}`}
                                    >
                                        <span>{cat.categoryName}</span>
                                        <FaCoffee className={selectedCategory === cat.categoryName ? "text-[#bc8a5f]" : "opacity-0"} />
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    {/* --- Center Section: Promo, Mobile Menu & Items --- */}
                    <main className="lg:w-3/5 w-full">
                        
                        {/* Mobile Views (Promo & Filter) */}
                        <div className="lg:hidden space-y-4 mb-10">
                            <div className="bg-[#4a6741] p-8 rounded-[2.5rem] text-white relative overflow-hidden">
                                <FaCoffee className="absolute -right-6 -bottom-6 text-white/10 rotate-12" size={120} />
                                <h5 className="text-2xl font-serif font-bold text-[#eaddcf]">20% OFF</h5>
                                <p className="text-white/70 text-[10px] uppercase tracking-widest mt-1">Use Code: AROMISTA20</p>
                            </div>

                            <div className="relative">
                                <button 
                                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                                    className="w-full flex items-center justify-between bg-white p-5 rounded-3xl border border-stone-100 shadow-sm font-bold text-[#3e2723] text-xs uppercase tracking-widest"
                                >
                                    <span>{selectedCategory === "ALL" ? "Browse Categories" : `Category: ${selectedCategory}`}</span>
                                    <motion.div animate={{ rotate: isMobileMenuOpen ? 180 : 0 }}><FaList className="text-[#bc8a5f]" /></motion.div>
                                </button>
                                <AnimatePresence>
                                    {isMobileMenuOpen && (
                                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden bg-white mt-2 rounded-3xl border border-stone-50 p-2 grid grid-cols-2 gap-2 shadow-2xl relative z-50">
                                            <button onClick={() => {setSelectedCategory("ALL"); setIsMobileMenuOpen(false)}} className={`p-3 rounded-2xl text-[10px] font-bold uppercase ${selectedCategory === "ALL" ? "bg-[#3e2723] text-white" : "bg-stone-50"}`}>All</button>
                                            {categories.map(cat => (
                                                <button key={cat._id} onClick={() => {setSelectedCategory(cat.categoryName); setIsMobileMenuOpen(false)}} className={`p-3 rounded-2xl text-[10px] font-bold uppercase ${selectedCategory === cat.categoryName ? "bg-[#3e2723] text-white" : "bg-stone-50"}`}>{cat.categoryName}</button>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Section Header */}
                        <div className="flex justify-between items-center mb-16 pb-8 border-b border-stone-100">
                            <h4 className="text-3xl md:text-5xl font-serif font-bold text-[#3e2723] capitalize">
                                {selectedCategory === "ALL" ? "The Collection" : selectedCategory}
                            </h4>
                            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-stone-50 rounded-full border border-stone-100">
                               <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                               <span className="text-[10px] font-bold text-stone-500 uppercase tracking-widest">Live Menu</span>
                            </div>
                        </div>

                        {/* Items List */}
                        {loading ? (
                            <div className="flex justify-center py-20 italic text-stone-400 font-serif">Brewing Excellence...</div>
                        ) : (
                            <div className="space-y-20">
                                <AnimatePresence mode="wait">
                                    {filteredItems.length > 0 ? (
                                        filteredItems.map((item, index) => (
                                            <ItemCard key={item._id} item={item} index={index} />
                                        ))
                                    ) : (
                                        <div className="text-center py-20 bg-white rounded-[40px] border border-dashed border-stone-200">
                                            <FaUtensils className="mx-auto text-stone-100 mb-4" size={50} />
                                            <p className="text-stone-400 italic">No items found in this selection.</p>
                                        </div>
                                    )}
                                </AnimatePresence>
                            </div>
                        )}
                    </main>

                    {/* --- Right Sidebar: Info (Desktop Only) --- */}
                    <aside className="hidden lg:block lg:w-1/5 space-y-12">
                        <div className="sticky top-32 space-y-12">
                            <div className="bg-[#4a6741] p-8 rounded-[40px] text-white overflow-hidden relative shadow-2xl">
                                <FaCoffee className="absolute -right-4 -bottom-4 text-white/10 rotate-12" size={150} />
                                <span className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80">Seasonal Offer</span>
                                <h5 className="text-2xl font-serif font-bold mt-2">Get 20% Off</h5>
                                <p className="text-white/70 text-xs mt-3 leading-relaxed italic">"On your first artisan blend order this week."</p>
                                <div className="mt-6 py-2 px-4 bg-white/10 rounded-xl border border-white/20 text-center text-[10px] font-black">CODE: AROMISTA20</div>
                            </div>
                            <div className="px-2 space-y-8 text-left">
                                <div className="space-y-2">
                                    <p className="text-[#bc8a5f] text-[10px] font-black uppercase tracking-[0.3em]">Quality</p>
                                    <h6 className="text-sm font-bold text-[#3e2723]">100% Organic</h6>
                                    <p className="text-stone-400 text-[11px] leading-relaxed">Directly sourced from sustainable artisan farms.</p>
                                </div>
                                <div className="space-y-2">
                                    <p className="text-[#bc8a5f] text-[10px] font-black uppercase tracking-[0.3em]">Service</p>
                                    <h6 className="text-sm font-bold text-[#3e2723]">Quick Pickup</h6>
                                    <p className="text-stone-400 text-[11px] leading-relaxed">Ready for you in just 15 minutes.</p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </div>
    );
}