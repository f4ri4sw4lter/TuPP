import { defineStore } from 'pinia';
import MetaService from '@/services/MetaService';
import RutasService from '@/services/RutasService';

export const useMetasStore = defineStore('metas', {
    state: () => ({
        metas: [],
        rutas: [], // Tu estructura anidada de Rutas -> Metas
        loading: false,
        error: null
    }),
    actions: {
        async fetchRutasConMetas() {
            this.loading = true;
            try {
                // Si la API devuelve un array plano de metas, los agrupamos por ruta_id
                const res = await MetaService.getMetas();
                // MetaService.getMetas may return either the axios response or already-unwrapped data.
                let metas = [];
                if (Array.isArray(res)) {
                    metas = res;
                } else if (res && Array.isArray(res.data)) {
                    metas = res.data;
                } else if (res && Array.isArray(res.data?.data)) {
                    metas = res.data.data;
                } else if (res && Array.isArray(res.data?.meta)) {
                    metas = res.data.meta; // fallback if backend wraps differently
                } else {
                    metas = [];
                }

                // Primero obtener todas las rutas (incluso las que no tengan metas)
                let rutasResp = await RutasService.getRutas();
                let rutasArr = [];
                if (Array.isArray(rutasResp)) {
                    rutasArr = rutasResp;
                } else if (rutasResp && Array.isArray(rutasResp.data)) {
                    rutasArr = rutasResp.data;
                } else if (rutasResp && Array.isArray(rutasResp.data?.data)) {
                    rutasArr = rutasResp.data.data;
                } else {
                    rutasArr = [];
                }

                // Mapear rutas iniciales y asegurarse que cada una tenga metas: []
                const rutasMap = new Map();
                rutasArr.forEach(r => {
                    rutasMap.set(r.id, { ...r, metas: [] });
                });

                // Ahora asignar las metas agrupadas a cada ruta (si alguna meta tiene ruta faltante, la creamos)
                metas.forEach(m => {
                    const rutaObj = m.ruta || { id: m.ruta_id, titulo: 'Sin ruta', color: '#ddd' };
                    if (!rutasMap.has(rutaObj.id)) {
                        rutasMap.set(rutaObj.id, { ...rutaObj, metas: [] });
                    }
                    rutasMap.get(rutaObj.id).metas.push(m);
                });

                // Convertir map a array y ordenar metas por id dentro de cada ruta
                const rutasArray = Array.from(rutasMap.values()).map(r => ({
                    ...r,
                    metas: (r.metas || []).sort((a, b) => (a.id ?? 0) - (b.id ?? 0))
                }));

                // Ordenar rutas por id para consistencia
                rutasArray.sort((a, b) => (a.id ?? 0) - (b.id ?? 0));

                this.rutas = rutasArray;
            } catch (err) {
                this.error = err.response?.data?.message || 'Error al cargar';
            } finally {
                this.loading = false;
            }
        },
        async addMeta(nuevaMeta) {
            // Lógica optimista o recarga
            await MetaService.createMeta(nuevaMeta);
            await this.fetchRutasConMetas(); // Recargamos para ver el cambio
        }
        ,
        async deleteMeta(id) {
            this.loading = true;
            try {
                await MetaService.deleteMeta(id);
                await this.fetchRutasConMetas();
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Error eliminando meta';
                throw err;
            } finally {
                this.loading = false;
            }
        }
        ,
        async updateMeta(id, payload) {
            this.loading = true;
            try {
                await MetaService.updateMeta(id, payload);
                await this.fetchRutasConMetas();
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Error actualizando meta';
                throw err;
            } finally {
                this.loading = false;
            }
        }
    }
});