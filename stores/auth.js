import { defineStore } from "pinia";

export const useAuth = defineStore(
  "auth",
  () => {
    const user = ref(null);
    const errors = ref({});

    // Vérifie si l'utilisateur est authentifié
    const isAuthenticated = computed(() => !!user.value);

    /**
     * Authentifie l'utilisateur
     * @param {string} email
     * @param {string} password
     * @returns {Promise<boolean>}
     */
    const authenticate = async (email, password) => {
      errors.value = {}; // Reset des erreurs avant la requête
      const apiBase = useRuntimeConfig().public.apiBase;

      try {
        const response = await $fetch(`${apiBase}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { email, password },
        });
        user.value = response;
        return true;
      } catch (err) {
        errors.value = {
          status: err.status,
          content: err.data.errors,
        };
        return false;
      }
    };

    return {
      user,
      errors,
      authenticate,
      isAuthenticated,
    };
  },
  {
    persist: true,
  }
);
