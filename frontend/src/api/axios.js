import axios from 'axios';

const apiClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    // We're using JWT Bearer tokens in Authorization header, so we don't need
    // to send cookies/cross-site credentials. Setting `withCredentials: false`
    // prevents the browser from sending cookies and avoids the "*" CORS
    // wildcard vs credentials problem.
    withCredentials: false,
    withXSRFToken: true,   // Laravel 11+ requires this explicitly in some setups
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }
});

// Interceptor opcional: Manejo global de errores (ej: Token expirado)
apiClient.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            console.error('Unauthorized - perhaps redirect to login?');
        }
        console.error('Error en la solicitud:', error);
        return Promise.reject(error);
    }
);

// Helper para setear el token en los headers Authorization
export function setAuthToken(token) {
    if (token) {
        apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        delete apiClient.defaults.headers.common['Authorization'];
    }
}

export default apiClient;