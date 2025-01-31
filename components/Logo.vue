<script setup>
const props = defineProps({
  redirect: String,
});
</script>

<template>
  <NuxtLink :to="redirect" class="logo">
    <div class="pins pins-success">⚡️ v1.0.0</div>
    QikTest
  </NuxtLink>
</template>
