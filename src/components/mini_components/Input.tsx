import React from "react";
import { motion } from "framer-motion";

type InputProps = {
    label?: string;
    placeholder?: string;
    value?: string;
    onChange?: (val: string) => void;
    onFileChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    accept?: string;
    type?: string; 
    icon?: React.ReactNode;
    maxLength?: number;
    className?: string;
    required?: boolean;
};

export default function Input({
    label = "",
    placeholder = "",
    value,
    onChange,
    onFileChange,
    type = "text",
    icon,
    maxLength = Number.MAX_SAFE_INTEGER,
    accept, 
    className = "",
    required = false
}: InputProps) {
    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && (
                <label className="text-[11px] font-bold text-[#3e2723] uppercase tracking-[0.12em] ml-2">
                    {label} {required && <span className="text-red-500">*</span>}
                </label>
            )}
            <div className="relative group">
                {icon && (
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-stone-400 group-focus-within:text-[#4a6741] transition-colors duration-300">
                        {icon}
                    </span>
                )}
                <motion.input
                    whileFocus={{ scale: 1.01 }}
                    type={type}
                    placeholder={placeholder}
                    value={value}
                    accept={accept}
                    maxLength={maxLength}
                    onChange={(e) => {
                        if (type === "file") {
                            onFileChange && onFileChange(e);
                        } else {
                            onChange && onChange(e.target.value);
                        }
                    }}
                    className={`
                        w-full p-4 ${icon ? 'pl-12' : 'px-5'} 
                        bg-[#faf7f2]/60 border-2 border-[#eaddcf]/50 rounded-[22px] 
                        text-sm text-[#463f3a] outline-none transition-all duration-300
                        placeholder:text-stone-300 focus:bg-white focus:border-[#4a6741] 
                        focus:shadow-[0_0_20px_rgba(74,103,65,0.1)]
                    `}
                />
            </div>
        </div>
    );
}