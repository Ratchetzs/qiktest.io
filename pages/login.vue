<script setup>
    import BackToHome from '~/components/buttons/BackToHome.vue';
    import Field from '~/components/Field.vue';

    useSeoMeta({
        title:'Se connecter'
    })

</script>

<template>
    <div class="wrapper flex flex-center">
    <BackToHome />
      <div class="container">
        <h1>Se connecter</h1>
        <form action="">
            <Field 
                id="userEmail"
                type="email"
                label="Email"
            />
            <Field 
                id="userPassword"
                type="password"
                label="Mot de passe"
            />
          <div>
              <button type="submit" class="btn btn-primary btn-full">Se connecter</button>
          </div>
          <div>
              <div class="inline-box flex-between">
                  <NuxtLink to="/inscription">Je n'ai pas de compte</NuxtLink>
                  <div class="text-subtil">|</div>
                  <NuxtLink>Mot de passe oublié</NuxtLink>
              </div>
          </div>
        </form>
      </div>
    </div>
  </template>