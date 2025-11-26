// stores/modules/recaptcha.js
import { defineStore } from 'pinia';
import { useReCaptcha } from 'vue-recaptcha-v3';

export const useRecaptchaStore = defineStore('recaptcha', () => {
    const recaptchaInstance = useReCaptcha();

    /**
     * Fungsi untuk mengeksekusi reCAPTCHA dengan action tertentu
     * dan mendapatkan token serta header options.
     */
    const executeRecaptcha = async (action) => {
        try {
            // Tunggu hingga reCAPTCHA instance siap
            await recaptchaInstance?.recaptchaLoaded();
            // Eksekusi reCAPTCHA dengan action
            const token = await recaptchaInstance?.executeRecaptcha(action);
            const headerOptions = {
                headers: {
                    'google-recaptcha-token': token,
                },
            };
            console.log('Token:', token);

            return { token, headerOptions };
        } catch (error) {
            console.error('Error executing reCAPTCHA:', error);
            throw error;
        }
    };

    return {
        executeRecaptcha,
    };
});
