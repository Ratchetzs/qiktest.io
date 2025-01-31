<script setup>
import AuthFormHeader from "~/components/AuthFormHeader.vue";
import BackToHome from "~/components/BackToHome.vue";
import Field from "~/components/Field.vue";
import Loader from "~/components/Loader.vue";

const router = useRouter();
const config = useRuntimeConfig();
const flashStore = useFlash();
const authStore = useAuth();
const apiBase = config.public.apiBase;

console.log(authStore.getUserToken)

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
  try {
    const user = await $fetch(`${apiBase}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: state.email,
        password: state.password,
      },
    });
    state.isLoading = false;
    flashStore.flash("Successfully logged in.", "success");
    router.push("/app");
  } catch (err) {
    state.isLoading = false;
    console.error(err.data.errors);
    if (err.statusCode === 422) {
      err.data.errors.forEach((error) => {
        state[error.field] = "";
        state.errors[error.field] = error.message;
      });
    }
    if (err.statusCode === 400) {
      err.data.errors.forEach((error) => {
        dlashStore.flash(error.message, "error");
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
