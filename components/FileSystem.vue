<script setup>

const props = defineProps({
  data:Object
})

const selectedFile = ref(null);

const selectFile = (file) => {
  selectedFile.value = file;
};

</script>

<template>
  <ul>
    <FolderItem
      v-for="(value, key) in data"
      :key="key"
      :name="key"
      :item="value"
      @fileSelected="selectFile"
    />
  </ul>
  <div class="editor" v-if="selectedFile">
      <h2>{{ selectedFile.name }}</h2>
      <pre>{{ selectedFile.content }}</pre>
  </div>
</template>
