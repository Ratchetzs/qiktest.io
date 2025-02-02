<script setup>
const auth = useAuth();
const flash = useFlash();

const getApiKeys = async () => {
  try {
    const response = await $fetch('http://localhost:3333/user/api-keys', {
      method:'GET',
      header:{
        Authorization:`Bearer ${auth.user.token}`
      }
    });
    console.log(response);
  } catch (error){
    console.log(error);
  }
}

onMounted(async () => await getApiKeys());

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Settings",
});
</script>

<template>
  <header class="top-bar">
    <nav class="nav nav-full">
      <Logo redirect="/app" />
      <div class="inline-box">
        <ModalUserAvatar src="/images/avatars/me.png" alt="User Avatar" />
      </div>
    </nav>
  </header>
  <main>
    <SettingsSidebar />
    <div class="container">
      <p class="text">
        Manage your api keys.
      </p>
    </div>
  </main>
</template>

<style scoped>
    main {
        margin-top:100px
    }
</style>
