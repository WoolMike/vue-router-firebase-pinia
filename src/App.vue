<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user';

const useStore = useUserStore();

</script>

<template>
  <nav v-if="!useStore.loadingSession">
    <div>
      <router-link to="/" class="btn btn-danger" v-if="useStore.userData">Home</router-link>
      <router-link to="/login" class="btn btn-success" v-if="!useStore.userData">Login</router-link>
      <router-link to="/register" class="btn btn-warning" v-if="!useStore.userData">Register</router-link>
      <button class="btn btn-primary justify-content-md-end" @click="useStore.logoutUser"
        v-if="useStore.userData">Logout</button>
    </div>
  </nav>
  <div v-else>
    <h1>Cargando sesion...</h1>
  </div>
  <div class="container text-center">
    <RouterView />

  </div>

</template>