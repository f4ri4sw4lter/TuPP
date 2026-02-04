import { defineStore } from 'pinia';

export const usePwaStore = defineStore('pwa', {
  state: () => ({
    // The deferred beforeinstallprompt event (if available)
    deferredPrompt: null,
    // Whether the app is considered installed
    isInstalled: false,
  }),
  getters: {
    // Whether we can show an install button (native prompt available)
    canInstall: (state) => !!state.deferredPrompt,
  },
  actions: {
    setDeferredPrompt(evt) {
      this.deferredPrompt = evt;
    },
    clearDeferredPrompt() {
      this.deferredPrompt = null;
    },
    setInstalled(flag = true) {
      this.isInstalled = flag;
      if (flag) this.clearDeferredPrompt();
    },
    async promptInstall() {
      if (!this.deferredPrompt) return { outcome: 'unavailable' };
      try {
        // Show the native prompt
        await this.deferredPrompt.prompt();
        const choice = await this.deferredPrompt.userChoice;
        // update installed state if accepted
        if (choice && choice.outcome === 'accepted') {
          this.isInstalled = true;
        }
        // the prompt can only be used once
        this.clearDeferredPrompt();
        return choice || { outcome: 'unknown' };
      } catch (err) {
        // just clear so UI can hide the button
        this.clearDeferredPrompt();
        return { outcome: 'error', error: err };
      }
    }
  }
});
