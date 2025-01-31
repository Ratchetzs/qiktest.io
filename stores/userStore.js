import { defineStore } from "pinia";

export const useUser = defineStore("user", {
  state: () => ({
    isLoggedIn: false,
    user: null,
  }),
  getters: {
    getIsLoggedIn: (state) => state.isLoggedIn,
    getUser: (state) => state.user,
  },
  actions: {
    setUser(status){
      this.user = status;
    },
    setLoggedIn(){
      this.isLoggedIn = !this.isLoggedIn;
    }
  },
});
