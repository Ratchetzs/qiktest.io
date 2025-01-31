<script setup>

const props = defineProps({
    src:String,
    alt:String,
    name:String,
    small:Boolean,
});

const cls = () => `avatar ${props.small ? 'avatar-small' : ''}`;

</script>

<template>
  <button :class="cls()">
    <img
      class="avatar-image"
      :src="src"
      :alt="alt"
    />
    <span v-if="name" class="avatar-name">{{ name }}</span>
  </button>
</template>
