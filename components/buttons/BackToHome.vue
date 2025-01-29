<style>
    .home-btn {
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        top: 24px;
    }
</style>

<template>
  <div class="home-btn">
    <NuxtLink to="/" class="btn btn-icon">
      <Icon class="icon icon-left" name="ri:home-3-line" />
      home
    </NuxtLink>
  </div>
</template>
