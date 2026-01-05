import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import type { SweetAlertIcon } from "sweetalert2";

const MySwal = withReactContent(Swal);

type AlertProps = {
    icon: SweetAlertIcon;
    title: string;
    text?: string;
    timer?: number;
    showCancelButton?: boolean;
    confirmButtonText?: string;
    cancelButtonText?: string;
};

export const showAlert = ({
    icon,
    title,
    text,
    timer,
    showCancelButton = false,
    confirmButtonText = "OK",
    cancelButtonText = "No, Keep it",
}: AlertProps) => {
    return MySwal.fire({
        icon,
        title,
        text,
        timer: timer ? timer : (showCancelButton ? undefined : 3000), 
        showCancelButton,
        confirmButtonText,
        cancelButtonText,
        
        // --- Aromista Theme Styling ---
        background: "#FAF7F2",         // Light Cream Background
        color: "#3E2723",              // Deep Coffee Brown Text
        confirmButtonColor: "#4A6741", // Sage Green Button
        cancelButtonColor: "#A8A29E",  // Stone Gray Button
        
        // Icon colors based on type
        iconColor: icon === "success" ? "#5C6D47" : icon === "error" ? "#B91C1C" : "#BC8A5F",
        
        timerProgressBar: true,
        
        customClass: {
            popup: 'rounded-[32px] border border-[#EADDCF] shadow-2xl font-serif',
            title: 'text-2xl font-serif font-bold',
            confirmButton: 'px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] mx-2',
            cancelButton: 'px-8 py-3 rounded-full font-sans font-bold uppercase tracking-widest text-[10px] mx-2'
        },
        
        // Animations
        showClass: {
            popup: 'animate__animated animate__fadeInUp animate__faster'
        },
        hideClass: {
            popup: 'animate__animated animate__fadeOutDown animate__faster'
        },
        
        buttonsStyling: true,
    });
};