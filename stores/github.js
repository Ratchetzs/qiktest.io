import { defineStore } from "pinia";

export const useGithubRepository = defineStore(
  "github_repository",
  () => {
    const errors = ref({});

    

    return {
      errors,
    };
  },
  {
    persist: true,
  }
);
