<script setup>
import { computed, reactive, ref } from 'vue';
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { message } from 'ant-design-vue';

const useStore = useUserStore();
console.log(useStore.userData.displayName);
const fileList = ref([]);

const handleRemove = file => {
    const index = fileList.value.indexOf(file);
    const newFileList = fileList.value.slice();
    newFileList.splice(index, 1);
    fileList.value = newFileList;
};

const handleChange = info => {
    const isJpgOrPnf = info.file.type === "image/jpeg" || info.file.type === "image/png";
    const isLt2M = info.file.size / 1024 / 1024 < 2;
    if (!isJpgOrPnf) {
        handleRemove(info.file)
        console.log("hola desde el change")
        message.error("Solo se permite PNG")
        return
    } if (!isLt2M) {
        handleRemove(info.file)
        message.error("La imagen debe de pesar menos de 2MB")
        return
    }
};

const beforeUpload = (file) => {
    fileList.value = [...fileList.value, file];
    return false
}



const onFinish = async (values) => {
    const error = await useStore.updateUser(useStore.userData.displayName)

    if (fileList.value[0]) {
        await useStore.updateImgUrl(fileList.value[0])
    }
    if (!error) {
        message.success('Se ha actualizado el perfil')
    } else {
        message.error('Ocurrio un problema al momento de actualizar al informacion')
    }
};

</script>

<template>
    <h1>Perfil del Usuario</h1>
    <a-row>
        <a-col :span="12" :offset="6">
            <a-form name="basicPerfil" autocomplete="off" layout="vertical" :model="useStore.userData"
                @finish="onFinish">
                <a-form-item name="email" label="Tú email (No modificable)"
                    :rules="[{ required: true, whitespace: true, type: 'email', message: 'Ingresa tu email valido' }]">
                    <a-input disabled v-model:value="useStore.userData.email"></a-input>
                </a-form-item>
                <a-form-item name="displayName" label="Ingresa tu nickName"
                    :rules="[{ required: true, whitespace: true, message: 'Ingresa tu nickName valido' }]">
                    <a-input v-model:value="useStore.userData.displayName"></a-input>
                </a-form-item>

                <a-upload v-model:file-list="fileList" :before-upload="beforeUpload" list-type="picture" :max-count="1"
                    @change="handleChange">
                    <a-button>
                        Selecciona foto de perfil (Max: 1)
                    </a-button>
                </a-upload>

                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="useStore.loadingUser">Actualizar
                        Informacion</a-button>
                </a-form-item>
            </a-form>
        </a-col>

    </a-row>
</template>
