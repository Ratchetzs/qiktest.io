<script setup>
const route = useRoute();
const isActive = (path) => route.path === path;
</script>

<template>
  <div class="sidebar">
    <nav>
      <h4 class="sidebar-title">Settings</h4>
      <span class="sidebar-items-info">General</span>
      <ul>
        <li :class="{ item: true, active: isActive('/app/settings/account') }">
          <NuxtLink class="btn-icon" to="/app/settings/account"
            ><Icon name="ic:sharp-manage-accounts" class="icon icon-left" />
            Account</NuxtLink
          >
        </li>
        <li
          :class="{ item: true, active: isActive('/app/settings/appearance') }"
        >
          <NuxtLink class="btn-icon" to="">
            <Icon
              name="ic:round-imagesearch-roller"
              class="icon icon-left"
            />Appearance</NuxtLink
          >
        </li>
      </ul>
      <span class="sidebar-items-info">Workspace</span>
      <ul>
        <li
          :class="{
            item: true,
            active: isActive('/app/settings/repositories'),
          }"
        >
          <NuxtLink class="btn-icon" to=""
            ><Icon name="ic:baseline-terminal" class="icon icon-left" />
            Repositories</NuxtLink
          >
        </li>
      </ul>
      <span class="sidebar-items-info">Accessibility</span>
      <ul>
        <li
          :class="{ item: true, active: isActive('/app/settings/add-api-key') }"
        >
          <NuxtLink class="btn-icon" to="/app/settings/add-api-key"
            ><Icon name="ic:baseline-key" class="icon icon-left" />Add API
            Key</NuxtLink
          >
        </li>
        <li :class="{ item: true, active: isActive('/app/settings/api-keys') }">
          <NuxtLink class="btn-icon" to=""
            ><Icon name="ic:baseline-key-off" class="icon icon-left" />Manage
            API Keys</NuxtLink
          >
        </li>
      </ul>
    </nav>
  </div>
</template>
