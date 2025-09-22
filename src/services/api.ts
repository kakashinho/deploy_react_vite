// src/services/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "", // ou URL do ngrok
  timeout: 5000,
  headers: { 
    "Content-Type": "application/json" },
});

export default api;