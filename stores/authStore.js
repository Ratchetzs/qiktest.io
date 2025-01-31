import { defineStore } from "pinia";

const apiBase = useRuntimeConfig().public.apiBase;

export const useAuth = defineStore("auth", {
  state: () => ({
    isLoggedIn: false,
    token: null,
    user: null,
    errors: {},
  }),
  getters: {
    getIsLoggedIn() {
      return this.isLoggedIn;
    },
    getUserToken() {
      return this.token;
    },
    getUser() {
      return this.user;
    },
    getErrors() {
      return this.errors;
    },
  },
  actions: {
    async register() {},
    async login(email, password) {
      try {
        const user = await $fetch(`${apiBase}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: {
            email: email,
            password: password,
          },
        });
        this.isLoggedIn = true;
        this.user = user;
      } catch (err) {
        console.error(err.data.errors);
        this.errors = err;
      }
    },
    async logout() {},
  },
});
