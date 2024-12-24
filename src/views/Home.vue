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



</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ useStore.userData?.email }}</p>
        <p v-if="useDataBase.loadingDoc">Cargando documentos...</p>
        <add-form></add-form>
        <h2>Lista de URL´S</h2>
        <a-space direction="vertical" v-if="!useDataBase.loadingDoc" style="width: 100%">
            <a-card title="URL´S" style="width: 100%" v-for="item of useDataBase.documents" :key="item.id">
                <template #extra>
                    <a-space>
                        <a-popconfirm title="Eliminar esta tarea?" ok-text="Confirmar" cancel-text="Cancelar"
                            @confirm="confirm(item.id)" @cancel="cancel">
                            <a-button danger>Eliminar</a-button>
                        </a-popconfirm>
                        <a-button type="primary" @click="router.push(`/editar/${item.id}`)">Editar</a-button>
                    </a-space>
                </template>
                <p>
                    Id de la URL: {{ item.id }}
                    <br>
                    Short de la URL: {{ item.short }}
                    <br>
                    Nombre de la URL: {{ item.name }}
                    <br>
                </p>
            </a-card>
        </a-space>
    </div>
</template>