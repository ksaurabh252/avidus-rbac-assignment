import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:3000/api",
});

// Automatically attach JWT token to every request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ==================================================
// AUTH API CALLS
// ==================================================

export const loginAPI = (email, password) =>
  api.post("/users/login", { email, password });

export const registerAPI = (userData) => api.post("/users/register", userData);

// ==================================================
// TASK API CALLS
// ==================================================

export const getMyTasksAPI = () => api.get("/tasks/my-tasks");

export const getAllTasksAPI = () => api.get("/tasks/all");

export const createTaskAPI = (taskData) => api.post("/tasks", taskData);

export const updateTaskAPI = (id, taskData) =>
  api.put(`/tasks/${id}`, taskData);

export const deleteTaskAPI = (id) => api.delete(`/tasks/${id}`);

// ==================================================
// ADMIN USER MANAGEMENT API CALLS
// ==================================================

export const getAllUsersAPI = () => api.get("/users");

export const updateUserStatusAPI = (id, status) =>
  api.put(`/users/${id}/status`, { status });

export const deleteUserAPI = (id) => api.delete(`/users/${id}`);

export const getActivityLogsAPI = () => api.get("/users/logs");

export default api;
