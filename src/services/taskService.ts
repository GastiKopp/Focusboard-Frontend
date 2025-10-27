// src/services/taskService.ts
import axios from "axios";

// --- TIPOS ---
export interface TaskData {
  title: string;
  description?: string;
  planned_hours_per_day: number;
  completed_hours?: number;
  assigned_days: string[];          // p.ej. ["monday","wednesday"]
  start_time?: string | null;       // "18:00" | null
  end_time?: string | null;         // "19:00" | null
  categoryId?: number | null;
}

export interface Category {
  id: number;
  name: string;
  color?: string;
}

export interface Task extends TaskData {
  id: number;
  completed_hours: number;
  progress_percent: number;
  category?: Category;              // si el backend hace include
}

// --- CONFIG AXIOS ---
const API = axios.create({
  // 👇 siempre termina en /api
  baseURL: `${import.meta.env.VITE_API_URL || "http://localhost:4000"}/api`,
  headers: { "Content-Type": "application/json" },
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

API.interceptors.response.use(
  (res) => res,
  (err) => {
    console.error("Error en API (tareas):", err.response?.data || err.message);
    return Promise.reject(err);
  }
);

// --- CRUD ---
export const getTasks = async (): Promise<Task[]> => {
  const res = await API.get("/tasks");
  return res.data;
};

export const getTaskById = async (taskId: number): Promise<Task> => {
  const res = await API.get(`/tasks/${taskId}`);
  return res.data;
};

export const createTask = async (taskData: TaskData): Promise<Task> => {
  const res = await API.post("/tasks", taskData);
  return res.data;
};

export const updateTask = async (taskId: number, updates: Partial<TaskData>): Promise<Task> => {
  const res = await API.put(`/tasks/${taskId}`, updates);
  return res.data;
};

export const deleteTask = async (taskId: number): Promise<void> => {
  await API.delete(`/tasks/${taskId}`);
};
