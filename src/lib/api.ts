import axios from "axios";

const api = axios.create({
  baseURL: "https://api-memora.lkasta.com",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
