import apiClient from '@/api/axios';

export default {
    async getMetas() {
        const { data } = await (apiClient.get('/metas'));
        return data;
    },
    async createMeta(payload) {
        return apiClient.post('/metas', payload);
    },
    async updateMeta(id, payload) {
        return apiClient.put(`/metas/${id}`, payload);
    },
    async deleteMeta(id) {
        return apiClient.delete(`/metas/${id}`);
    }
};