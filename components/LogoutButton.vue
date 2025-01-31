<script setup>
const router = useRouter();
const flash = useFlash();
const auth = useAuth();

const state = reactive({
  isLoading: false,
  errors: {},
});
const onSubmit = async () => {
  state.isLoading = true;
  state.errors = {};

  const disconnectedCorrectly = await auth.logout(auth.user.token);

  if (disconnectedCorrectly) {
    state.isLoading = false;
    flash.set("Logged out successfully.", "success");
    router.push("/login");
  } else {
    state.isLoading = false;
    if (auth.errors.status === 401) {
      auth.errors.content.forEach((error) => {
        flash.set(error.message, "error");
      });
    }
  }
};
</script>

<template>
  <form method="post" @submit.prevent="onSubmit">
    <button class="btn-logout btn-icon" type="submit">
      <Icon
        v-if="state.isLoading"
        class="icon icon-left"
        name="svg-spinners:180-ring-with-bg"
      />
      <Icon v-else 
        class="icon icon-left"
        name="ic:baseline-logout"
      />
      Logout
    </button>
  </form>
</template>
