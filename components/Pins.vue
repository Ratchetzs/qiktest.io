<script setup>
const props = defineProps({
  type: String,
  message: String,
});

const cls = (type) => `pins pins-${type}`;
</script>

<template>
  <div class="flash">
    <div :class="cls(type)">{{ message }}</div>
  </div>
</template>

