<script setup>
const auth = useAuth();
const flash = useFlash();
const router = useRouter();

const state = reactive({
  workspace: null,
  userRepositories:[],
  repositories: [],
  repositoryUrl: "",
  repositoryChoise:null,
  modal: false,
});

const handleLoadUserRepositories = async () => {
  try {
    const response = await $fetch("http://localhost:3333/user/repos", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
    });
    state.userRepositories = response;
  } catch (error) {
    console.error(error.data);
  }
};

const handleFindRepository = async () => {
  if (state.repositories.length >= 2) {
    flash.set(
      "Your current free plan supports up to 2 repositories. Upgrade to a premium plan to add more.",
      "info"
    );
    return;
  }
  try {
    state.repositoryUrl = state.repositoryUrl.replace(
      "https://github.com/",
      ""
    );
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
  } catch (error) {
    console.log(error.status);
    switch (error.status) {
      case 401:
        flash.set("Unauthorized access. Please logged in", "error");
        break;
      case 403:
        flash.set(error.data.message, 'info', 6000);
        router.push('/app/settings/add-api-key');
      break;
      case 404:
        flash.set(error.data.message, "error");
        break;
      default:
        flash.set("Failed to add repository", "error");
        break;
    }
  }
};

const handleAddRepository = async (id) => {
  const repository = state.repositories.find((obj) => obj.id === id);
  try {
    await $fetch("http://localhost:3333/user/repos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth.user.token}`,
      },
      body: {
        repositoryId: repository.id,
        url: repository.url,
        name: repository.name,
        description: repository.description || "",
        type: repository.type,
        avatar: repository.owner.avatar,
      },
    });
    flash.set("Repository successfully added", "success");
    state.repositories = state.repositories.filter(
      (obj) => obj.id !== repository.id
    );
    if (state.repositories.length === 0) {
      reloadNuxtApp();
    }
  } catch (error) {
    console.error(error);
    switch (error.status) {
      case 402:
        flash.set(error.data, "info");
        break;
      default:
        flash.set("failed to add repository", "error");
        break;
    }
  }
};



const handleModal = () => (state.modal = !state.modal);
const handleChoiseRepository = () => {
  const id = state.repositoryChoise;
  router.push(`/workspace/${id}`);
}

onMounted(() => handleLoadUserRepositories());

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
      <div v-if="!state.modal" class="container">
        <div v-if="state.userRepositories.length === 0">
          <p>No repositories? That’s like coding without <span class="code">Stack Overflow</span>. Add one!</p>
          <button class="btn btn-primary" @click="handleModal">
            Add repository
          </button>
        </div>
        <div v-else="state.userRepositories > 0">
          <p>Please select a repository for start.</p>
          <form action="" method="post" @submit.prevent="handleChoiseRepository">
            <select v-model="state.repositoryChoise" class="input">
              <option
                v-for="repository in state.userRepositories"
                :value="repository.id"
              >
                {{ repository.name }}
              </option>
            </select>
            <button class="btn btn-primary" type="submit">
              Add to workspace
            </button>
          </form>
        </div>
      </div>
      <div class="container" v-if="state.modal">
        <button @click="handleModal" class="cancel">
          <Icon class="icon" name="ic:baseline-cancel" />
        </button>
        <form class="no-resize" method="post" @submit.prevent="handleFindRepository">
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
        <div class="repository-box" v-if="state.repositories.length > 0">
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
            <button
              @click="handleAddRepository(repository.id)"
              class="btn btn-primary"
              type="submit"
            >
              add
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
