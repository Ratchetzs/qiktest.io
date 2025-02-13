<script setup>

const props = defineProps({
  id: String,
  type: { type: String, default: "text" },
  label: String,
  modelValue: { type: String, default: "" }, // ✅ Toujours une valeur par défaut
  placeholder: String,
  error: Boolean,
});

const emit = defineEmits(["update:modelValue", "focus"]);

const onChange = (e) => {
  emit("update:modelValue", e.target.value);
};

// ✅ Meilleure gestion des classes avec `computed`
const inputClass = computed(() => `input ${props.error ? "input-error" : ""}`);
</script>

<template>
  <div class="field">
    <label v-if="label" class="input-label" :for="id">{{ label }}</label>

    <textarea
      v-if="type === 'textarea'"
      :id="id"
      :class="inputClass"
      :placeholder="placeholder"
      :value="modelValue || ''"
      @input="onChange"
      @focus="$emit('focus')"
    ></textarea>

    <input
      v-else
      :id="id"
      :class="inputClass"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue || ''"
      @input="onChange"
      @focus="$emit('focus')"
    />
  </div>
</template>

