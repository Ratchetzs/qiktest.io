import { defineStore } from "pinia";

export const useFlash = defineStore("flash", {
  state: () => ({
    type: "success",
    message: null,
  }),
  actions: {
    flash(message, type = "success") {
      (this.message = message), (this.type = type);

      const timeout = setTimeout(
        () => {
          this.clear();
          clearTimeout(timeout);
        },
        4000
      );
    },
    clear() {
      this.message = null;
      this.type = null;
    },
  },
});
