import { useState } from "react";
import { useCart } from "../context/CartContext";
import { createOrder } from "../service/order";
import { showAlert } from "../components/mini_components/Swail";
import { Button } from "../components/mini_components/Button";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes, FaTrashAlt, FaPlus, FaMinus, FaShoppingBag } from "react-icons/fa";

interface CartDrawerProps {
    isOpen: boolean;
    onClose: () => void;
}

export const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
    const { cartItems, totalAmount, clearCart, removeFromCart, updateQuantity } = useCart();
    const [loading, setLoading] = useState(false);

    const handlePlaceOrder = async () => {
        if (cartItems.length === 0) return;
        setLoading(true);
        try {
            const orderData = {
                items: cartItems.map((i: any) => ({ 
                    item: i.item, 
                    quantity: i.quantity 
                }))
            };
            console.log(orderData);
            await createOrder(orderData);
            showAlert({ icon: "success", title: "Order Placed!", text: "Our baristas are crafting your brew." });
            clearCart();
            onClose();
        } catch (error: any) {
            showAlert({ icon: "error", title: "Order Failed" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm "
                    />

                    {/* Drawer Content */}
                    <motion.div 
                        initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed right-0 top-0 h-screen w-full max-w-lg bg-white shadow-2xl flex flex-col"
                    >
                        {/* 1. Header */}
                        <div className="px-8 py-8 border-b border-stone-100 flex justify-between items-center shrink-0">
                            <div>
                                <h2 className="text-3xl font-serif font-bold text-[#3e2723]">Your Tray</h2>
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#bc8a5f] mt-1">
                                    {cartItems.length} Handpicked Selections
                                </p>
                            </div>
                            <button onClick={onClose} className="p-3 hover:bg-stone-50 rounded-full text-stone-400 transition-colors">
                                <FaTimes size={22} />
                            </button>
                        </div>

                        {/* 2. Main List Area - High Visibility */}
                        <div className="flex-1 overflow-y-auto bg-white px-6 py-6 space-y-4 custom-scrollbar">
                            {cartItems.length > 0 ? (
                                cartItems.map((i: any) => (
                                    <motion.div 
                                        layout key={i.item} 
                                        className="flex items-center gap-5 p-6 rounded-[2.5rem] border border-stone-100 bg-[#FAF9F6]/50 hover:bg-white hover:shadow-xl transition-all duration-500"
                                    >
                                        {/* Item Image */}
                                        <div className="w-20 h-24 shrink-0 bg-white rounded-2xl overflow-hidden border border-stone-100">
                                            <img src={i.imageUrl} alt={i.name} className="w-full h-full object-cover" />
                                        </div>
                                        
                                        <div className="flex-1 flex flex-col justify-between h-24">
                                            <div className="flex justify-between items-start">
                                                <h4 className="font-serif font-bold text-[#3e2723] text-lg leading-tight tracking-tighter uppercase">{i.name}</h4>
                                                <button onClick={() => removeFromCart(i.item)} className="p-1 text-stone-300 hover:text-red-500 transition-colors"><FaTrashAlt size={14}/></button>
                                            </div>

                                            <div className="flex items-center justify-between">
                                                {/* Silent Quantity Update (No Duplicates) */}
                                                <div className="flex items-center gap-5 bg-white border border-stone-200 rounded-full px-4 py-2 shadow-sm">
                                                    <button onClick={() => updateQuantity(i.item, -1)} className="text-stone-400 hover:text-[#4a6741] active:scale-75 transition-transform"><FaMinus size={10}/></button>
                                                    <span className="text-base font-black text-[#3e2723] text-center">{i.quantity}</span>
                                                    <button onClick={() => updateQuantity(i.item, 1)} className="text-stone-400 hover:text-[#4a6741] active:scale-75 transition-transform"><FaPlus size={10}/></button>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-serif font-black text-[#4a6741] text-lg">LKR {(i.price * i.quantity).toLocaleString()}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center px-10">
                                    <FaShoppingBag size={40} className="text-stone-100 mb-4" />
                                    <h3 className="font-serif text-xl font-bold text-stone-400 italic">"The tray is empty"</h3>
                                </div>
                            )}
                        </div>

                        {/* 3. Footer Area */}
                        <div className="p-10 bg-white border-t border-stone-100 shrink-0 shadow-[0_-20px_50px_rgba(0,0,0,0.04)]">
                            <div className="flex justify-between items-center mb-8">
                                <span className="text-sm font-bold text-stone-400 uppercase tracking-widest">Grand Total</span>
                                <span className="text-4xl font-serif font-bold text-[#3e2723]">LKR {totalAmount.toLocaleString()}</span>
                            </div>
                            
                            <Button 
                                onClick={handlePlaceOrder} 
                                className="w-full py-6 bg-[#3e2723] text-white font-black uppercase tracking-[0.3em] text-xs shadow-2xl hover:bg-[#4a6741] transition-all duration-500" 
                                disabled={loading || cartItems.length === 0}
                            >
                                {loading ? "Placing Order..." : "Confirm & Place Order"}
                            </Button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};