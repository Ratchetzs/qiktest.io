<script setup>
    import BackToHome from '~/components/buttons/BackToHome.vue';
</script>

<template>
    <div class="wrapper flex flex-center">
    <BackToHome />
      <div class="container">
        <h1><span>🚀</span> Sign in</h1>
        <form action="">
            <Field 
                id="userEmail"
                type="email"
                label="Email"
            />
            <Field 
                id="userPassword"
                type="password"
                label="Password"
            />
          <div>
              <button type="submit" class="btn btn-primary btn-full">Sign in</button>
          </div>
          <div>
              <div class="inline-box flex-between">
                  <NuxtLink to="/register">I don't have an account</NuxtLink>
                  <NuxtLink>Forgot password</NuxtLink>
              </div>
          </div>
        </form>
      </div>
    </div>
</template>
