<script setup>
defineProps({
  label: String,
});
</script>

<template>
  <button class="btn btn-icon">
    <Icon class="icon icon-left" name="entypo-social:github" />
    {{ label }}
  </button>
</template>
