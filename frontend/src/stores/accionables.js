import { defineStore } from 'pinia';
import AccionableService from '@/services/AccionableService';
import { useMetasStore } from '@/stores/metas';

export const useAccionablesStore = defineStore('accionables', {
    state: () => ({
        accionables: [],
        loading: false,
        error: null
    }),
    actions: {
        async fetchAccionables(params = {}) {
            this.loading = true;
            try {
                const res = await AccionableService.getAccionables(params);
                // normalize possible response shapes
                let data = [];
                if (Array.isArray(res)) data = res;
                else if (res && Array.isArray(res.data)) data = res.data;
                else if (res && Array.isArray(res.data?.data)) data = res.data.data;
                else data = [];

                this.accionables = data;
                return this.accionables;
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Error cargando accionables';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async addAccionable(payload) {
            this.loading = true;
            try {
                await AccionableService.createAccionable(payload);
                // After creating, refresh metas/rutas so UI stays in sync
                try {
                    const metas = useMetasStore();
                    await metas.fetchRutasConMetas();
                } catch (e) {
                    // ignore
                }
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Error creando accionable';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async updateAccionable(id, payload) {
            this.loading = true;
            try {
                await AccionableService.updateAccionable(id, payload);
                // refresh metas/rutas
                try {
                    const metas = useMetasStore();
                    await metas.fetchRutasConMetas();
                } catch (e) {}
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Error actualizando accionable';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async deleteAccionable(id) {
            this.loading = true;
            try {
                await AccionableService.deleteAccionable(id);
                // refresh metas/rutas
                try {
                    const metas = useMetasStore();
                    await metas.fetchRutasConMetas();
                } catch (e) {}
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Error eliminando accionable';
                throw err;
            } finally {
                this.loading = false;
            }
        }
    }
});
