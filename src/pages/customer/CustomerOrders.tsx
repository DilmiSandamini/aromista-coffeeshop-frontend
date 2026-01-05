import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaCoffee, FaReceipt, FaHistory, FaChevronRight } from "react-icons/fa";
import { getAllOrdersForUser } from "../../service/order";

export default function CustomerOrders() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                setLoading(true);
                const data = await getAllOrdersForUser();
                setOrders(data.orders || []);
            } catch (error) {
                console.error("Error loading orders:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case "PENDING": return "bg-amber-500/20 text-amber-400 border-amber-500/30";
            case "PROCESSING": return "bg-blue-500/20 text-blue-400 border-blue-500/30";
            case "COMPLETED": return "bg-green-500/20 text-green-400 border-green-500/30";
            case "CANCELLED": return "bg-red-500/20 text-red-400 border-red-500/30";
            default: return "bg-stone-500/20 text-stone-400 border-stone-500/30";
        }
    };

    return (
        <div className="relative min-h-screen w-full overflow-hidden">
            
            {/* 1. Fixed Aesthetic Background */}
            <div 
                className="fixed inset-0 w-full h-full z-0"
                style={{
                    backgroundImage: `url('/src/assets/image/top-view-tasty-coffee-with-coffee-beans.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                {/* Dark Overlay with Blur */}
                <div className="absolute inset-0 bg-[#1b110b]/80 backdrop-blur-[4px]"></div>
            </div>

            {/* 2. Scrollable Content Area */}
            <div className="relative z-10 max-w-6xl mx-auto pt-32 pb-24 px-6 md:px-10">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-16 space-y-4"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full text-[#bc8a5f] font-bold uppercase tracking-[0.4em] text-[9px] border border-white/10">
                        <FaHistory /> <span>Personal Archive</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-serif font-bold text-white leading-tight">
                        Order <span className="text-[#bc8a5f]">History</span>
                    </h1>
                    <div className="w-24 h-1 bg-[#bc8a5f] rounded-full"></div>
                </motion.div>

                {loading ? (
                    <div className="py-20 text-center space-y-4">
                        <div className="w-12 h-12 border-4 border-[#bc8a5f]/20 border-t-[#bc8a5f] rounded-full animate-spin mx-auto"></div>
                        <p className="italic text-[#bc8a5f] font-serif text-lg tracking-widest">Opening your coffee journal...</p>
                    </div>
                ) : orders.length > 0 ? (
                    <div className="space-y-8">
                        {orders.map((order, index) => (
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                key={order._id}
                                className="bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2.5rem] overflow-hidden hover:bg-white/[0.06] transition-all duration-500 group"
                            >
                                <div className="flex flex-col md:flex-row">
                                    
                                    {/* Left: Order Content */}
                                    <div className="flex-1 p-8 md:p-10">
                                        <div className="flex items-center justify-between mb-8 pb-6 border-b border-white/5">
                                            <div className="space-y-1">
                                                <p className="text-[10px] font-black text-stone-500 uppercase tracking-[0.2em]">Transaction ID</p>
                                                <h3 className="text-stone-200 font-bold text-sm tracking-widest uppercase">#{order._id.slice(-8)}</h3>
                                            </div>
                                            <span className={`px-5 py-2 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(order.status)}`}>
                                                {order.status}
                                            </span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                            {order.items.map((itemObj: any, i: number) => (
                                                <div key={i} className="flex items-center gap-4 group/item">
                                                    <div className="w-14 h-14 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                                                        <img src={itemObj.item?.imageUrl} className="w-full h-full object-cover transition-transform group-hover/item:scale-110" alt="" />
                                                    </div>
                                                    <div>
                                                        <p className="text-sm font-bold text-stone-200">{itemObj.item?.name}</p>
                                                        <p className="text-[10px] font-black text-[#bc8a5f] uppercase tracking-widest">Quantity: {itemObj.quantity}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Right: Summary Area */}
                                    <div className="bg-[#3e2723]/40 p-10 md:w-80 flex flex-col justify-center border-t md:border-t-0 md:border-l border-white/5 text-center md:text-right">
                                        <div className="space-y-1 mb-6">
                                            <p className="text-[10px] font-black text-[#bc8a5f] uppercase tracking-[0.3em]">Invested Total</p>
                                            <h4 className="text-3xl font-serif font-bold text-white">
                                                LKR {order.totalAmount.toLocaleString()}
                                            </h4>
                                        </div>
                                        <div className="pt-6 border-t border-white/5 space-y-1">
                                            <p className="text-[10px] text-stone-500 font-bold uppercase tracking-widest">Ordered On</p>
                                            <p className="text-xs text-stone-300 font-medium">
                                                {new Date(order.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}
                                            </p>
                                        </div>
                                    </div>
                                    
                                </div>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="py-32 text-center bg-white/5 backdrop-blur-2xl rounded-[3rem] border border-white/10"
                    >
                        <FaCoffee className="mx-auto text-white/10 mb-8" size={100} />
                        <h3 className="text-3xl font-serif text-stone-300 italic">"Your journal is empty."</h3>
                        <p className="text-[10px] uppercase tracking-[0.5em] text-[#bc8a5f] mt-6 font-black animate-pulse">
                            Let's start your coffee story
                        </p>
                    </motion.div>
                )}
            </div>
        </div>
    );
}