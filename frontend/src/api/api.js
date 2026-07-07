import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, method = "GET", options = {}) => {
  try {
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      withCredentials: true,
    };
    if (method != "GET" && options.data) {
      options.data = data;
    }
    const res = await axios(`${BASE_URL}${endpoint}`, options);

    return res.data || {};
  } catch (err) {
    console.error("API fetch error:", err);
    return { success: false, message: err.message };
  }
};
