import axios from "axios";

export const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const apiFetch = async (endpoint, method = "GET", options = {}) => {
  try {
    const axiosOptions = {
      method,
      headers: {
        ...(options.headers || {}),
      },
      withCredentials: true,
    };

    if(options.headers && Object.keys(options.headers).includes("Content-Type")){
      axiosOptions.headers["Content-Type"] = options.headers["Content-Type"];
    }else{
      axiosOptions.headers["Content-Type"] = "application/json";
    }

    if (method != "GET" && options.data) {
      axiosOptions.data = options.data;
    }
    const res = await axios(`${BASE_URL}${endpoint}`, axiosOptions);

    return res.data || {};
  } catch (err) {
    console.error("API fetch error:", err);
    return { success: false, message: err.message };
  }
};
