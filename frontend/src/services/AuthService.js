import apiClient, { setAuthToken } from '@/api/axios';

export default {
    async login(payload) {
        // payload: { email, password }
        const res = await apiClient.post('/auth/login', payload);
        const token = res.data.access_token;
        if (token) {
            // set header and persist
            setAuthToken(token);
            localStorage.setItem('tupp_token', token);
            localStorage.setItem('tupp_user', JSON.stringify(res.data.user || null));
        }
        return res;
    },

    async register(payload) {
        const res = await apiClient.post('/auth/register', payload);
        const token = res.data.access_token;
        if (token) {
            setAuthToken(token);
            localStorage.setItem('tupp_token', token);
            localStorage.setItem('tupp_user', JSON.stringify(res.data.user || null));
        }
        return res;
    },

    async logout() {
        // call backend logout to invalidate token (optional)
        try {
            await apiClient.post('/auth/logout');
        } catch (e) {
            // ignore errors on logout
        }
        setAuthToken(null);
        localStorage.removeItem('tupp_token');
        localStorage.removeItem('tupp_user');
    },

    async me() {
        return apiClient.get('/auth/me');
    },

    getToken() {
        return localStorage.getItem('tupp_token');
    },

    setLocalToken(token) {
        if (token) {
            localStorage.setItem('tupp_token', token);
            setAuthToken(token);
        } else {
            localStorage.removeItem('tupp_token');
            setAuthToken(null);
        }
    }
};
