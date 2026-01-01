import React, { createContext, useContext, useState } from "react";
import { showAlert } from "../components/mini_components/Swail";

interface CartContextType {
    cartItems: any[];
    addToCart: (item: any) => void;
    removeFromCart: (id: string) => void;
    updateQuantity: (id: string, delta: number) => void; // අලුතින් එකතු කළා
    clearCart: () => void;
    totalAmount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<any[]>([]);

    // අලුතින් Item එකක් එකතු කිරීම හෝ තිබෙන එකක Qty වැඩි කිරීම
    const addToCart = (item: any) => {
        setCartItems((prev) => {
            const itemId = item._id || item.item;
            const existing = prev.find((i) => i.item === itemId);
            if (existing) {
                return prev.map((i) => i.item === itemId ? { ...i, quantity: i.quantity + 1 } : i);
            }
            return [...prev, { item: itemId, name: item.name, price: item.price, imageUrl: item.imageUrl, quantity: 1 }];
        });
        showAlert({ icon: "success", title: "Added to Tray", text: `${item.name} is ready.` });
    };

    // Drawer එක ඇතුළතදී ප්‍රමාණයන් පමණක් වෙනස් කිරීම (No Alert)
    const updateQuantity = (id: string, delta: number) => {
        setCartItems((prev) =>
            prev.map((i) => {
                if (i.item === id) {
                    const newQty = i.quantity + delta;
                    return newQty > 0 ? { ...i, quantity: newQty } : i;
                }
                return i;
            })
        );
    };

    const removeFromCart = (id: string) => setCartItems(prev => prev.filter(i => i.item !== id));
    const clearCart = () => setCartItems([]);
    const totalAmount = cartItems.reduce((acc, i) => acc + (i.price * i.quantity), 0);

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, totalAmount }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};