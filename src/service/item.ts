import api from "./api";

export const itemCreate = async (formData: FormData) => {
  const res = await api.post("/items/create", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const getAllItems = async () => {
  const res = await api.get("/items/getall");
  return res.data;
};

export const updateItem = async (itemId: string, formData: FormData) => {
  const res = await api.put(`/items/update/${itemId}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const detactiveOrActiveItem = async (itemId: string) => {
  const res = await api.patch(`/items/status/${itemId}`);
  return res.data;
};

export const deleteItem = async (itemId: string) => {
  const res = await api.delete(`/items/delete/${itemId}`);
  return res.data;
};

export const getAllItemsForCustomer = async () => {
  const res = await api.get("/items/customer/getall");
  return res.data;
};

export const getAllItemsForAdmin = async () => {
  const res = await api.get("/items/admin/getall");
  return res.data;
};