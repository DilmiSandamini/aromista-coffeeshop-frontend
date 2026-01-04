import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type ModalProps = {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
};

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 flex items-end sm:items-center justify-center p-0 sm:p-4">
                    {/* Backdrop - Smooth Blur Effect */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#1b110b]/60 backdrop-blur-md"
                    />
                    
                    {/* Modal Card */}
                    <motion.div
                        initial={{ 
                            scale: 0.95, 
                            opacity: 0, 
                            y: typeof window !== 'undefined' && window.innerWidth < 640 ? 100 : 30 
                        }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ 
                            scale: 0.95, 
                            opacity: 0, 
                            y: typeof window !== 'undefined' && window.innerWidth < 640 ? 100 : 30 
                        }}
                        transition={{ type: "spring", damping: 25, stiffness: 450 }}
                        className={`
                            relative z-10 w-full bg-white shadow-2xl overflow-hidden
                            /* Desktop Styles */
                            sm:max-w-lg sm:rounded-[40px]
                            /* Mobile Styles - Bottom Sheet look */
                             max-sm:max-h-[92vh]
                        `}
                    >
                        {/* Mobile Handle Bar (Optional visual cue) */}
                        <div className="sm:hidden w-12 h-1.5 bg-stone-200 rounded-full mx-auto mt-4 mb-2" />

                        {/* Modal Header */}
                        <div className="px-6 sm:px-10 pt-4 sm:pt-10 pb-4 flex justify-between items-center border-b border-stone-50">
                            <h3 className="text-xl sm:text-2xl font-serif font-bold text-[#3e2723] truncate pr-4">
                                {title}
                            </h3>
                            <button 
                                onClick={onClose} 
                                className="text-stone-300 hover:text-red-500 transition-colors p-2 -mr-2 outline-none"
                                aria-label="Close Modal"
                            >
                                <span className="text-3xl leading-none">&times;</span>
                            </button>
                        </div>

                        {/* Modal Content - Scrollable */}
                        <div className="p-6 sm:p-10 max-h-[70vh] sm:max-h-[80vh] overflow-y-auto custom-scrollbar scrolling-touch">
                            {children}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}