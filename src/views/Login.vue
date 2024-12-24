<script setup>
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';


const useStore = useUserStore();
import { message } from 'ant-design-vue';



const router = useRouter();
const formState = reactive({
    email: 'hola@gmail.com',
    password: 'hola123'
})

const onFinish = async (values) => {
    console.log('Success:', values);
    const res = await useStore.loginUser(formState.email, formState.password);
    if (!res) {
        message.success('Bienvenido');
    }else{
        console.log(res)
        message.error('Email o contraseña invalidos');
        formState.email=""
        formState.password=""
    }
};
const onFinishFailed = errorInfo => {
    console.log('Failed:', errorInfo);
};




</script>

<template>
    <a-row>
        <a-col :span="12" :offset="6">
            <a-form name="basic" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish"
                @finishFailed="onFinishFailed">
                <a-form-item name="email" label="Ingresa el Email"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa tu email valido' }]">
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item name="password" label="Ingresa tu contraseña"
                    :rules="[{ required: true, whitespace: true, message: 'Ingresa una contraseña de 6' }]">
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="useStore.loadingUser">Iniciar
                        sesion</a-button>
                </a-form-item>


            </a-form>
        </a-col>

    </a-row>
</template>