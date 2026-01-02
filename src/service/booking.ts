import api from "./api";

export const createBooking = async (bookingData: any) => {
    const response = await api.post("/bookings/create", bookingData);
    return response.data;
};

export const getBookedTables = async (date: string, time: string) => {
    const response = await api.get(`/bookings/booked-tables?date=${date}&time=${time}`);
    return response.data;
};

export const getAllBookings = async () => {
    const response = await api.get("/bookings/getall");
    return response.data;
};

export const updateBookingStatus = async (id: string, status: string) => {
    const response = await api.patch(`/bookings/status/${id}`, { status });
    return response.data;
};

export const deleteBooking = async (id: string) => {
    const response = await api.delete(`/bookings/delete/${id}`);
    return response.data;
};