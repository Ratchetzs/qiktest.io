<script setup>

const props = defineProps({
    src:String,
    alt:String,
})

const state = reactive({
  isActive: false,
});

const handleClick = () => {
  state.isActive = !state.isActive;
};
</script>

<template>
  <div class="nav-modal">
    <Avatar
      :src="props.src"
      :alt="props.alt"
      @click="handleClick"
    />
    <nav :class="{ panel: true, active: state.isActive }">
      <ul>
        <li class="item"><NuxtLink to="">Profile</NuxtLink></li>
        <li class="item"><NuxtLink to="">Repositories</NuxtLink></li>
        <li class="item"><NuxtLink to="">Settings</NuxtLink></li>
        <li class="item">
          <form action="" method="post">
            <button class="btn-logout" type="submit">Logout</button>
          </form>
        </li>
      </ul>
    </nav>
  </div>
</template>
