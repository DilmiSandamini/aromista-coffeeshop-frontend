import { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaCheck, FaClock, FaTimes, FaTrash, FaMinus, FaEdit, FaCoffee } from "react-icons/fa";
import { Table } from "../../components/mini_components/Table";
import { Button } from "../../components/mini_components/Button";
import { showAlert } from "../../components/mini_components/Swail";
import { AnimatePresence, motion } from "framer-motion";
import { 
    getAllOrdersForAdmin, 
    updateOrderStatus, 
    searchUser, 
    createAdminOrder,
    updateOrderDetails 
} from "../../service/order";
import { getAllItemsForAdmin } from "../../service/item";

export default function AdminOrdersManage() {
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
    
    // Manual Entry States
    const [foundUsers, setFoundUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [availableItems, setAvailableItems] = useState<any[]>([]);
    const [adminCart, setAdminCart] = useState<any[]>([]);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => { 
        fetchOrders(); 
        fetchItems();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const res = await getAllOrdersForAdmin();
            setOrders(res.orders || []);
        } catch (error) { console.error(error); }
        finally { setLoading(false); }
    };

    const fetchItems = async () => {
        try {
            const res = await getAllItemsForAdmin();
            setAvailableItems(res.items || []);
        } catch (error) { console.error(error); }
    };

    const handleUserSearch = async (val: string) => {
        if (val.length > 1) {
            const res = await searchUser(val);
            setFoundUsers(res.users || []);
        } else { setFoundUsers([]); }
    };

    const updateAdminCartQty = (id: string, delta: number) => {
        setAdminCart(prev => prev.map(item => {
            if (item._id === id) {
                const newQty = item.qty + delta;
                return newQty > 0 ? { ...item, qty: newQty } : item;
            }
            return item;
        }));
    };

    const addToAdminCart = (item: any) => {
        const existing = adminCart.find(c => c._id === item._id);
        if (existing) { updateAdminCartQty(item._id, 1); } 
        else { setAdminCart([...adminCart, { ...item, qty: 1 }]); }
    };

    // --- Edit Order Logic ---
    const handleEditStart = (order: any) => {
        setEditMode(true);
        setSelectedOrderId(order._id);
        setSelectedUser(order.userId);
        
        const existingItems = order.items.map((i: any) => ({
            _id: i.item._id,
            name: i.item.name,
            price: i.unitPrice,
            qty: i.quantity
        }));
        setAdminCart(existingItems);
        setIsModalOpen(true);
    };

    const handleFinalizeOrder = async () => {
        if (!selectedUser || adminCart.length === 0) {
            showAlert({ icon: "warning", title: "Incomplete", text: "Select a user and add items." });
            return;
        }
        
        setIsProcessing(true);
        const orderData = {
            userId: selectedUser._id,
            items: adminCart.map(i => ({ item: i._id, quantity: i.qty, unitPrice: i.price })),
            totalAmount: adminCart.reduce((acc, curr) => acc + (curr.price * curr.qty), 0)
        };

        try {
            if (editMode && selectedOrderId) {
                await updateOrderDetails(selectedOrderId, orderData);
                showAlert({ icon: "success", title: "Updated", text: "Artisan order modified successfully." });
            } else {
                await createAdminOrder(orderData);
                showAlert({ icon: "success", title: "Created", text: "New artisan order placed." });
            }
            setIsModalOpen(false);
            fetchOrders();
        } catch (error) { showAlert({ icon: "error", title: "Error" }); }
        finally { setIsProcessing(false); }
    };

    const categories = Array.from(new Set(availableItems.map(i => i.category)));

    return (
        <div className="animate-fade-in pb-10 px-4">
            <div className="flex justify-between items-center mb-10">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-[#3e2723]">Order Management</h1>
                    <p className="text-stone-500 italic">Review and process artisan coffee requests.</p>
                </div>
                <Button onClick={() => { setEditMode(false); setSelectedUser(null); setAdminCart([]); setIsModalOpen(true); }}>
                    <FaPlus className="mr-2" /> Manual Order Entry
                </Button>
            </div>

            {loading ? (
                <div className="text-center py-20 italic text-stone-400">Brewing data...</div>
            ) : (
                <Table headers={["ID & Customer", "Ordered Items", "Total", "Time", "Status", "Actions"]}>
                    {orders.map((order) => (
                        <tr key={order._id} className="border-b border-stone-100 hover:bg-stone-50/50 transition-colors">
                            <td className="px-6 py-4">
                                <div className="space-y-1">
                                    <p className="font-mono text-[10px] font-bold text-stone-400">#{order._id.slice(-6).toUpperCase()}</p>
                                    <p className="font-bold text-[#3e2723]">{order.userId?.fullname || "Guest"}</p>
                                    <p className="text-[10px] text-stone-400">{order.userId?.email}</p>
                                </div>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex flex-wrap gap-2 max-w-xs">
                                    {order.items?.map((itemObj: any, idx: number) => (
                                        <div key={idx} className="flex items-center gap-2 bg-[#f4f1ea] border border-[#e8e2d5] px-2 py-1 rounded-lg">
                                            <span className="text-[10px] font-bold text-[#3e2723]">{itemObj.item?.name}</span>
                                            <span className="bg-[#3e2723] text-white text-[9px] font-black px-1.5 rounded-md">x{itemObj.quantity}</span>
                                        </div>
                                    ))}
                                </div>
                            </td>
                            <td className="px-6 py-4 font-black text-[#4a6741] text-sm">LKR {order.totalAmount}</td>
                            <td>
                                <p className="text-[10px] text-stone-400">{new Date(order.createdAt).toLocaleDateString()}</p>
                                <p className="text-[10px] text-stone-400">{new Date(order.createdAt).toLocaleTimeString()}</p>
                            </td>
                            <td className="px-6 py-4">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                    order.status === 'COMPLETED' ? 'bg-green-100 text-green-700' : 
                                    order.status === 'CANCELLED' ? 'bg-red-100 text-red-700' : 'bg-amber-100 text-amber-700'
                                }`}>
                                    {order.status}
                                </span>
                            </td>
                            <td className="px-6 py-4">
                                <div className="flex gap-2">
                                    <button onClick={() => handleEditStart(order)} className="p-2 text-stone-400 hover:bg-blue-100 hover:text-blue-600 rounded-full transition-all" title="Edit Order"><FaEdit /></button>
                                    <button onClick={() => updateOrderStatus(order._id, "PROCESSING").then(fetchOrders)} className="p-2 text-stone-400 hover:bg-stone-100 rounded-full transition-all" title="Process"><FaClock /></button>
                                    <button onClick={() => updateOrderStatus(order._id, "COMPLETED").then(fetchOrders)} className="p-2 text-stone-400 hover:bg-green-100 hover:text-green-600 rounded-full transition-all" title="Complete"><FaCheck /></button>
                                    <button onClick={() => updateOrderStatus(order._id, "CANCELLED").then(fetchOrders)} className="p-2 text-stone-400 hover:bg-red-100 hover:text-red-600 rounded-full transition-all" title="Cancel"><FaTimes /></button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </Table>
            )}

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-[#1b110b]/60 backdrop-blur-sm">
                        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="bg-white rounded-[2.5rem] p-10 w-full max-w-7xl max-h-[95vh] overflow-y-auto shadow-2xl relative">
                            <h2 className="text-2xl font-serif font-bold text-[#3e2723] mb-8 flex items-center gap-3"><FaCoffee/> {editMode ? "Modify Order" : "Manual Order Entry"}</h2>
                            
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                                {/* Search */}
                                <div className="space-y-6">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#bc8a5f] block mb-2">1. Find Customer</label>
                                    {!editMode ? (
                                        <>
                                            <div className="relative">
                                                <FaSearch className="absolute left-4 top-4 text-stone-300" />
                                                <input type="text" placeholder="Name, Email or Phone..." className="w-full bg-stone-50 border border-stone-100 rounded-xl p-4 pl-12 outline-none focus:ring-2 ring-[#bc8a5f]/20" onChange={(e) => handleUserSearch(e.target.value)} />
                                            </div>
                                            <div className="space-y-2 max-h-60 overflow-y-auto pr-2">
                                                {foundUsers.map(u => (
                                                    <div key={u._id} onClick={() => setSelectedUser(u)} className={`p-3 rounded-xl border cursor-pointer transition-all ${selectedUser?._id === u._id ? 'border-[#bc8a5f] bg-[#bc8a5f]/5' : 'border-stone-50 hover:bg-stone-50'}`}>
                                                        <p className="font-bold text-xs text-[#3e2723]">{u.fullname}</p>
                                                        <p className="text-[10px] text-stone-400 truncate">{u.email}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </>
                                    ) : (
                                        <div className="mt-4 p-6 bg-stone-50 rounded-[1.5rem] border border-stone-100">
                                            <p className="text-[10px] font-black text-stone-400 uppercase mb-2">Customer Locked</p>
                                            <p className="font-bold text-lg text-[#3e2723]">{selectedUser?.fullname}</p>
                                            <p className="text-xs text-stone-500">{selectedUser?.email}</p>
                                        </div>
                                    )}
                                </div>

                                {/* Menu Selection */}
                                <div className="space-y-6 lg:border-l lg:border-stone-100 lg:pl-10">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-[#bc8a5f] block mb-2">2. Artisan Selection</label>
                                    <div className="space-y-8 max-h-[55vh] overflow-y-auto pr-4 custom-scrollbar">
                                        {categories.map(cat => (
                                            <div key={cat}>
                                                <h4 className="text-[10px] font-black text-stone-300 uppercase tracking-[0.3em] mb-4 border-b border-stone-100 pb-2">{cat}</h4>
                                                <div className="grid grid-cols-1 gap-3">
                                                    {availableItems.filter(i => i.category === cat).map(item => (
                                                        <div key={item._id} onClick={() => addToAdminCart(item)} className="p-2 bg-stone-50 rounded-xl hover:border-[#bc8a5f] border border-transparent cursor-pointer flex items-center gap-3 group transition-all">
                                                            <img src={item.imageUrl} className="w-10 h-10 rounded-lg object-cover shadow-sm" />
                                                            <div className="flex-1">
                                                                <p className="text-[11px] font-bold text-[#3e2723]">{item.name}</p>
                                                                <p className="text-[9px] font-black text-[#4a6741]">LKR {item.price}</p>
                                                            </div>
                                                            <FaPlus className="text-stone-300 group-hover:text-[#bc8a5f]" size={10} />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Cart Summary */}
                                <div className="bg-stone-50 rounded-[2rem] p-8 border border-stone-100 flex flex-col h-full">
                                    <h3 className="text-sm font-black uppercase tracking-widest text-[#3e2723] mb-6 border-b border-stone-200 pb-4">Order Summary</h3>
                                    <div className="flex-1 space-y-4 overflow-y-auto max-h-80 pr-2">
                                        {adminCart.map(item => (
                                            <div key={item._id} className="flex justify-between items-center bg-white p-3 rounded-xl shadow-sm border border-stone-100">
                                                <div className="flex-1">
                                                    <p className="text-xs font-bold text-[#3e2723] truncate">{item.name}</p>
                                                    <p className="text-[10px] text-stone-400 font-bold">LKR {item.price * item.qty}</p>
                                                </div>
                                                <div className="flex items-center gap-2 bg-stone-100 px-2 py-1 rounded-lg ml-2">
                                                    <button onClick={(e) => { e.stopPropagation(); updateAdminCartQty(item._id, -1); }} className="p-1 hover:text-red-500"><FaMinus size={8}/></button>
                                                    <span className="text-xs font-black w-4 text-center">{item.qty}</span>
                                                    <button onClick={(e) => { e.stopPropagation(); updateAdminCartQty(item._id, 1); }} className="p-1 hover:text-green-600"><FaPlus size={8}/></button>
                                                </div>
                                                <button onClick={() => setAdminCart(prev => prev.filter(i => i._id !== item._id))} className="ml-3 text-red-200 hover:text-red-500"><FaTrash size={12}/></button>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="mt-8 pt-6 border-t border-stone-200">
                                        <div className="flex justify-between items-center mb-6">
                                            <span className="text-[10px] font-black uppercase text-stone-400 tracking-widest">Total</span>
                                            <span className="text-xl font-black text-[#4a6741]">LKR {adminCart.reduce((a, b) => a + (b.price * b.qty), 0)}</span>
                                        </div>
                                        <Button className="w-full py-4 shadow-xl" onClick={handleFinalizeOrder} disabled={isProcessing || !selectedUser || adminCart.length === 0}>
                                            {isProcessing ? "Processing..." : editMode ? "Update Artisan Order" : "Place Artisan Order"}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsModalOpen(false)} className="absolute top-6 right-8 text-stone-300 hover:text-stone-500"><FaTimes size={20}/></button>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}