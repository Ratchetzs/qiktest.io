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
      <div class="logo">
        <div class="pins pins-success">⚡️ v1.0.0</div>
        QikTest
      </div>
      <div class="inline-box">
        <NuxtLink class="btn btn-primary btn-small" to="">New test</NuxtLink>
        <ModalUserAvatar src="/images/avatars/me.png" alt="Ratchetzs" />
      </div>
    </nav>
  </header>
  <main>
    <div class="sidebar">
      <nav>
        <ul>
          <li class="item">aa</li>
        </ul>
      </nav>
    </div>
  </main>
</template>
