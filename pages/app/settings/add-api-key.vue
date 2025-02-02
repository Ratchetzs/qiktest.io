<script setup>
const apikeys = useApikeys();

const state = reactive({
  keyName: "",
  keyValue: "",
  isDisabled: true,
  isLoading: false,
  errors: {},
});

// Delete error on the field
const onFieldFocus = (field) => {
  state.errors[field] = "";
};

// Listen input change event for apply the validation rules dynamicaly
const onFieldChange = () => {
  updateButtonState();
};

const updateButtonState = () => {
  state.isDisabled = !state.keyName || !state.keyValue;
};

const handleSubmit = async () => {
  state.isLoading = true;
  await apikeys.add(state.keyName, state.keyValue);
  state.keyName = '';
  state.keyValue = '';
  state.isLoading = false;
  state.isDisabled = true;
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
          placeholder="A unique name for your key"
          @focus="onFieldFocus('name')"
          @input="onFieldChange"
        />
        <Field
          type="textarea"
          v-model="state.keyValue"
          label="Key Value"
          @focus="onFieldFocus('value')"
          @input="onFieldChange"
        />
        <Loader v-if="state.isLoading" label="Add Key"/>
        <button v-else
          :disabled="state.isDisabled"
          class="btn btn-primary"
          type="submit"
        >
          Add Key
        </button>
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
