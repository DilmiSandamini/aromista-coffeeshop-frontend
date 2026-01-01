export function Select({ label, options, onChange, value, className = "" }: any) {
    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && <label className="text-[11px] font-bold text-[#3e2723] uppercase tracking-wider ml-2">{label}</label>}
            <select
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-4 bg-[#faf7f2]/60 border-2 border-[#eaddcf]/50 rounded-[22px] text-sm text-[#463f3a] outline-none cursor-pointer focus:bg-white focus:border-[#4a6741] transition-all"
            >
                {options.map((opt: any) => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
        </div>
    );
}

export function Textarea({ label, value, onChange, placeholder = "", className = "" }: any) {
    return (
        <div className={`flex flex-col gap-2 w-full ${className}`}>
            {label && <label className="text-[11px] font-bold text-[#3e2723] uppercase tracking-wider ml-2">{label}</label>}
            <textarea
                value={value}
                placeholder={placeholder}
                rows={4}
                onChange={(e) => onChange(e.target.value)}
                className="w-full p-5 bg-[#faf7f2]/60 border-2 border-[#eaddcf]/50 rounded-[22px] text-sm focus:bg-white focus:border-[#4a6741] outline-none transition-all resize-none"
            />
        </div>
    );
}