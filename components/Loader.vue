<script setup>
defineProps({
  type: String,
  label: String,
});

const cls = (type) => `pins pins-${type}`;
</script>

<template>
  <div :class="cls(type)">
    <Icon class="icon icon-left" name="svg-spinners:180-ring-with-bg" />
    {{ label }}
  </div>
</template>
