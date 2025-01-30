<script setup>
import { Icon, NuxtLink } from "#components";
import FileSystem from "~/components/FileSystem.vue";
import FolderItem from "~/components/FolderItem.vue";
import PasswordField from "~/components/PasswordField.vue";

const config = useRuntimeConfig();

const state = reactive({
  password: "",
});

useSeoMeta({
  title: "Testsflow's UI KIT",
});
</script>

<template>
  <div class="wrapper">

    <div class="sidebar">
      <FileSystem />
    </div>

    <div class="container">
      <section>
        <div class="inline-box flex-between">
          <h1>👏 Welcom to {{config.public.appName}} UI Kit</h1>
          <NuxtLink to="/" class="btn btn-small btn-icon">
            <Icon class="icon icon-left" name="ri:home-3-line" />
            home
          </NuxtLink>
        </div>
        <p>
          Icons found on <a href="https://icones.js.org/">icones.js.org</a>
        </p>
        <p>
          Making by
          <NuxtLink
            to="https://github.com/Ratchetzs"
            target="_blank"
            rel="noopener noreferrer"
          >
            @Ratchetzs
          </NuxtLink>
        </p>
      </section>

      <section>
        <h2>Buttons</h2>
        <div class="inline-box">
          <button class="btn">Default Button</button>
          <button class="btn btn-primary">Primary Button</button>
          <button class="btn btn-secondary">Secondary Button</button>
          <button class="btn" disabled>Disabled Button</button>
        </div>
      </section>

      <section>
        <h2>Icon Buttons / Loaders / Items</h2>
        <div class="inline-box">
          <button class="btn btn-icon">
            <Icon class="icon icon-left" name="entypo-social:github" />
            github
          </button>
          <button class="btn btn-white btn-icon">
            <Icon class="icon icon-left" name="ri:home-3-line" />
            home
          </button>
          <FolderItem name="untitled folder" />
          <div class="pins pins-info">
            <Icon class="icon icon-left" name="svg-spinners:blocks-shuffle-2" />
            Chargement ...
          </div>
          <div class="pins pins-info">
            <Icon class="icon icon-left" name="svg-spinners:180-ring-with-bg" />
            Chargement ...
          </div>
        </div>
      </section>

      <section>
        <h2>Badges</h2>
        <div class="inline-box">
          <div class="pins pins-success">Success</div>
          <div class="pins pins-warning">Warning</div>
          <div class="pins pins-error">Error</div>
          <div class="pins pins-info">Info</div>
        </div>
      </section>

      <section>
        <h2>Avatars</h2>
        <div class="inline-box">
          <Avatar
            src="/images/avatars/me.png"
            alt="Nom de l'utilisateur"
            name="Ratchetzs"
          />
          <Avatar
            src="/images/avatars/random.jpg"
            alt="Nom de l'utilisateur"
            name="Marie Smith"
          />
          <Avatar
            src="/images/avatars/random2.jpg"
            alt="Nom de l'utilisateur"
            name="Eliot Smith"
          />
          <Avatar
            src="/images/avatars/me.png"
            alt="Nom de l'utilisateur"
            name="Ratchetzs"
            small
          />
        </div>
      </section>

      <section>
        <h2>Input Fields <span>( You can try the components )</span></h2>
        <div class="inline-box align-end">
          <div class="field">
            <label class="input-label" for="">Username</label>
            <input type="text" class="input" placeholder="Enter text here..." />
          </div>
          <div class="field">
            <label class="input-label" for="">Email</label>
            <input type="email" class="input input-secondary" />
          </div>
          <PasswordField
            v-model="state.password"
            id="newUserPassword"
            type="password"
            label="Password"
            @input="onFieldChange"
          />
          <div class="field">
            <input
              type="text"
              class="input input-secondary"
              placeholder="Enter text here..."
            />
          </div>
          <div class="field">
            <input
              type="text"
              class="input input-error"
              placeholder="Error occured..."
            />
          </div>
          <div class="field">
            <input
              type="text"
              class="input input-secondary input-error"
              placeholder="Error occured..."
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>
