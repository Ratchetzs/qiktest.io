<script setup>
import BackToHome from "~/components/buttons/BackToHome.vue";

const config = useRuntimeConfig();
const apiBase = config.public.api;

const state = reactive({
  fullName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isPasswordValid: false,
  isDisabled: true,
  errors: {},
});

const onFieldFocus = (field) => {
  state.errors[field] = ""; // Supprimer l'erreur du champ
};

const onPasswordValidation = (isValid) => {
  state.isPasswordValid = isValid;
  updateButtonState();
};

const onFieldChange = () => {
  updateButtonState();
};

const updateButtonState = () => {
  state.isDisabled =
    !state.fullName ||
    !state.email ||
    !state.password ||
    !state.passwordConfirmation ||
    !state.isPasswordValid ||
    state.password !== state.passwordConfirmation;
};

const onSubmit = async () => {
  state.errors = {};
  try {
    const url = `${apiBase}/auth/register`;
    const response = await $fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: state.email,
        fullName: state.fullName,
        password: state.password,
        passwordConfirmation: state.passwordConfirmation,
      },
    });

    console.log(response);
  } catch (err) {
    if (err.statusCode === 422) {
      err.data.errors.forEach((error) => {
        state.errors[error.field] = error.message;
      });
    }
  }
};

useSeoMeta({
  title: "Create an account",
});
</script>

<template>
  <div class="wrapper flex flex-center">
    <BackToHome />
    <div class="container">
      <h1><span>🖤</span> Create your account.</h1>
      <form @submit.prevent="onSubmit">
        <Field
          id="newUserFullName"
          label="Full Name"
          v-model="state.fullName"
          :placeholder="state.errors.fullName || ''"
          :error="!!state.errors.fullName"
          @focus="onFieldFocus('fullName')"
          @input="onFieldChange"
        />
        <Field
          v-model="state.email"
          id="newUserEmail"
          type="email"
          label="Email"
          :placeholder="state.errors.email || ''"
          :error="!!state.errors.email"
          @focus="onFieldFocus('email')"
          @input="onFieldChange"
        />
        <Field
          v-model="state.password"
          id="newUserPassword"
          type="password"
          label="Password"
          :placeholder="state.errors.password || ''"
          :error="!!state.errors.password"
          @focus="onFieldFocus('password')"
          @input="onFieldChange"
          @password-valid="onPasswordValidation"
        />
        <Field
          v-model="state.passwordConfirmation"
          id="newUserPasswordConfirm"
          type="password"
          label="Confirm password"
          :placeholder="state.errors.passwordConfirmation || ''"
          :error="!!state.errors.passwordConfirmation"
          @focus="onFieldFocus('passwordConfirmation')"
          @input="onFieldChange"
        />
        <div>
          <button :disabled="state.isDisabled" type="submit" class="btn btn-primary btn-full">
            Create account
          </button>
        </div>
        <div>
          <div class="inline-box flex-between">
            <NuxtLink to="/login">I already have an account</NuxtLink>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
