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

<style>
.flash {
  position: absolute;
  width: max-content;
  bottom: 24px;
  right: 24px;
  animation-name: flash;
  animation-duration: 0.4s;
}

.flash > div {
  font-size: 14px;
  font-weight: lighter;
}

@keyframe flash {
  0% {
    transform: translateY(0px);
  }
  ,
  100% {
    transform: translateY(120px);
  }
}
</style>
