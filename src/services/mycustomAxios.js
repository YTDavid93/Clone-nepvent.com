import axios from "axios";


const instance = axios.create({
    baseURL: import.meta.env.VITE_API_HOST,
});

// Adding an interceptor to include the token in the request headers
instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
      }
    return config;
});

export default instance;