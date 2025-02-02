<script setup>
const props = defineProps({
  type: String,
  label: String,
  fullWidth: Boolean
});

const cls = (type) => `pins pins-${type} ${props.fullWidth ? 'full-width' : ''}`;
</script>

<template>
  <div :class="cls(type)">
    <Icon class="icon icon-left" name="svg-spinners:270-ring-with-bg" />
    {{ label }}
  </div>
</template>
