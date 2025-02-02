import { defineStore } from "pinia";

export const useGithubRepository = defineStore(
  "github_repository",
  () => {
    const errors = ref({});
    const repositories = ref([]); // user reporitories from db
    const repositoriesFound = ref([]); // repositories found from github

    /**
     * Find a repository from GitHub
     *
     * @param {string} url URL for fetching repository on GitHub
     * @returns {Promise<boolean>}
     */
    const findRepository = async (url) => {
      errors.value = {}; // Reset errors before request
      const apiBase = useRuntimeConfig().public.apiBase;
      const auth = useAuth();
      const flash = useFlash();
      const router = useRouter();

      if (!auth.user?.token) {
        flash.set("You must be logged in to add a repository.", "error");
        return false;
      }

      if (url.startsWith("http://github.com/")) {
        url = url.replace("https://github.com/", "");
      }

      if (unref(repositoriesFound).length >= 2) {
        flash.set(
          "Your current free plan supports up to 2 repositories. Upgrade to a premium plan to add more.",
          "info"
        );
        return false;
      }

      try {
        const repository = await $fetch(`${apiBase}/repos/${url}`, {
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });

        if (repositoriesFound.value.some((obj) => obj.id === repository.id)) {
          flash.set("This repository is already added.", "error");
        } else {
          repositoriesFound.value.push(repository);
        }
        return true;
      } catch (error) {
        handleError(error, flash, router);
        return false;
      }
    };

    /**
     * Remove the github repository found
     * @param {int} id
     */
    const removeRepository = (id) => {
      repositoriesFound.value = repositoriesFound.value.filter(
        (obj) => obj.id !== id
      );
    };

    /**
     * Get all user repositories
     *
     * @returns {Promise<boolean>}
     */
    const getRepositories = async () => {
      errors.value = {};
      const apiBase = useRuntimeConfig().public.apiBase;
      const auth = useAuth();

      if (!auth.user?.token) {
        flash.set("You must be logged in to fetch repositories.", "error");
        return false;
      }

      try {
        const response = await $fetch(`${apiBase}/user/repos`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
        });
        repositories.value = response;
        return true;
      } catch (error) {
        errors.value = {
          status: error.status,
          content: error.data || "An unexpected error occurred",
        };
        return false;
      }
    };

    /**
     * Add Github repository to Db
     * @param {int} id 
     * @returns 
     */
    const addRepository = async (id) => {
      errors.value = {};
      const apiBase = useRuntimeConfig().public.apiBase;
      const auth = useAuth();
      const flash = useFlash();
      const repository = repositoriesFound.value.find((obj) => obj.id === id);

      if (!repository) {
        flash.set("Repository not found.", "error");
        return;
      }

      if (!auth.user?.token) {
        flash.set("You must be logged in.", "error");
        return;
      }

      try {
        await $fetch(`${apiBase}/user/repos`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${auth.user.token}`,
          },
          body: {
            repositoryId: repository.id,
            url: repository.url,
            name: repository.name,
            description: repository.description || "",
            type: repository.type,
            avatar: repository.owner.avatar,
          },
        });
        flash.set("Repository successfully added", "success");
        removeRepository(repository.id);
      } catch (error) {
        if (error.status === 402) {
          flash.set(error.data.message,'info');
        }
      }
    };

    /**
     * Handle API errors
     *
     * @param {object} error The error object from fetch
     * @param {function} flash Flash messaging function
     * @param {object} router Vue router instance
     */
    const handleError = (error, flash, router) => {
      switch (error.status) {
        case 401:
          flash.set("Unauthorized access. Please log in.", "error");
          break;
        case 403:
          flash.set(error.data?.message || "Access forbidden", "info", 6000);
          router.push("/app/settings/add-api-key");
          break;
        case 404:
          flash.set(error.data?.message || "Repository not found.", "error");
          break;
        default:
          console.error("Unexpected error:", error);
          flash.set("Failed to add repository", "error");
          break;
      }
    };

    return {
      errors,
      repositories,
      repositoriesFound,
      addRepository,
      findRepository,
      getRepositories,
    };
  },
  {
    persist: true,
  }
);
