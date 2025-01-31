<script setup>
import { useUser } from "#imports";

const userStore = useUser();
const user = userStore.getUser;

console.log(userStore.getUser.fullName);

useSeoMeta({
  title: "App",
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
