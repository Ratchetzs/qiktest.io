<script setup>
import { NuxtLoadingIndicator } from "#components";

import { useFlash } from "#imports";
import Pins from "./components/Pins.vue";

const store = useFlash();

</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <div v-if="store.message">
      <Pins :type="store.type" :message="store.message" />
    </div>
    <NuxtPage />
  </div>
</template>
