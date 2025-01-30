<script setup>
const props = defineProps({
  id: String,
  type: { type: String, default: "text" },
  label: String,
  modelValue: String,
  placeholder: String,
  error: Boolean,
  passwordConfirmation: String, // Prop pour la confirmation du mot de passe
});

const emit = defineEmits(["update:modelValue", "focus", "password-valid"]);

const state = reactive({
  passwordBoxIsShow: false,
  passwordRules: {
    confirmed: false,
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
    // Vérification de la confirmation du mot de passe à chaque changement
    validatePassword(value, props.passwordConfirmation);
  }
};

// Écoute de la prop passwordConfirmation pour la validation
watch(
  () => props.passwordConfirmation,
  (newValue) => {
    if (props.type === "password" && props.id === "newUserPassword") {
      validatePassword(props.modelValue, newValue);
    }
  }
);

// Valide le mot de passe avec les différentes règles
// Emet l'événement password-valid si toutes les règles sont validées
const validatePassword = (password, passwordConfirmed) => {
  state.passwordRules.minLength = password.length >= 8;
  state.passwordRules.hasNumber = /\d/.test(password);
  state.passwordRules.hasUppercase = /[A-Z]/.test(password);
  state.passwordRules.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
  state.passwordRules.confirmed = password === passwordConfirmed;

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
      <p :class="{ success: state.passwordRules.minLength }">
        <Icon class="icon-left" name="ic:outline-check" /> 8+ characters
      </p>
      <p :class="{ success: state.passwordRules.hasNumber }">
        <Icon class="icon-left" name="ic:outline-check" /> A number
      </p>
      <p :class="{ success: state.passwordRules.hasUppercase }">
        <Icon class="icon-left" name="ic:outline-check" /> An uppercase letter
      </p>
      <p :class="{ success: state.passwordRules.hasSpecialChar }">
        <Icon class="icon-left" name="ic:outline-check" /> A special character
      </p>
      <p :class="{ success: state.passwordRules.confirmed }">
        <Icon class="icon-left" name="ic:outline-check" /> Your passwords match
      </p>
    </div>
  </div>
</template>

<style scoped>
.password-input-box {
  position: absolute;
  width: max-content;
  right: -180px;
  bottom: -90px;
  padding: 12px;
  background-color: var(--dark-box-bg);
  box-shadow: var(--dark-box-shadow);
  border-radius: var(--radius);
  z-index: 9;
}

.password-input-box p {
  display: flex;
  align-items: center;
  font-size: 12px;
  margin: 4px 0;
  color: var(--dark-text-subtil);
  transition: color 0.3s ease;
}

.password-input-box p.success {
  color: var(--green);
}
</style>
