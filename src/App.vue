<template>
  <div class="header">
    <div class="navigation">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <span>&nbsp;|&nbsp;</span>
        <RouterLink to="/tasks">Tasks</RouterLink>
        <span>&nbsp;|&nbsp;</span>
        <RouterLink class="btn" to="/profile">Profile</RouterLink>
      </nav>
    </div>
    <div class="auth">
      <button v-if="isAuthenticated" class="icon-btn !outline-none" @click="handleSignOut">
        <div i-carbon-logout />
      </button>
      <div v-else>
        <RouterLink class="btn" to="/signup">Sign Up</RouterLink>
        <span>&nbsp;|&nbsp;</span>
        <RouterLink class="btn" to="/signin">Login</RouterLink>
      </div>
    </div>
  </div>

  <div class="container">
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthenticated, useSignOut } from '@nhost/vue'
import 'primevue/resources/themes/lara-light-indigo/theme.css'

const isAuthenticated = useAuthenticated()
const { signOut } = useSignOut()
const router = useRouter()
const handleSignOut = () => {
  signOut()
  router.push('/')
}
</script>

<style scoped>
.container {
  margin-top: 2em;
}
.navigation {
  float: left;
}
.auth {
  float: right;
}
</style>
