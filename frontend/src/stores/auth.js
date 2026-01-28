import { defineStore } from 'pinia';
import AuthService from '@/services/AuthService';
import { setAuthToken } from '@/api/axios';
import { useMetasStore } from '@/stores/metas';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        user: null,
        token: null,
        loading: false,
        error: null,
    }),
    actions: {
        initFromStorage() {
            const token = AuthService.getToken();
            const user = localStorage.getItem('tupp_user');
            if (token) {
                this.token = token;
                setAuthToken(token);
                // load metas immediately when a token is present
                try {
                    const metas = useMetasStore();
                    metas.fetchRutasConMetas();
                } catch (e) {
                    // ignore
                }
            }
            if (user) {
                try { this.user = JSON.parse(user); } catch(e) { this.user = null; }
            }
        },

        async login(credentials) {
            this.loading = true;
            this.error = null;
            try {
                const res = await AuthService.login(credentials);
                this.token = res.data.access_token;
                this.user = res.data.user;
                this.error = null;
                // fetch rutas/metas after login
                try {
                    const metas = useMetasStore();
                    await metas.fetchRutasConMetas();
                } catch (e) {
                    // ignore fetch errors here
                }
                return res;
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Login failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async register(payload) {
            this.loading = true;
            this.error = null;
            try {
                const res = await AuthService.register(payload);
                this.token = res.data.access_token;
                this.user = res.data.user;
                // fetch rutas/metas after register
                try {
                    const metas = useMetasStore();
                    await metas.fetchRutasConMetas();
                } catch (e) {
                    // ignore
                }
                return res;
            } catch (err) {
                this.error = err.response?.data?.message || err.message || 'Register failed';
                throw err;
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            await AuthService.logout();
            this.token = null;
            this.user = null;
            try {
                const metas = useMetasStore();
                metas.rutas = [];
            } catch (e) {}
        },

        async fetchMe() {
            if (!this.token) return null;
            try {
                const res = await AuthService.me();
                this.user = res.data;
                return res.data;
            } catch (err) {
                // token likely invalid/expired
                this.logout();
                return null;
            }
        }
    }
});
