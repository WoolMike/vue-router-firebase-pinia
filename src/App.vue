<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useUserStore } from './stores/user';
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route=useRoute();
const useStore = useUserStore();
watch(()=>route.name,()=>selectedKeys.value=[route.name])
const selectedKeys = ref([]);
</script>

<template>
  <a-layout>
    <a-layout-header v-if="!useStore.loadingSession">
      <a-menu  theme="dark" mode="horizontal" v-model:selectedKeys="selectedKeys">
        <a-menu-item v-if="useStore.userData" key="home">
          <router-link to="/">Home</router-link>
        </a-menu-item>
        <a-menu-item v-if="useStore.userData" key="perfil">
          <router-link to="/perfil">Perfil</router-link>
        </a-menu-item>
        <a-menu-item v-if="!useStore.userData" key="login">
          <router-link to="/login">Login</router-link>
        </a-menu-item>
        <a-menu-item v-if="!useStore.userData" key="register">
          <router-link to="/register">Register</router-link>
        </a-menu-item>
        <a-menu-item @click="useStore.logoutUser" v-if="useStore.userData" key="logout">
          <button class="btn btn-danger" >Logout</button>
        </a-menu-item>

      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px">
      <div :style="{ background: '#fff', padding: '24px', minHeight: '280px' }">
        <div v-if="useStore.loadingSession">
          <h1>Cargando sesion...</h1>
        </div>
        <div v-else>
          <RouterView />
        </div>
      </div>

    </a-layout-content>

  </a-layout>



</template>