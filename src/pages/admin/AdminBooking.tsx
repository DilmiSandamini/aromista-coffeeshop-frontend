import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCalendarAlt, FaClock, FaUser, FaChair, FaCheck, FaTimes, FaTrashAlt, FaFilter } from "react-icons/fa";
import { Table } from "../../components/mini_components/Table";
import { showAlert } from "../../components/mini_components/Swail";
import { getAllBookings, updateBookingStatus, deleteBooking } from "../../service/booking";

export default function AdminBooking() {
    const [bookings, setBookings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState("ALL");

    useEffect(() => {
        fetchBookings();
    }, []);

    const fetchBookings = async () => {
        try {
            setLoading(true);
            const res = await getAllBookings();
            setBookings(res.bookings || []);
        } catch (error) {
            console.error("Booking fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await updateBookingStatus(id, status);
            showAlert({ icon: "success", title: `Booking ${status}` });
            fetchBookings();
        } catch (error: any) {
            showAlert({ icon: "error", title: "Update Failed", text: error.response?.data?.message });
        }
    };

    const handleDelete = async (id: string) => {
        const confirm = await showAlert({
            icon: "warning",
            title: "Delete Reservation?",
            text: "This will permanently remove this booking from the system.",
            showCancelButton: true,
            confirmButtonText: "Yes, Delete"
        });

        if (confirm.isConfirmed) {
            try {
                await deleteBooking(id);
                showAlert({ icon: "success", title: "Deleted!" });
                fetchBookings();
            } catch (error) {
                showAlert({ icon: "error", title: "Delete Failed" });
            }
        }
    };

    const filteredBookings = filterStatus === "ALL" 
        ? bookings 
        : bookings.filter(b => b.status === filterStatus);

    return (
        <div className="animate-fade-in p-6 space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-stone-100 pb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#3e2723]">Reservation Ledger</h1>
                    <p className="text-stone-500 italic text-sm">Manage guest table bookings and schedule flow.</p>
                </div>

                {/* Filter Controls */}
                <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-stone-100 shadow-sm">
                    <FaFilter className="ml-3 text-stone-300" size={12} />
                    <select 
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="bg-transparent outline-none text-[10px] font-black uppercase tracking-widest px-4 py-2 cursor-pointer text-[#4a6741]"
                    >
                        <option value="ALL">All Requests</option>
                        <option value="PENDING">Pending</option>
                        <option value="CONFIRMED">Confirmed</option>
                        <option value="CANCELLED">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Quick Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {[
                    { label: "Pending", count: bookings.filter(b => b.status === 'PENDING').length, color: "text-amber-500" },
                    { label: "Confirmed", count: bookings.filter(b => b.status === 'CONFIRMED').length, color: "text-green-600" },
                    { label: "Cancelled", count: bookings.filter(b => b.status === 'CANCELLED').length, color: "text-red-400" },
                    { label: "Total", count: bookings.length, color: "text-[#3e2723]" }
                ].map((stat, i) => (
                    <div key={i} className="bg-white p-5 border border-stone-100 shadow-sm">
                        <p className="text-[9px] font-black uppercase tracking-widest text-stone-400 mb-1">{stat.label}</p>
                        <h3 className={`text-2xl font-serif font-bold ${stat.color}`}>{stat.count}</h3>
                    </div>
                ))}
            </div>

            {/* Bookings Table */}
            {loading ? (
                <div className="py-20 text-center space-y-4">
                    <div className="w-10 h-10 border-4 border-[#4a6741] border-t-transparent rounded-full animate-spin mx-auto"></div>
                    <p className="italic text-stone-400 font-serif">Brewing booking data...</p>
                </div>
            ) : (
                <Table headers={["Customer Details", "Schedule", "Table", "Status", "Actions"]}>
                    <AnimatePresence>
                        {filteredBookings.length > 0 ? (
                            filteredBookings.map((booking, index) => (
                                <motion.tr 
                                    layout
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ delay: index * 0.05 }}
                                    key={booking._id} 
                                    className="hover:bg-[#faf7f2]/50 border-b border-stone-50 group"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-[#eaddcf] flex items-center justify-center text-[#3e2723] font-bold">
                                                <FaUser size={14}/>
                                            </div>
                                            <div>
                                                <p className="font-bold text-[#3e2723] text-sm">{booking.userId?.fullname || "Unknown Guest"}</p>
                                                <p className="text-[10px] text-stone-400">{booking.userId?.email || "No Email"}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="space-y-1">
                                            <p className="text-xs font-bold text-stone-600 flex items-center gap-2">
                                                <FaCalendarAlt className="text-[#bc8a5f]"/> {booking.bookingDate}
                                            </p>
                                            <p className="text-[10px] text-stone-400 flex items-center gap-2">
                                                <FaClock className="text-[#bc8a5f]"/> {booking.bookingTime}
                                            </p>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="inline-flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-xl">
                                            <FaChair className="text-[#4a6741]" size={12}/>
                                            <span className="text-xs font-black text-[#3e2723]">{booking.tableNumber}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                                            booking.status === 'CONFIRMED' ? 'bg-green-50 text-green-700 border-green-100' :
                                            booking.status === 'CANCELLED' ? 'bg-red-50 text-red-600 border-red-100' : 
                                            'bg-amber-50 text-amber-600 border-amber-100'
                                        }`}>
                                            {booking.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2 justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            {booking.status === 'PENDING' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(booking._id, "CONFIRMED")} 
                                                    className="p-2.5 bg-green-50 text-green-600 rounded-xl hover:bg-green-600 hover:text-white transition-all shadow-sm"
                                                    title="Confirm Booking"
                                                >
                                                    <FaCheck size={12}/>
                                                </button>
                                            )}
                                            {booking.status !== 'CANCELLED' && (
                                                <button 
                                                    onClick={() => handleStatusUpdate(booking._id, "CANCELLED")} 
                                                    className="p-2.5 bg-amber-50 text-amber-600 rounded-xl hover:bg-amber-600 hover:text-white transition-all shadow-sm"
                                                    title="Cancel Booking"
                                                >
                                                    <FaTimes size={12}/>
                                                </button>
                                            )}
                                            <button 
                                                onClick={() => handleDelete(booking._id)} 
                                                className="p-2.5 bg-red-50 text-red-400 rounded-xl hover:bg-red-600 hover:text-white transition-all shadow-sm"
                                                title="Delete Record"
                                            >
                                                <FaTrashAlt size={12}/>
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={5} className="py-20 text-center text-stone-400 italic font-serif">
                                    No reservations found in this category.
                                </td>
                            </tr>
                        )}
                    </AnimatePresence>
                </Table>
            )}
        </div>
    );
}