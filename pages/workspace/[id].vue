<script setup>

const auth = useAuth();
const flash = useFlash();
const router = useRouter();

const selectedFile = ref(null);

const state = reactive({
  content:null,
});

const selectFile = (file) => {
  selectedFile.value = file;
};

const handleLoadContent = async () => {
  const id = useRoute().params.id
  try {
    const response = await $fetch(`http://localhost:3333/user/repos/${id}`, {
      headers:{
        'Authorization': `Bearer ${auth.user.token}`
      }
    });
    console.log(response);
  } catch (error) {
    if(error.data.status === 403){
      flash.set(error.data.message, 'info', 6000);
      router.push('/app/settings/add-api-key');
    } else {
      flash.set(error.data.message, 'error');
    }
  }
}


onMounted(() => {
  handleLoadContent();
})

definePageMeta({
  middleware: "auth",
});

useSeoMeta({
  title: `Workspace`,
});
</script>

<template>
  <div class="wrapper">
    <header class="top-bar">
      <nav class="nav nav-full">
        <Logo redirect="/app" />
        <div class="inline-box">
          <ModalUserAvatar src="/images/avatars/me.png" alt="Ratchetzs" />
        </div>
      </nav>
    </header>
    <main>
      <div v-if="state.content !== null" class="sidebar">
        <h4 class="sidebar-title">Worspace</h4>
        <ul>
          <FolderItem
            v-for="(value, key) in state.content"
            :key="key"
            :name="key"
            :item="value"
            @fileSelected="selectFile"
          />
        </ul>
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.code {
  display: inline-block;
  width: max-content;
  color: #fff;
  background: #1e1e1e;
}

form {
  margin-top: 24px;
}

button[type="submit"] {
  margin-top: 20px;
}

.container {
  position: relative;
}

.container p {
  margin-bottom: 24px;
}

.pins {
  margin-bottom: 10px;
}

.cancel {
  position: absolute;
  left: 0;
  top: 0;
  color: var(--dark-text-subtil);
  transition: color 0.2s;
}

.cancel:hover {
  background: none;
  color: var(--dark-text);
}

.repository {
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid var(--default-border);
}

.repository:first-of-type {
  margin-top: 24px;
}

.repository p,
form p {
  margin-bottom: 0;
}

.repository-title {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style> 
