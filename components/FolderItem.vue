<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  name: String,
  item: Object,
  level: {
    type: Number,
    default: 0,
  },
});

const emit = defineEmits(["fileSelected"]);

const isDirectory = computed(() => props.item?.type === "dir");
const isOpen = ref(false);

const toggle = () => {
  if (isDirectory.value) {
    isOpen.value = !isOpen.value;
  } else {
    emit("fileSelected", {
      name: props.name,
      content: props.item.content,
      ext: props.item.ext,
    });
  }
};
</script>

<template>
  <li v-if="item">
    <div
      @click="toggle"
      class="folder-item"
      :style="{ paddingLeft: `${level * 15}px` }"
    >
      <span v-if="isDirectory" class="arrow" :class="{ open: isOpen }">▶</span>
      <span v-if="isDirectory">📂 {{ name }}</span>
      <span v-else>📄 {{ name }}</span>
    </div>
    <ul v-if="isOpen && isDirectory">
      <FolderItem
        v-for="(value, key) in item.content"
        :key="key"
        :name="key"
        :item="value"
        :level="level + 1"
        @fileSelected="emit('fileSelected', $event)"
      />
    </ul>
  </li>
</template>

<style scoped>

span {
  display: inline-flex;
}

.folder-item {
  cursor: pointer;
  padding: 5px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  gap: 5px;
}

.folder-item:hover {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.arrow {
  transition: transform 0.2s;
  font-size: 12px;
  margin-left: 10px;
}

.arrow.open {
  transform: rotate(90deg);
}

.item {
  display: flex
}
</style>
