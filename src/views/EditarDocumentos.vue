<script setup>

import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useDatabaseStore } from '../stores/dataBase';

const useData=useDatabaseStore();
const route = useRoute();
const url=ref('')
console.log(route.params.id)

const handleSubmit = () => {
    // console.log("editar")
    useData.editarUrl(route.params.id,url.value)
}

onMounted(async()=>{
    url.value=await useData.leerUrl(route.params.id)
})

</script>

<template>
    <div>
        <h1>Edicion</h1>
        <form @submit.prevent="handleSubmit">
            <input type="text" placeholder="Ingresa Url" v-model="url">
            <button class="btn btn-success" type="submit">Editar</button>

        </form>
    </div>
</template>
