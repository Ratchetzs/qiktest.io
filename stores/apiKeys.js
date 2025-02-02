import { defineStore } from "pinia";

export const useApikeys = defineStore(
  "user_api_keys",
  () => {
    const errors = ref({});
    const apiKeys = ref([]); 
    const loadingUpdate = ref({}); // Loading spécifique pour update
    const loadingDelete = ref({}); // Loading spécifique pour delete
    const apiBase = useRuntimeConfig().public.apiBase;
    const auth = useAuth();
    const flash = useFlash();

    const getAll = async () => {
      try {
        const response = await $fetch(`${apiBase}/user/api-keys`, {
          method: "GET",
          headers: { Authorization: `Bearer ${auth.user.token}` },
        });
        apiKeys.value = response;
      } catch (error) {
        console.error(error);
        flash.set(error?.data ?? "An error occurred", "error");
      }
    };

    /**
     * Add new key in db
     * @param {string} name 
     * @param {string} value 
     */
    const add = async(name, value) => {
      try {
        await $fetch(`${apiBase}/user/api-keys`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
          body: {
            name: name,
            value: value,
          },
        });
        flash.set("Your key was successfully stored.", "success");
      } catch (error) {
        if (error.status === 422) {
          flash.set(error.data.message, "error");
        }
      }
    }

    const updateHasDefault = async (id) => {
      loadingUpdate.value[id] = true; // Active le loading pour update seulement
      try {
        await $fetch(`${apiBase}/user/api-keys/${id}`, {
          method: "PATCH",
          headers: { Authorization: `Bearer ${auth.user.token}` },
        });
        flash.set("Key updated as default", "info");
        await getAll(); // Rafraîchit la liste
      } catch (error) {
        console.error(error);
        flash.set(error?.data ?? "An error occurred", "error");
      }
      loadingUpdate.value[id] = false;
    };

    const deleteKey = async (id) => {
      loadingDelete.value[id] = true; // Active le loading pour delete seulement
      try {
        await $fetch(`${apiBase}/user/api-keys/${id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${auth.user.token}` },
        });
        flash.set("Key has been deleted", "info");
        apiKeys.value = apiKeys.value.filter((key) => key.id !== id);
      } catch (error) {
        console.error(error);
        flash.set(error?.data ?? "An error occurred", "error");
      }
      loadingDelete.value[id] = false;
    };

    return {
      errors,
      apiKeys,
      loadingUpdate,
      loadingDelete,
      add,
      getAll,
      deleteKey,
      updateHasDefault,
    };
  },
  { persist: true }
);
