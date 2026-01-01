import api from "./api"

export const login = async (username: string, password: string) => {
  const res = await api.post("/auth/login", { email: username, password })

  return res.data
}

export const register = async (fullname: string, email: string, password: string, contactNumber: number) => {
  const res = await api.post("/auth/register", { fullname, email, password, contactNumber })

  return res.data
}

export const getMyDetails = async () => {
  const res = await api.get("/auth/me")
  return res.data
}

export const refreshTokens = async (refreshToken: string) => {
  const res = await api.post("/auth/refresh", {
    token: refreshToken
  })
  return res.data
}

export const getAllUsers = async (page = 1, limit = 20, role = "ALL", status = "ALL") => {
  const res = await api.get(`/auth/getall?page=${page}&limit=${limit}&role=${role}&status=${status}`);
  return res.data;
};

export const saveUser = async (data: any) => {
  const res = await api.post(`/auth/create`, data);
  return res.data;
} 
export const updateUser = async (id: string, data: any) => {
  const res = await api.put(`/auth/update/${id}`, data);
  return res.data;
}
export const deleteUser = async (id: string) => {
  const res = await api.delete(`/auth/delete/${id}`);
  return res.data;
}
export const toggleUserStatus = async (id: string) => {
  const res = await api.patch(`/auth/status/${id}`);
  return res.data;
}