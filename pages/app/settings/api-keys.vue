<script setup>
const apikeys = useApikeys();

onMounted(async () => await apikeys.getAll());

const handleUpdate = async (id) => await apikeys.updateHasDefault(id);

const handleDelete = async (id) => await apikeys.deleteKey(id);

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: "Settings",
});
</script>

<template>
  <header class="top-bar">
    <nav class="nav nav-full">
      <Logo redirect="/app" />
      <div class="inline-box">
        <NuxtLink to="/app/settings/add-api-key" class="btn btn-primary btn-small">New key</NuxtLink>
        <ModalUserAvatar src="/images/avatars/me.png" alt="User Avatar" />
      </div>
    </nav>
  </header>
  <main>
    <SettingsSidebar />
    <div class="container">
      <div v-if="apikeys.apiKeys.length > 0">
        <div class="key" v-for="key in apikeys.apiKeys">
          <div class="inline-box flex-between">
            <div>
              <div class="inline-box">
                <span v-if="key.default" class="pins pins-info"
                  >Default key</span
                >
                <h4>{{ key.name }}</h4>
              </div>
              <p>{{ key.value }}</p>
            </div>
            <div class="inline-box">
              <button
                :disabled="apikeys.loadingUpdate[key.id]"
                @click="handleUpdate(key.id)"
                v-if="!key.default"
                class="btn btn-small btn-icon"
              >
                <Icon
                  v-if="apikeys.loadingUpdate[key.id]"
                  class="icon icon-left"
                  name="svg-spinners:270-ring-with-bg"
                />
                Use has default
              </button>
              <button
                :disabled="apikeys.loadingDelete[key.id]"
                v-if="!key.default"
                @click="handleDelete(key.id)"
                title="delete this key"
                class="btn btn-small btn-danger btn-icon"
              >
                <Icon
                  v-if="apikeys.loadingDelete[key.id]"
                  class="icon icon-left"
                  name="svg-spinners:270-ring-with-bg"
                />
                <Icon v-else class="icon" name="ic:baseline-delete-outline" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <p class="text">
          You have any api keys registered. Please add keys to continue
        </p>
        <NuxtLink class="btn btn-primary" to="/app/settings/add-api-key">
          Add key
        </NuxtLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 100px;
}

.key {
  border-bottom: 1px solid var(--default-border);
  margin-bottom: 20px;
  padding: 10px;
}

.pins {
  font-size: 12px;
  font-weight: lighter;
  padding: 4px;
}

.key p {
  margin-bottom: 10px;
}

.btn {
  margin-top: 10px;
}
</style>
