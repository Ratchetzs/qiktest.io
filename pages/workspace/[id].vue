<script setup>
import Loader from "~/components/Loader.vue";

const auth = useAuth();
const flash = useFlash();
const router = useRouter();
const github = useGithubRepository();

const props = defineProps({
  data: Object,
});

const selectedFile = ref(null);

const state = reactive({
  content: null,
  loading: false,
});

const findKey = (obj, keyToFind) => {
  for (const key in obj) {
    if (key === keyToFind) return obj[key]; // Trouvé !
    if (typeof obj[key] === "object" && obj[key] !== null) {
      const result = findKey(obj[key], keyToFind);
      if (result !== undefined) return result;
    }
  }
  return undefined;
};

const selectFile = (file) => {
  const target = findKey(state.content, file.name);
  console.log(`File selected: ${target}`);
  selectedFile.value = ""; // Reset
  if (target) {
    nextTick(() => {
      selectedFile.value = atob(target.value);
    });
  }
};

const handleLoadContent = async () => {
  state.loading = true;
  const id = useRoute().params.id;
  try {
    const response = await $fetch(`http://localhost:3333/user/repos/${id}`, {
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });
    state.loading = false;
    state.content = response.content;
    github.repositoryContent = {id, value: state.content};
  } catch (error) {
    if (error.data.status === 403) {
      state.loading = false;
      flash.set(error.data.message, "info", 6000);
      router.push("/app/settings/add-api-key");
    } else {
      flash.set(error.data.message, "error");
    }
  }
};

onMounted(() => {
  const id = useRoute().params.id;
  if(github.repositoryContent.id === null || github.repositoryContent.id !== id ){
    handleLoadContent();
  } else {
    state.content = github.repositoryContent.value;
  }
});

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
    <aside v-if="state.content !== null" class="sidebar">
      <h4 class="sidebar-title">Worspace</h4>
      <ul class="nav-sidebar">
        <FolderItem
          v-for="(value, key) in state.content"
          :key="key"
          :name="key"
          :item="value"
          @fileSelected="selectFile"
        />
      </ul>
    </aside>
    <main>
      <div v-if="state.loading">
        <Loader label="Chargement..." />
      </div>
      <div class="editor" v-if="selectedFile">
        <CodeEditor v-model="selectedFile" :language="'javascript'" />
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

.sidebar {
  width: 300px;
  overflow-y: scroll;
}

.nav-sidebar {
  margin-left: 20px;
}

.editor {
  position: absolute;
  top: 75px;
  right: -20px;
  height: 100vh;
  width: calc(100vw - 300px);
}

</style>
