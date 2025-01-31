<script setup>
const props = defineProps({
  id: String,
  type: { type: String, default: "text" },
  label: String,
  modelValue: String,
  placeholder: String,
  error: Boolean,
});

const emit = defineEmits(["update:modelValue", "focus"]);

const onChange = (e) => {
  const value = e.target.value;
  emit("update:modelValue", value);
};

const cls = () => `input ${props.error ? "input-error" : ""}`;
</script>

<template>
  <div class="field">
    <label class="input-label" :for="id">{{ label }}</label>
    <textarea v-if="type === 'textarea'" 
      :id="id"
      :class="cls()"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onChange"
      @focus="$emit('focus')"
    >
    </textarea>
    <input
      v-else
      :id="id"
      :class="cls()"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onChange"
      @focus="$emit('focus')"
    />
  </div>
</template>
