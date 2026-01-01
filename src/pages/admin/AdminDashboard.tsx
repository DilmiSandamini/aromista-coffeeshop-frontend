import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaCoffee, FaTruck, FaMoneyBillWave, FaChartLine } from "react-icons/fa";
import { getAllOrdersForAdmin } from "../../service/order";
import { getAllUsers } from "../../service/auth";
import { getAllItemsForAdmin } from "../../service/item";
import { Table } from "../../components/mini_components/Table";

export default function AdminDashboard() {
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalItems: 0,
        pendingOrders: 0,
        totalRevenue: 0,
        activeBookings: 0
    });
    const [recentOrders, setRecentOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                setLoading(true);
                const [ordersRes, usersRes, itemsRes] = await Promise.all([
                    getAllOrdersForAdmin(),
                    getAllUsers(),
                    getAllItemsForAdmin()
                ]);

                const orders = ordersRes.orders || [];
                const revenue = orders
                    .filter((o: any) => o.status === "COMPLETED")
                    .reduce((acc: number, curr: any) => acc + curr.totalAmount, 0);

                const pending = orders.filter((o: any) => o.status === "PENDING").length;

                setStats({
                    totalUsers: usersRes.pagination?.total || 0,
                    totalItems: itemsRes.items?.length || 0,
                    pendingOrders: pending,
                    totalRevenue: revenue,
                    activeBookings: 0 
                });

                setRecentOrders(orders.slice(0, 5));
            } catch (error) {
                console.error("Dashboard data fetch error:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const cards = [
        { label: "Revenue", value: `LKR ${stats.totalRevenue.toLocaleString()}`, icon: <FaMoneyBillWave />, color: "bg-emerald-500", trend: "Lifetime" },
        { label: "Artisan Items", value: stats.totalItems, icon: <FaCoffee />, color: "bg-[#4a6741]", trend: "In Menu" },
        { label: "Active Users", value: stats.totalUsers, icon: <FaUsers />, color: "bg-blue-500", trend: "Total" },
        { label: "Pending Orders", value: stats.pendingOrders, icon: <FaTruck />, color: "bg-amber-500", trend: "To Process" },
    ];

    if (loading) return <div className="py-20 text-center italic text-stone-400 animate-pulse font-serif">Brewing Dashboard Data...</div>;

    return (
        <div className="animate-fade-in space-y-10 pb-10">
            {/* Welcome Header */}
            <div>
                <h1 className="text-4xl font-serif font-bold text-[#3e2723]">Admin Overview</h1>
                <p className="text-stone-500 mt-2 italic flex items-center gap-2 text-sm">
                    <FaChartLine className="text-[#bc8a5f]" /> Here is what's happening at Aromista today.
                </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {cards.map((card, i) => (
                    <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-stone-100 shadow-sm hover:shadow-xl transition-all group"
                    >
                        <div className="flex justify-between items-start mb-6">
                            <div className={`${card.color} w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-lg group-hover:scale-110 transition-transform duration-500 text-2xl`}>
                                {/* මෙතැනදී React.cloneElement වෙනුවට Icon එක කෙලින්ම Render කිරීම වඩාත් හොඳයි */}
                                {card.icon}
                            </div>
                            <span className="text-[10px] font-black bg-stone-50 text-stone-400 px-3 py-1 rounded-full uppercase tracking-widest">{card.trend}</span>
                        </div>
                        <p className="text-[10px] font-black text-stone-300 uppercase tracking-[0.2em]">{card.label}</p>
                        <h3 className="text-2xl font-bold text-[#3e2723] mt-1">{card.value}</h3>
                    </motion.div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                {/* Recent Orders Table */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="flex justify-between items-center px-4">
                        <h2 className="text-xl font-serif font-bold text-[#3e2723]">Recent Ledger</h2>
                        <button className="text-[10px] font-black uppercase text-[#bc8a5f] hover:underline tracking-widest">View All Orders</button>
                    </div>
                    <div className="bg-white rounded-[2.5rem] border border-stone-100 overflow-hidden shadow-sm">
                        <Table headers={["Customer", "Total", "Status"]}>
                            {recentOrders.map((order) => (
                                <tr key={order._id} className="hover:bg-stone-50 transition-colors border-b border-stone-50 last:border-0">
                                    <td className="px-6 py-4">
                                        <p className="text-sm font-bold text-[#3e2723]">{order.userId?.fullname || "Guest"}</p>
                                        <p className="text-[10px] text-stone-400">{order.userId?.email}</p>
                                    </td>
                                    <td className="px-6 py-4 font-black text-[#4a6741] text-sm">LKR {order.totalAmount}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${
                                            order.status === 'COMPLETED' ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                        }`}>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </Table>
                    </div>
                </div>

                {/* System Pulse Card */}
                <div className="space-y-6">
                    <h2 className="text-xl font-serif font-bold text-[#3e2723] px-4">System Pulse</h2>
                    <div className="bg-[#3e2723] rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group min-h-[350px]">
                        {/* Background Icon Decoration */}
                        <FaCoffee className="absolute -right-10 -bottom-10 text-white/5 rotate-12 group-hover:scale-125 transition-transform duration-1000" size={250} />
                        
                        <div className="relative z-10 h-full flex flex-col justify-between">
                            <div className="space-y-6">
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bc8a5f]">Daily Motivation</p>
                                <h3 className="text-2xl font-serif italic leading-relaxed">"Success is a science; if you have the conditions, you get the result."</h3>
                            </div>
                            
                            <div className="pt-6 border-t border-white/10 mt-10">
                                <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-3 italic">Inventory Health</p>
                                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                                    <div className="bg-[#bc8a5f] h-full w-[85%] rounded-full shadow-[0_0_15px_#bc8a5f]"></div>
                                </div>
                                <div className="flex justify-between items-center mt-3">
                                    <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest">Efficiency</p>
                                    <p className="text-[10px] text-[#bc8a5f] font-black italic">85% Optimized</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}