import apiClient from '@/api/axios';

export default {
    async getAccionables(params = {}) {
        return apiClient.get('/accionables', { params });
    },

    async createAccionable(payload) {
        return apiClient.post('/accionables', payload);
    },

    async updateAccionable(id, payload) {
        return apiClient.put(`/accionables/${id}`, payload);
    },

    async deleteAccionable(id) {
        return apiClient.delete(`/accionables/${id}`);
    }
};
