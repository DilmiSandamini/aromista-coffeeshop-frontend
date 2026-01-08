import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCoffee, FaBell, FaSyncAlt, FaUser, FaMugHot } from "react-icons/fa";
import { getAllOrdersForBaristor, updateOrderStatus } from "../../service/order";
import { showAlert } from "../../components/mini_components/Swail";

export default function BaristorDashboard() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newOrderCount, setNewOrderCount] = useState(0);

    const fetchOrders = async () => {
        try {
            const res = await getAllOrdersForBaristor();
            const activeOrders = res.orders.filter((o: any) => 
                o.status === "PENDING" || o.status === "PROCESSING"
            );
            
            if (activeOrders.length > orders.length && orders.length !== 0) {
                setNewOrderCount(prev => prev + 1);
                playNotificationSound();
            }
            setOrders(activeOrders);
        } catch (error) {
            console.error("Order fetch failed");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders();
        const interval = setInterval(fetchOrders, 20000); 
        return () => clearInterval(interval);
    }, [orders.length]);

    const playNotificationSound = () => {
        const audio = new Audio("https://assets.mixkit.co/active_storage/sfx/2358/2358-preview.mp3");
        audio.play().catch(() => {});
    };

    const handleStatusUpdate = async (orderId: string, status: string) => {
        try {
            await updateOrderStatus(orderId, status);
            showAlert({ icon: "success", title: `Order set to ${status}` });
            
            
            fetchOrders(); 
        } catch (error) {
            showAlert({ icon: "error", title: "Update Failed" });
        }
    };

    return (
        <div className="min-h-screen bg-[#0f0a07] text-stone-200 p-6 md:p-12 overflow-hidden relative font-sans">
            {/* Background Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#bc8a5f]/5 blur-[100px] rounded-full pointer-events-none" />

            <header className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-6 mb-16 border-b border-white/5 pb-10">
                <div>
                    <h1 className="text-5xl font-serif font-black tracking-tighter">
                        BREW <span className="text-[#bc8a5f]">QUEUE</span>
                    </h1>
                    <p className="text-stone-500 uppercase tracking-[0.4em] text-[10px] mt-2 font-black">Managing Live Coffee Flow</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="bg-white/5 backdrop-blur-xl border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-4">
                        <FaBell className={newOrderCount > 0 ? "text-[#bc8a5f] animate-bounce" : "text-stone-600"} />
                        <span className="text-sm font-bold">{orders.length} Active Orders</span>
                    </div>
                    <button onClick={fetchOrders} className="p-4 bg-[#bc8a5f] text-white rounded-2xl hover:bg-white hover:text-[#3e2723] transition-all duration-500">
                        <FaSyncAlt className={loading ? "animate-spin" : ""} />
                    </button>
                </div>
            </header>

            {/* Orders List Container - ඇණවුම් පහළට Load වේ */}
            <div className="relative z-10 max-w-4xl mx-auto space-y-6 overflow-y-auto max-h-[70vh] pr-4 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order._id}
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 100, transition: { duration: 0.3 } }}
                            transition={{ delay: index * 0.1 }}
                            className={`relative bg-[#16110e] border border-white/5 rounded-[2.5rem] p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all ${
                                order.status === "PROCESSING" ? "ring-2 ring-[#bc8a5f]/50 bg-[#1c1511]" : ""
                            }`}
                        >
                            {/* User & ID Section */}
                            <div className="flex items-center gap-6 flex-1 min-w-[200px]">
                                <div className={`w-16 h-16 rounded-[1.5rem] flex items-center justify-center text-2xl shadow-inner ${
                                    order.status === 'PROCESSING' ? 'bg-[#bc8a5f] text-white' : 'bg-white/5 text-stone-600'
                                }`}>
                                    <FaUser size={24} />
                                </div>
                                <div>
                                    <h4 className="text-xl font-bold text-stone-100">{order.userId?.fullname || "Guest"}</h4>
                                    <p className="font-mono text-[10px] text-[#bc8a5f] uppercase tracking-widest mt-1">Order ID: #{order._id.slice(-6).toUpperCase()}</p>
                                </div>
                            </div>

                            {/* Items Section - පේළියට පෙන්වයි */}
                            <div className="flex-1 space-y-2 border-l border-white/5 pl-8 hidden md:block">
                                {order.items.map((i: any, idx: number) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <FaMugHot className="text-stone-700" size={12} />
                                        <span className="text-stone-400 text-sm font-medium">{i.item?.name}</span>
                                        <span className="text-[#bc8a5f] font-black text-xs">x{i.quantity}</span>
                                    </div>
                                ))}
                            </div>

                            {/* Control Buttons */}
                            <div className="flex flex-col gap-2 w-full md:w-auto min-w-[180px]">
                                {order.status === "PENDING" ? (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleStatusUpdate(order._id, "PROCESSING")}
                                        className="w-full py-4 bg-white/5 border border-white/10 hover:border-[#bc8a5f] text-stone-100 rounded-2xl font-black uppercase text-[10px] tracking-widest transition-all"
                                    >
                                        Accept & Brew
                                    </motion.button>
                                ) : (
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleStatusUpdate(order._id, "COMPLETED")}
                                        className="w-full py-4 bg-[#bc8a5f] text-white rounded-2xl font-black uppercase text-[10px] tracking-widest shadow-xl shadow-[#bc8a5f]/10 transition-all"
                                    >
                                        Hand to Customer
                                    </motion.button>
                                )
                                }
                                <div className="text-center">
                                    <span className={`text-[8px] font-black uppercase tracking-[0.3em] ${order.status === 'PROCESSING' ? 'text-amber-500 animate-pulse' : 'text-stone-600'}`}>
                                        Current: {order.status}
                                    </span>
                                </div>
                            </div>
                            
                            {/* Small Mobile Items View */}
                            <div className="md:hidden w-full flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {order.items.map((i: any, idx: number) => (
                                    <span key={idx} className="bg-white/5 px-3 py-1 rounded-full text-[9px] font-bold">{i.item?.name} x{i.quantity}</span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {orders.length === 0 && !loading && (
                    <div className="text-center py-32 space-y-6">
                        <FaCoffee size={50} className="mx-auto text-stone-800" />
                        <p className="text-stone-500 font-serif italic text-xl">All pots are served. The queue is empty.</p>
                    </div>
                )}
            </div>
        </div>
    );
}