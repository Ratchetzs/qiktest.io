<script setup>
import Pins from "./components/Pins.vue";

const flash = useFlash();

</script>

<template>
  <div>
    <NuxtLoadingIndicator />
    <div v-if="flash.message">
      <Pins :type="flash.type" :message="flash.message" />
    </div>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>
