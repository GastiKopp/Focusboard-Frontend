import axios from "axios";

export interface Category {
  id: number;
  name: string;
  color?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface CategoryData {
  name: string;
  color?: string;
}

// Usa el host del backend y agrega /api
const API = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Error en API (categorías):", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

export async function getCategories(): Promise<Category[]> {
  const res = await API.get("/categories");
  return res.data;
}

export async function createCategory(data: CategoryData): Promise<Category> {
  const res = await API.post("/categories", data);
  return res.data;
}

export async function updateCategory(id: number, data: CategoryData): Promise<Category> {
  const res = await API.put(`/categories/${id}`, data);
  return res.data;
}

export async function deleteCategory(id: number): Promise<void> {
  await API.delete(`/categories/${id}`);
}
