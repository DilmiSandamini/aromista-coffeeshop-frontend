import api from "./api";

export const createCategory = async (data: { categoryName: string }) => {
    const response = await api.post("/categories/create", data);
    return response.data;
}

export const updateCategory = async (id: string, data: { categoryName: string }) => {
    const response = await api.put(`/categories/update/${id}`, data);
    return response.data;
}

export const getAllCategories = async () => {
    const response = await api.get("/categories/getall");
    return response.data;
}

export const toggleCategoryStatus = async (id: string) => {
    const response = await api.patch(`/categories/togglestatus/${id}`);
    return response.data;
}

export const deleteCategory = async (id: string) => {
    const response = await api.delete(`/categories/delete/${id}`);
    return response.data;
}