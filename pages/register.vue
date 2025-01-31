<script setup>
import BackToHome from "~/components/BackToHome.vue";
import PasswordField from "~/components/PasswordField.vue";
import Field from "~/components/Field.vue";
import AuthFormHeader from "~/components/AuthFormHeader.vue";

const router = useRouter();
const flash = useFlash();
const auth = useAuth();

const state = reactive({
  fullName: "",
  email: "",
  password: "",
  passwordConfirmation: "",
  isPasswordValid: false,
  isDisabled: true,
  isLoading: false,
  errors: {},
});

// Delete error on the field
const onFieldFocus = (field) => {
  state.errors[field] = "";
};

// Enabled the submit button when the rules for password is validated.
const onPasswordValidation = (isValid) => {
  state.isPasswordValid = isValid;
  updateButtonState();
};

// Listen input change event for apply the validation rules dynamicaly
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
  state.isLoading = true;
  state.errors = {};

  const recordedCorrectly = await auth.register(
    state.fullName,
    state.email,
    state.password,
    state.passwordConfirmation
  );

  if(recordedCorrectly){
    state.isLoading = false;
    flash.set(
      "Your account was create successfully. Please logged in.",
      "success"
    );
    router.push("/login");
  } else {
    state.isLoading = false;
    if (auth.errors.status === 422) {
      auth.errors.content.forEach((error) => {
        state[error.field] = "";
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
      <div class="form-container">
        <AuthFormHeader
          mark="⚡️"
          title="Create your account"
          redirectLabel="I already have an account."
          githubLabel="Continue whit Github"
          redirect="/login"
        />
        <footer>
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
            <PasswordField
              v-model="state.password"
              id="newUserPassword"
              type="password"
              label="Password"
              :placeholder="state.errors.password || ''"
              @focus="onFieldFocus('password')"
              @input="onFieldChange"
              :error="!!state.errors.password"
              :passwordConfirmation="state.passwordConfirmation"
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
            <div class="form-loader-button">
              <Loader
                v-if="state.isLoading"
                label="Create account..."
                type="success"
              />
              <button
                v-else
                :disabled="state.isDisabled"
                type="submit"
                class="btn btn-primary btn-full"
              >
                Create account
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  </div>
</template>
