<script setup>
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatStrategyValues } from 'ant-design-vue/es/vc-tree-select/utils/strategyUtil';
import { message } from 'ant-design-vue';

const router = useRouter();
const useStore = useUserStore();
// const email = ref('');
// const password = ref('');

const formState = reactive({
    email: "",
    password: "",
    confirmpassword: ""
})

const onFinish = async (values) => {
    console.log("Succes:", values);
    const res =await useStore.registerUser(formState.email, formState.password,formState.confirmpassword);
    if(!res){
        message.success('Registro exitoso');
    }else{
         switch(res){
        case 'auth/email-already-in-use':
        message.error('Este correo ya esta registrado');
        break;
        default:
        message.error('Ocurrio un problema en el servidor');
    }
    }
   
}

const validatePass = async (_rule, value) => {
    if (value === '') {
        return Promise.reject("Repita contraseña")
    }
    if (value !== formState.password) {
        return Promise.reject("No coinciden las contraseñas")
    }
    return Promise.resolve()
}



</script>

<template>
    <a-row>
        <a-col :span="12" :offset="6">
            <a-form name="basic" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
                <a-form-item name="email" label="Ingresa el Email"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa tu email valido' }]">
                    <a-input v-model:value="formState.email"></a-input>
                </a-form-item>
                <a-form-item name="password" label="Ingrese contraseña"
                    :rules="[{ required: true, whitespace: true, message: 'Ingresa una contraseña de 6', min: 6 }]">
                    <a-input-password v-model:value="formState.password"></a-input-password>
                </a-form-item>
                <a-form-item name="confirmpassword" label="Confirme la contraseña" :rules="[{
                    validator: validatePass
                    }]">
                    <a-input-password v-model:value="formState.confirmpassword"></a-input-password>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="useStore.loadingUser">Registrar</a-button>
                </a-form-item>

            </a-form>
        </a-col>

    </a-row>
</template>
