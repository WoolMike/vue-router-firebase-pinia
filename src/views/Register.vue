<script setup>
import { computed, ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router=useRouter();

const email = ref('');
const password = ref('');

const useStore = useUserStore();
const handleSumbit =async () => {
    if (!email.value || !password.value) {
        return alert("Ingresa los datos completos")
    }
    console.log("Procesando Formulario");
    await useStore.registerUser(email.value, password.value);
    // router.push('/')
}



</script>

<template>
    <div>
        <h1>
            Register
        </h1>
        <form @submit.prevent="handleSumbit">
            <input type="email" placeholder="Ingrese email" v-model.trim="email"></input>
            <input type="password" placeholder="Ingrese contraseña" v-model.trim="password"></input>
            <button type="submit" class="btn btn-info" :disabled="useStore.loadingUser">Crear Usuario</button>
        </form>

        <!-- <h2>{{ useStore.userData }}</h2>

<button @click="useStore.registerUser('Emiliano')">Ingresar</button> -->
    </div>
</template>
