import { defineStore } from "pinia";

export const useAuth = defineStore(
  'auth',
  () => {
    const user = ref(null);
    const errors = ref({});

    // Verify if the use is logged in
    const isAuthenticated = computed(() => !!user.value);

    /**
     * Authenticated the user
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

    /**
     * Register new user
     * @param {string} fullName 
     * @param {string} email 
     * @param {string} password 
     * @param {string} passwordConfirmed 
     */
    const register = async(fullName, email, password, passwordConfirmed) => {
        
    };

    return {
      user,
      errors,
      register,
      authenticate,
      isAuthenticated,
    };
  },
  {
    persist: true,
  }
);
