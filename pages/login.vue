<script setup>
import { useFlash } from "#imports";
import { useAuth } from "#imports";
import BackToHome from "~/components/BackToHome.vue";
import Field from "~/components/Field.vue";
import AuthFormHeader from "~/components/AuthFormHeader.vue";

const router = useRouter();
const flash = useFlash();
const auth = useAuth();

const state = reactive({
  email: "",
  password: "",
  isDisabled: true,
  isLoading: false,
  errors: {},
});

// Delete error on the field
const onFieldFocus = (field) => {
  state.errors[field] = "";
};

// Listen input change event for apply the validation rules dynamicaly
const onFieldChange = () => {
  updateButtonState();
};

const updateButtonState = () => {
  state.isDisabled = !state.email || !state.password;
};

const onSubmit = async () => {
  state.isLoading = true;
  state.errors = {};

  const loginSuccess = await auth.authenticate(state.email, state.password);

  if (loginSuccess) {
    state.isLoading = false;
    flash.set("Logged in successfully.", "success");
    router.push("/app");
  } else {
    state.isLoading = false;
    if (auth.errors.status === 422) {
      auth.errors.content.forEach((error) => {
        state[error.field] = "";
        state.errors[error.field] = error.message;
      });
    }
    if (auth.errors.status === 400) {
      auth.errors.content.forEach((error) => {
        flash.set(error.message, 'error');
      });
    }
  }
};

useSeoMeta({
  title: "Sign in",
});
</script>

<template>
  <div class="wrapper flex flex-center">
    <BackToHome />
    <div class="container">
      <div class="form-container">
        <AuthFormHeader
          mark="🚀"
          title="Welcome back"
          redirectLabel="Don't have an account ?"
          githubLabel="Sign in whit Github"
          redirect="/register"
        />
        <footer>
          <form @submit.prevent="onSubmit">
            <Field
              id="userEmail"
              type="email"
              label="Email"
              v-model="state.email"
              :placeholder="state.errors.email || ''"
              :error="!!state.errors.email"
              @focus="onFieldFocus('email')"
              @input="onFieldChange"
            />
            <Field
              id="userPassword"
              type="password"
              label="Password"
              v-model="state.password"
              :placeholder="state.errors.password || ''"
              :error="!!state.errors.password"
              @focus="onFieldFocus('password')"
              @input="onFieldChange"
            />
            <NuxtLink class="forgot-password" to="/"
              >Forgot password ?</NuxtLink
            >
            <div class="form-loader-button">
              <Loader
                v-if="state.isLoading"
                label="Sign in..."
                type="success"
              />
              <button
                v-else
                :disabled="state.isDisabled"
                type="submit"
                class="btn btn-primary btn-full"
              >
                Sign in
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  </div>
</template>
