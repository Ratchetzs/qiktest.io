import { defineStore } from "pinia";

export const useAuth = defineStore(
  "auth",
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
     * @returns {Promise<boolean>}
     */
    const register = async (
      fullName,
      email,
      password,
      passwordConfirmation
    ) => {
      errors.value = {}; // Reset des erreurs avant la requête
      const apiBase = useRuntimeConfig().public.apiBase;
      try {
        await $fetch(`${apiBase}/auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: { email, fullName, password, passwordConfirmation },
        });
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
     * 
     * @param {string} token Authorization Bearer token of user
     * @returns {Promise<boolean>}
     */
    const logout = async (token) => {
      errors.value = {}; // Reset des erreurs avant la requête
      const apiBase = useRuntimeConfig().public.apiBase;
      try {
        await $fetch(`${apiBase}/auth/logout`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
        });
        user.value = null;
        return true;
      } catch (err) {
        console.error(err);
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
      logout,
      register,
      authenticate,
      isAuthenticated,  
    };
  },
  {
    persist: true,
  }
);
