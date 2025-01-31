import { defineStore } from "pinia";

export const useFlash = defineStore("flash", () => {
  const type = ref("success");
  const message = ref(null);

  const set = (msg, context = "success") => {
    (message.value = msg), (type.value = context);
    const timeout = setTimeout(() => {
      message.value = null;
      type.value = null;
      clearTimeout(timeout);
    }, 4000);
  };

  return {
    message,
    type,
    set,
  };
});
