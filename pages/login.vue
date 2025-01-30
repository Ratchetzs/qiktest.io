<script setup>
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
        <header>
          <h1><span>🚀</span> Welcome back</h1>
          <form action="">
            <Field id="userEmail" type="email" label="Email" />
            <Field id="userPassword" type="password" label="Password" />
            <div>
              <button type="submit" class="btn btn-primary btn-full">
                Sign in
              </button>
            </div>
          </form>
        </header>
        <footer>
          <div>
            <span class="divider">Or</span>
          </div>
          <div class="inline-box flex-between align-center">
            <button class="btn btn-icon">
              <Icon class="icon icon-left" name="entypo-social:github" />
              Sign in whit Github
            </button>
            <NuxtLink to="/register">Don't have an account?</NuxtLink>
          </div>
        </footer>
      </div>
    </div>
  </div>
</template>
