import apiClient from '@/api/axios';

export default {
    async getRutas() {
        // Returns collection resource -> { data: [...] }
        return apiClient.get('/rutas');
    },
    async getRuta(id) {
        return apiClient.get(`/rutas/${id}`);
    },
    async createRuta(payload) {
        return apiClient.post('/rutas', payload);
    },
    async updateRuta(id, payload) {
        return apiClient.put(`/rutas/${id}`, payload);
    },
    async deleteRuta(id) {
        return apiClient.delete(`/rutas/${id}`);
    }
};
