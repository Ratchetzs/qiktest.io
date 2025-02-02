<script setup>
const flash = useFlash();
const router = useRouter();
const github = useGithubRepository();

const state = reactive({
  workspace: null,
  repositoryUrl: "",
  repositoryChoice: null,
  modal: false,
});

const getRepositories = async () => {
  const success = await github.getRepositories();
  if (!success) {
    if (github.errors.status === 404) return;
    flash.set(github.errors.content, "error");
  }
};

const findRepository = async () =>
  await github.findRepository(state.repositoryUrl);

const handleAddRepository = async (id) => await github.addRepository(id);

const handleChoiceRepository = () =>
  router.push(`/workspace/${state.repositoryChoice}`);

const handleModal = () => (state.modal = !state.modal);

onMounted(async () => await getRepositories());

definePageMeta({ middleware: "auth" });

useSeoMeta({ title: `Workspace` });
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
          <ModalUserAvatar src="/images/avatars/me.png" alt="User Avatar" />
        </div>
      </nav>
    </header>
    <main>
      <div v-if="!state.modal" class="container">
        <div v-if="github.repositories.length === 0">
          <p>
            No repositories? That’s like coding without
            <span class="code">Stack Overflow</span>. Add one!
          </p>
          <button class="btn btn-primary" @click="handleModal">
            Add repository
          </button>
        </div>
        <div v-else-if="github.repositories.length > 0">
          <p>Please select a repository to start.</p>
          <form @submit.prevent="handleChoiceRepository">
            <label for="repository-select">Select a repository:</label>
            <select
              v-model="state.repositoryChoice"
              id="repository-select"
              class="input"
            >
              <option disabled value="">-- Select a repository --</option>
              <option
                v-for="repository in github.repositories"
                :key="repository.repositoryId"
                :value="repository.repositoryId"
              >
                {{ repository.name }}
              </option>
            </select>
            <button
              class="btn btn-primary"
              type="submit"
              :disabled="!state.repositoryChoice"
            >
              Add to workspace
            </button>
            <p v-if="!github.repositories.length">
              No repositories found. Sync with GitHub first.
            </p>
          </form>
        </div>
      </div>
      <div class="container" v-if="state.modal">
        <button @click="handleModal" class="cancel">
          <Icon class="icon" name="ic:baseline-cancel" />
        </button>
        <form class="no-resize" @submit.prevent="findRepository">
          <Field
            id="repositoryUrl"
            v-model="state.repositoryUrl"
            type="search"
            label="Find repository from Github"
            placeholder="<username>/<repository>"
          />
          <p class="text-small">
            You can paste your
            <span class="code">GitHub repository URL</span> or simply type
            <span class="code">githubUsername / repositoryName</span>
          </p>
          <button class="btn btn-primary" type="submit">Find repository</button>
        </form>
        <div class="repository-box" v-if="github.repositoriesFound.length > 0">
          <div
            class="repository"
            v-for="repository in github.repositoriesFound"
          >
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
            <button
              @click="handleAddRepository(repository.id)"
              class="btn btn-primary"
            >
              Add
            </button>
          </div>
        </div>
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

form.no-resize {
  min-height: 175px;
}

.repository-box {
  max-height: 295px;
  overflow-y: scroll;
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
