<script setup>

const auth = useAuth();

definePageMeta({
    middleware: 'auth'
});

useSeoMeta({
  title: `Welcome ${auth.user.fullName}`, 
});
</script>

<template>
  <header class="top-bar">
    <nav class="nav nav-full">
      <Logo redirect="/app" />
      <div class="inline-box">
        <NuxtLink class="btn btn-primary btn-small" to="/workspace">New test</NuxtLink>
        <ModalUserAvatar src="/images/avatars/me.png" alt="Ratchetzs" />
      </div>
    </nav>
  </header>
  <main>

  </main>
</template>
