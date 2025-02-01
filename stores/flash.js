import { defineStore } from "pinia";

export const useFlash = defineStore("flash", () => {
  const type = ref("success");
  const message = ref(null);

  const set = (msg, context = "success", delay = 4000) => {
    (message.value = msg), (type.value = context);
    const timeout = setTimeout(() => {
      message.value = null;
      type.value = null;
      clearTimeout(timeout);
    }, delay);
  };

  return {
    message,
    type,
    set,
  };
});
