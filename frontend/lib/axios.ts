import axios from 'axios';
import Cookies from 'js-cookie';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
    withCredentials: true, // Penting untuk Sanctum cookie-based auth (opsional jika pakai token bearer)
});

// Interceptor: Setiap request keluar, tempelkan Token Admin (jika ada)
api.interceptors.request.use((config) => {
    const token = Cookies.get('admin_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Interceptor: Jika respon 401 (Unauthorized), lempar ke halaman login
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401 && !window.location.pathname.includes('/admin/login')) {
            Cookies.remove('admin_token');
            window.location.href = '/admin/login';
        }
        return Promise.reject(error);
    }
);

export default api;