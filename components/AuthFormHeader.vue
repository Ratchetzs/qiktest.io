<script setup>
import GithubAuthButton from "./GithubAuthButton.vue";

const props = defineProps({
  title:String,
  mark:String,
  redirect: String,
  redirectLabel: String,
  githubLabel: String,
});
</script>

<template>
  <header>
    <h1><span>{{ mark }}</span> {{ title }}</h1>
    <div class="inline-box flex-between align-center">
      <GithubAuthButton :label="githubLabel" />
      <NuxtLink :to="redirect">{{ redirectLabel }}</NuxtLink>
    </div>
    <div>
      <span class="divider">Or</span>
    </div>
  </header>
</template>
