<script setup>
const state = reactive({
  keyName: "",
  keyValue: "",
});

const handleSubmit = () => {
  // Ajouter ici la logique pour sauvegarder la clé
  console.log("Key added:", state.keyName, state.keyValue);
};

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
        <ModalUserAvatar src="/images/avatars/me.png" alt="User Avatar" />
      </div>
    </nav>
  </header>
  <main>
    <SettingsSidebar />
    <div class="container">
      <p class="text">
        Add your GitHub Developer key to manage your repositories efficiently.
      </p>
      <form @submit.prevent="handleSubmit">
        <Field
          type="text"
          v-model="state.keyName"
          label="Key Name"
          placeholder="An unique name for your key"
        />
        <Field type="textarea" v-model="state.keyValue" label="Key Value" />
        <button class="btn btn-primary" type="submit">Add Key</button>
      </form>
    </div>
  </main>
</template>

<style scoped>
main {
  margin-top: 100px;
}

.btn {
  margin-top: 24px;
}
.text {
  margin-bottom: 24px;
}
</style>
