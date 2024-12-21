<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/dataBase';
import { storeToRefs } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ref } from 'vue';
import { useRoute,useRouter } from 'vue-router';

//   onAuthStateChanged(auth,(user)=>{
//       console.log(user)
//   }) 

const useStore = useUserStore();
const useDataBase = useDatabaseStore();
const router=useRouter();

const url=ref('');

useDataBase.getUrls();

const handleSubmit=() => { 
    useDataBase.addUrl(url.value);
 }

</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ useStore.userData?.email }}</p>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingresa Url" v-model="url">
            <button class="btn btn-success" type="submit">Agregar</button>

        </form>


        <p v-if="useDataBase.loadingDoc">Cargando documentos...</p>
        <ul v-else >
            <li v-for="item of useDataBase.documents" :key="item.id" class="card mb-2">
                <!-- el of nos sirve para rocorrer arrays, en este caso el useDataBase.documents es un array; el in sirve para recorrer objetos -->
                {{ item.id }}
                <br>
                {{ item.short }}
                <br>
                {{ item.name }}
                <br>
                <button class="btn btn-danger" @click="useDataBase.deleteUrl(item.id)">Eliminar</button>
                <br>
                <button class="btn btn-warning" @click="router.push(`/editar/${item.id}`)">Editar</button>
            </li>
        </ul>
    </div>
</template>