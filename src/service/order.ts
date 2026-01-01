import api from "./api";

export const createOrder = async (orderData: any) => {
  const response = await api.post("/orders/create", orderData);
  return response.data;
}

export const getAllOrdersForUser = async () => {
    const response = await api.get("/orders/getall/orders/foruser");
    return response.data;
};

export const getAllOrdersForAdmin = async () => {
    const response = await api.get("/orders/getall");
    return response.data;
};

export const getAllOrdersForBaristor = async () => {
    const response = await api.get("/orders/barista/getall");
    return response.data;
};

export const updateOrderStatus = async (orderId: string, status: string) => {
    const response = await api.patch(`/orders/update-status/${orderId}`, { status });
    return response.data;
};

export const searchUser = async (query: string) => {
    const response = await api.get(`/orders/search-user?query=${query}`);
    console.log("Search User Response:", response.data);
    return response.data;
};

export const createAdminOrder = async (orderData: any) => {
    const response = await api.post("/orders/create-admin", orderData);
    return response.data;
};

export const updateOrderDetails = async (orderId: string, orderData: any) => {
    const response = await api.put(`/orders/update-order/${orderId}`, orderData);
    return response.data;
};