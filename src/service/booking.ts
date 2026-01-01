import api from "./api";

export const createBooking = async (bookingData: any) => {
    const response = await api.post("/bookings/create", bookingData);
    return response.data;
};

export const getBookedTables = async (date: string, time: string) => {
    const response = await api.get(`/bookings/booked-tables?date=${date}&time=${time}`);
    return response.data;
};