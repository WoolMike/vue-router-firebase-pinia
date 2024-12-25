<script setup>
import { useUserStore } from '../stores/user';
import { useDatabaseStore } from '../stores/dataBase';
import { storeToRefs } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const useStore = useUserStore();
const useDataBase = useDatabaseStore();
const router = useRouter();
useDataBase.getUrls();

const confirm = async (id) => {
  console.log(id) 
 const res= await useDataBase.deleteUrl(id)
   if(!res)
   {
       message.success('URL borrado exitosamente');
   }else{
     message.error('No se ha podido borrar el url')
   }
 };


const cancel = e => {
  console.log(e);
  message.error('Cancelado');
};

const copiarPortapapeles=(id) => { 
    const path=window.location.href
    console.log(path)
    try {
    navigator.clipboard.writeText(path+id);
    return message.success('Copiado correctamente');
    } catch (err) {
     return message.error('No se pudo copiar');
    }
 };



</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ useStore.userData?.email }}</p>
        <p v-if="useDataBase.loadingDoc">Cargando documentos...</p>
        <add-form></add-form>
        <h2>Lista de URL´S</h2>
        <a-space direction="vertical" v-if="!useDataBase.loadingDoc" style="width: 100%">
            <a-card :title="item.id" style="width: 100%" v-for="item of useDataBase.documents" :key="item.id">
                <template #extra>
                    <a-space>
                        <a-popconfirm title="Eliminar esta tarea?" ok-text="Confirmar" cancel-text="Cancelar"
                            @confirm="confirm(item.id)" @cancel="cancel">
                            <a-button danger>Eliminar</a-button>
                        </a-popconfirm>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                        <a-button @click="copiarPortapapeles(item.id)">Copiar</a-button>
                    </a-space>
                </template>
                <p>
                    Nombre de la URL: {{ item.name }}
                    <br>
                </p>
            </a-card>
        </a-space>
    </div>
</template>