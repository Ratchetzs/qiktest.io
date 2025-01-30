<script setup>
const props = defineProps({
  name: String,
});

const state = reactive({
  isActive: false,
});

const onFolderItemClick = () => (state.isActive = !state.isActive);

const handleFolderIcon = () =>
  !state.isActive ? "ep:folder" : "ep:folder-opened";
  
</script>

<template>
  <li class="item item-icon" @click="onFolderItemClick">
    <Icon
      :class="{
        arrow: true,
        icon: true,
        active: state.isActive,
      }"
      name="ep:arrow-right"
    />
    <Icon class="icon icon-left" :name="handleFolderIcon()" />
    {{ name }}
  </li>
</template>
