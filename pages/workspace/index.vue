<script setup>
const auth = useAuth();
const flash = useFlash();

const state = reactive({
  workspace: null,
  repositories: [],
  repositoryUrl: "",
  modal: false,
});

const handleModal = () => (state.modal = !state.modal);

const handleFindRepository = async () => {
  if (state.repositories.length >= 2) {
    flash.set("Your current free plan supports up to 2 repositories. Upgrade to a premium plan to add more.", "info");
    return;
  }
  try {
    const repository = await $fetch(
      `http://localhost:3333/repos/${state.repositoryUrl}`,
      {
        headers: {
          Authorization: `Bearer ${auth.user.token}`,
        },
      }
    );
    state.repositoryUrl = "";

    if (state.repositories.find((obj) => obj.id === repository.id)) {
      flash.set("This repository is already added.", "error");
    } else {
      state.repositories.push(repository);
    }
    console.log(repository);
  } catch (error) {
    console.log(error);
    if (error.status === 404) {
      flash.set(error.data.message, "error");
    }
    if (error.status === 401) {
      flash.set("Unauthorized access. Please logged in", "error");
    }
  }
};

const handleAddRepository = async (id) => {
    const repository = state.repositories.find(obj => obj.id === id);
    console.log(repository.id, repository.name, repository.url);
}

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
          <button class="btn btn-primary" @click="handleModal">
            Add repository
          </button>
          <ModalUserAvatar src="/images/avatars/me.png" alt="Ratchetzs" />
        </div>
      </nav>
    </header>
    <main>
      <div v-if="state.workspace !== null" class="sidebar">
        <h4 class="sidebar-title">Worspace</h4>
        <FileSystem />
      </div>
      <div v-if="!state.modal" class="container">
        <div v-if="state.workspace === null">
          <p>Your Worspace is empty please add new repository</p>
          <button class="btn btn-primary" @click="handleModal">
            Add repository
          </button>
        </div>
      </div>
      <div class="container" v-if="state.modal">
        <button @click="handleModal" class="cancel">
          <Icon class="icon" name="ic:baseline-cancel" />
        </button>
        <form method="post" @submit.prevent="handleFindRepository">
          <Field
            id="repositoryUrl"
            v-model="state.repositoryUrl"
            type="search"
            label="Find repository from Github"
            placeholder="<username>/<repository>"
          />
          <button class="btn btn-primary" type="submit">Find repository</button>
        </form>
        <div v-if="state.repositories.length > 0">
          <div class="repository" v-for="repository in state.repositories">
            <div>
              <div class="inline-box">
                <Avatar :src="repository.owner.avatar" />
                <span>@{{ repository.owner.name }}</span>
              </div>
              <div class="inline-box">
                <h4 class="repository-title">{{ repository.name }}</h4>
                <div class="pins pins-info">{{ repository.type }}</div>
              </div>
              <p>{{ repository.description }}</p>
            </div>
            <button @click="handleAddRepository(repository.id)" class="btn btn-primary" type="submit">add</button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
main {
  margin-top: 100px;
}

form {
  margin-top: 24px;
  margin-bottom: 24px;
}

button[type="submit"] {
  margin-top: 10px;
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

.repository p {
  margin-bottom: 0;
}

.repository-title {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
