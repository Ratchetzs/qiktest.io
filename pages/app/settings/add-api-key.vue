<script setup>
const auth = useAuth();
const flash = useFlash();

const state = reactive({
  keyName: "",
  keyValue: "",
  isDisabled:true,
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
  try {
    await $fetch('http://localhost:3333/user/api-keys', {
      method:'POST',
      headers:{
        Authorization:`Bearer ${auth.user.token}`
      },
      body:{
        name:state.keyName,
        value:state.keyValue,
      }
    });
    flash.set('Your key was successfully stored.', 'success');
  } catch(error) {
    console.log(error);
  }
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
        <button :disabled="state.isDisabled" class="btn btn-primary" type="submit">Add Key</button>
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
