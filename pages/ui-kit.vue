<script setup>

  const active = ref(false)
  const onFolderItemClick = () => active.value = !active.value;
  const handleFolderIcon  = () => !active.value ? 'ep:folder' : 'ep:folder-opened';

  useSeoMeta({
    title:"Testsflow's UI KIT"
  })

</script>

<template>
  <div class="container">
    <section>
      <div class="inline-box">
        <div>
          <h1>Testsflow's UI Kit</h1>
          <p>Enjoy whit <em><NuxtLink to="/">Testsflow's</NuxtLink></em> UI Kit</p>
          <p>Icons found on: <a href="https://icones.js.org/">icones.js.org</a></p>
          <p>Making by <NuxtLink to="https://github.com/Ratchetzs" target="_blank" rel="noopener noreferrer">@Ratchetzs</NuxtLink></p>
        </div>
      </div>
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
          <Icon class="icon icon-left" name="entypo-social:github"/>
          github
        </button>
        <button class="btn btn-white btn-icon">
          <Icon class="icon icon-left" name="ri:home-3-line"/>
          home
        </button>
        <li class="item item-icon" @click="onFolderItemClick">
          <Icon :class="{arrow:true, icon:true, active: active}" name="ep:arrow-right"/>
          <Icon class="icon icon-left" :name="handleFolderIcon()"/>
          untitled folder
        </li>
        <div class="pins pins-info">
          <Icon class="icon icon-left" name="svg-spinners:blocks-shuffle-2"/>
          Chargement ...
        </div>
        <div class="pins pins-info">
          <Icon class="icon icon-left" name="svg-spinners:180-ring-with-bg"/>
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
        <div class="avatar">
          <img class="avatar-image" src="/images/avatars/me.png" alt="Nom de l'utilisateur">
          <span class="avatar-name">Jonh Do</span>
        </div>
        <div class="avatar">
          <img class="avatar-image" src="/images/avatars/random.jpg" alt="Nom de l'utilisateur">
          <span class="avatar-name">Marie Smith</span>
        </div>
        <div class="avatar">
          <img class="avatar-image" src="/images/avatars/random2.jpg" alt="Nom de l'utilisateur">
          <span class="avatar-name">Eliot Smith</span>
        </div>
        <div class="avatar avatar-small">
          <img class="avatar-image" src="/images/avatars/me.png" alt="Nom de l'utilisateur">
          <span class="avatar-name">Jonh Do</span>
        </div>
      </div>
    </section>

    <section>
      <h2>Input Fields</h2>
      <div class="inline-box align-end">
        <div class="field">
          <label class="input-label" for="">Email</label>
          <input 
            type="email"
            class="input input-secondary"
          />
        </div>
        <div class="field">
          <label class="input-label" for="">Password</label>
          <input
            type="password"
            class="input input-secondary"
          />
        </div>
        <div class="field">
          <label class="input-label" for="">Username</label>
          <input 
            type="text" 
            class="input" 
            placeholder="Enter text here..." 
          />
        </div>
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
</template>
