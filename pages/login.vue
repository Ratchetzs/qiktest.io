<script setup>
import AuthFormHeader from "~/components/AuthFormHeader.vue";
import BackToHome from "~/components/BackToHome.vue";
import Field from "~/components/Field.vue";

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
          <form action="">
            <Field id="userEmail" type="email" label="Email" />
            <Field id="userPassword" type="password" label="Password" />
            <NuxtLink class="forgot-password" to="/"
              >Forgot password ?</NuxtLink
            >
            <div>
              <button disabled type="submit" class="btn btn-primary btn-full">
                Sign in
              </button>
            </div>
          </form>
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
.forgot-password {
  font-size: 12px;
  margin-top: 10px;
  float: right;
}
</style>
