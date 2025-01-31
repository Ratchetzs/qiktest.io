<script setup>
const route = useRoute();

const isActive = (path) => route.path === path;

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Settings | Account",
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

    </div>
  </main>
</template>

<style scoped>

main {
    margin-top: 100px;
}
</style>
