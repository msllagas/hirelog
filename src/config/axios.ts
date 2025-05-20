import axiosLib from "axios";

const axios = axiosLib.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
  },
  withCredentials: true,
  withXSRFToken: true,
});

let csrfTokenFetched = false;

axios.interceptors.request.use(async (config) => {
  if (config.method?.toLowerCase() !== "get" && !csrfTokenFetched) {
    await axios.get("/csrf-cookie");
    csrfTokenFetched = true;
  }

  return config;
});

export default axios;
