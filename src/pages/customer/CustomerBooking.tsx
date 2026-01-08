import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaUsers, FaCheckCircle } from "react-icons/fa";
import { showAlert } from "../../components/mini_components/Swail";
import { createBooking, getBookedTables } from "../../service/booking";

export default function CustomerBooking() {
    const [hoveredTable, setHoveredTable] = useState<string | null>(null);
    const [selectedTable, setSelectedTable] = useState<any | null>(null);
    const [bookingDate, setBookingDate] = useState("");
    const [bookingTime, setBookingTime] = useState("");
    const [bookedTables, setBookedTables] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (bookingDate && bookingTime) {
            fetchBookedStatus();
        }
    }, [bookingDate, bookingTime]);

    const fetchBookedStatus = async () => {
        try {
            const data = await getBookedTables(bookingDate, bookingTime);
            setBookedTables(data.bookedTableIds || []);
        } catch (error) {
            console.error("Error loading table status");
        }
    };

    const tables = [
        { id: "O1", type: "square", seats: 2, pos: "top-4 left-[10%]" },
        { id: "O2", type: "square", seats: 2, pos: "top-4 left-[35%]" },
        { id: "O3", type: "square", seats: 2, pos: "top-4 left-[60%]" },
        { id: "O4", type: "square", seats: 2, pos: "top-4 left-[85%]" },
        { id: "I1", type: "long-v", seats: 6, pos: "top-[25%] left-[5%]" },
        { id: "I2", type: "long-v", seats: 6, pos: "top-[25%] left-[25%]" },
        { id: "I3", type: "round", seats: 4, pos: "top-[25%] left-[45%]" },
        { id: "I4", type: "long-v", seats: 4, pos: "top-[25%] left-[65%]" },
        { id: "I5", type: "square", seats: 2, pos: "top-[25%] left-[83%]" },
        { id: "I6", type: "long-v", seats: 4, pos: "top-[65%] left-[5%]" },
        { id: "I7", type: "long-v", seats: 4, pos: "top-[65%] left-[25%]" },
        { id: "I8", type: "long-v", seats: 4, pos: "top-[65%] left-[42%]" },
        { id: "I9", type: "round", seats: 4, pos: "top-[65%] left-[62%]" },
        { id: "I10", type: "square", seats: 2, pos: "top-[65%] left-[83%]" },
        { id: "I11", type: "square", seats: 2, pos: "top-[45%] left-[83%]" },
    ];

    const handleConfirmBooking = async () => {
        setLoading(true);
        try {
            await createBooking({
                tableNumber: selectedTable.id,
                bookingDate,
                bookingTime
            });
            showAlert({ icon: "success", title: "Reserved!", text: `Table ${selectedTable.id} is confirmed.` });
            setSelectedTable(null);
            fetchBookedStatus();
        } catch (error: any) {
            showAlert({ icon: "error", title: "Failed", text: error.response?.data?.message || "Error." });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex flex-col items-center pt-24 pb-10 px-10 overflow-hidden bg-[#FAF9F6]">
            <div className="fixed inset-0 z-0">
                <img className="w-full h-full object-cover brightness-[0.2]" src="/src/assets/image/top-view-tasty-coffee-with-coffee-beans.jpg" alt="BG" />
                <div className="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
            </div>

            <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative z-10 w-full max-w-4xl bg-white/10 backdrop-blur-xl border border-white/20 p-8 rounded-[2.5rem] mb-10 flex flex-wrap items-end justify-center gap-8 shadow-2xl">
                <div className="flex-1 min-w-[200px] space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#bc8a5f] tracking-[0.2em] italic">Pick a Date</label>
                    <input type="date" className="w-full bg-white/90 rounded-2xl px-5 py-4 outline-none" onChange={(e) => setBookingDate(e.target.value)} min={new Date().toISOString().split('T')[0]} />
                </div>
                <div className="flex-1 min-w-[200px] space-y-2">
                    <label className="text-[10px] font-black uppercase text-[#bc8a5f] tracking-[0.2em] italic">Set Time</label>
                    <input type="time" className="w-full bg-white/90 rounded-2xl px-5 py-4 outline-none" onChange={(e) => setBookingTime(e.target.value)} />
                </div>
                <div className="flex items-center gap-6 text-white text-[10px] font-bold uppercase tracking-widest">
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-blue-400 rounded-sm"></div> Open</div>
                    <div className="flex items-center gap-2"><div className="w-3 h-3 bg-red-500 rounded-sm"></div> Booked</div>
                </div>
            </motion.div>

            <div className={`relative z-10 w-full max-w-5xl aspect-[16/9] bg-white/5 backdrop-blur-md border border-white/10 rounded-[3.5rem] p-6 shadow-inner transition-all duration-700 ${(!bookingDate || !bookingTime) ? 'opacity-30 pointer-events-none grayscale' : 'opacity-100'}`}>
                {tables.map((table) => {
                    const isBooked = bookedTables.includes(table.id);
                    return (
                        <motion.div
                            key={table.id}
                            onClick={() => !isBooked && setSelectedTable(table)}
                            onMouseEnter={() => !isBooked && setHoveredTable(table.id)}
                            onMouseLeave={() => setHoveredTable(null)}
                            className={`absolute flex items-center justify-center transition-all duration-500 ${table.pos} 
                                ${table.type === 'round' ? 'rounded-full' : 'rounded-lg'}
                                ${isBooked ? 'bg-red-500/60 border-red-400 cursor-not-allowed' : 'bg-blue-400/20 border-blue-300/40 cursor-pointer hover:bg-[#bc8a5f]/50 hover:border-[#bc8a5f]'}
                                border shadow-lg`}
                            style={{
                                width: table.type === 'long-v' ? '6%' : table.type === 'round' ? '12%' : '8%',
                                height: table.type === 'long-v' ? '30%' : table.type === 'round' ? '20%' : '12%',
                            }}
                        >
                            <div className={`relative flex flex-col items-center justify-center w-[85%] h-[85%] border border-white/20 ${table.type === 'round' ? 'rounded-full' : 'rounded-md'} bg-white/5`}>
                                <span className="text-[10px] font-black text-white/70">{table.id}</span>
                                {isBooked && <div className="text-[8px] font-black text-white/90 uppercase tracking-tighter">Booked</div>}
                                <AnimatePresence>
                                    {hoveredTable === table.id && (
                                        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="absolute -top-14 bg-[#bc8a5f] text-white px-4 py-2 rounded-2xl text-[9px] font-black flex items-center gap-2 shadow-2xl z-50 whitespace-nowrap">
                                            <FaUsers /> {table.seats} PERSONS
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedTable && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedTable(null)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
                        <motion.div initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="relative bg-white rounded-[3rem] p-12 w-full max-w-md shadow-2xl text-center">
                            <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-green-100"><FaCheckCircle className="text-green-500 text-4xl" /></div>
                            <h2 className="text-3xl font-serif font-bold text-[#3e2723] mb-2">Reserve Table {selectedTable.id}</h2>
                            <p className="text-xs text-stone-400 font-medium mb-8 uppercase tracking-widest">{bookingDate} • {bookingTime}</p>
                            <button onClick={handleConfirmBooking} disabled={loading} className="w-full py-5 bg-[#3e2723] text-white rounded-3xl font-black uppercase tracking-widest text-[10px] shadow-xl hover:bg-[#bc8a5f] transition-all disabled:bg-stone-200">
                                {loading ? "Securing Table..." : "Complete Booking"}
                            </button>
                            <button onClick={() => setSelectedTable(null)} className="mt-6 text-stone-400 text-[10px] font-black uppercase tracking-widest hover:text-red-500 transition-colors">Go Back</button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}