<script setup>
const props = defineProps({
  src: String,
  alt: String,
});

const state = reactive({
  isActive: false,
});

const handleClick = () => {
  state.isActive = !state.isActive;
};
</script>

<template>
  <div class="nav-modal">
    <Avatar :src="props.src" :alt="props.alt" @click="handleClick" />
    <nav :class="{ panel: true, active: state.isActive }">
      <ul>
        <li class="item">
          <NuxtLink class="btn-icon" to=""
            ><Icon name="ic:sharp-manage-accounts" class="icon icon-left" />
            Profile</NuxtLink
          >
        </li>
        <li class="item">
          <NuxtLink class="btn-icon" to="">
            <Icon
              name="ic:baseline-terminal"
              class="icon icon-left"
            />Repositories</NuxtLink
          >
        </li>
        <li class="item">
          <NuxtLink class="btn-icon" to="">
            <Icon
              name="ic:round-settings"
              class="icon icon-left"
            />Settings</NuxtLink
          >
        </li>
        <li class="item">
          <LogoutButton />
        </li>
      </ul>
    </nav>
  </div>
</template>
