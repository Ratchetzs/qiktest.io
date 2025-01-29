<script setup>
const props = defineProps({
  id: String,
  type: { type: String, default: "text" },
  label: String,
  modelValue: String,
  placeholder: String,
  error: Boolean,
});

const emit = defineEmits(["update:modelValue", "focus", "password-valid"]);

const state = reactive({
  passwordBoxIsShow: false,
  passwordRules: {
    minLength: false,
    hasNumber: false,
    hasUppercase: false,
    hasSpecialChar: false,
  },
});

const onChange = (e) => {
  const value = e.target.value;
  emit("update:modelValue", value);

  if (props.type === "password" && props.id === "newUserPassword") {
    state.passwordBoxIsShow = value.length > 0;
    validatePassword(value);
  }
};

const validatePassword = (password) => {
  state.passwordRules.minLength = password.length >= 8;
  state.passwordRules.hasNumber = /\d/.test(password);
  state.passwordRules.hasUppercase = /[A-Z]/.test(password);
  state.passwordRules.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid = Object.values(state.passwordRules).every(Boolean);
  emit("password-valid", isValid);
};

const cls = () => `input ${props.error ? "input-error" : ""}`;
</script>

<template>
  <div class="field">
    <label class="input-label" :for="id">{{ label }}</label>
    <input
      :id="id"
      :class="cls()"
      :type="type"
      :placeholder="placeholder"
      :value="modelValue"
      @input="onChange"
      @focus="$emit('focus')"
    />

    <div v-if="state.passwordBoxIsShow" class="password-input-box">
      <p :class="{ success: state.passwordRules.minLength }"><Icon name="ic:outline-check" /> At least 8 characters.</p>
      <p :class="{ success: state.passwordRules.hasNumber }"><Icon name="ic:outline-check" /> At least one digit.</p>
      <p :class="{ success: state.passwordRules.hasUppercase }"><Icon name="ic:outline-check" /> At least one capital letter.</p>
      <p :class="{ success: state.passwordRules.hasSpecialChar }"><Icon name="ic:outline-check" /> At least one special character.</p>
    </div>
  </div>
</template>

<style scoped>
.password-input-box {
    background-color: var(--dark-box-bg);
    padding: 12px;
    position: absolute;
    bottom: -20px;
    transform: translateY(50%);
    right: -240px;
    box-shadow: var(--dark-box-shadow);
}

.password-input-box p {
  font-size: 14px;
  margin: 4px 0;
  color: var(--dark-text-subtil);
  transition: color 0.3s ease;
}

.password-input-box p.success {
  color: var(--green);
}
</style>
