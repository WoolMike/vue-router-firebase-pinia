<script setup>
import { message } from 'ant-design-vue';
import { reactive } from 'vue';
import { useDatabaseStore } from '../stores/dataBase';

const useDataBase = useDatabaseStore();

const formState = reactive({
    url: '',
})

const onFinish = async (value) => {
    console.log('Todo correcto' + value);
    const error = await useDataBase.addUrl(formState.url);
    console.log(error)
    if (!error) {
        formState.url = ''
        message.success('Se ha guardado la url');
    } else {
        switch (error) {
            default: message.error('Problema en el servidor, intente mas tarde')
                break;
        }
    }
};
</script>


<template>

    <a-row>
        <a-col :span="12" :offset="6">
            <a-form name="addForm" autocomplete="off" layout="vertical" :model="formState" @finish="onFinish">
                <a-form-item name="url" label="Ingresa el Url" :rules="[{
                    required: true,
                    whitespace: true,
                    pattern: /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
                    message: 'Ingresa una Url valida',
                }]">
                    <a-input v-model:value="formState.url"></a-input>
                </a-form-item>
                <a-form-item>
                    <a-button type="primary" html-type="submit" :loading="useDataBase.loadingUrl">Agregar
                        Url</a-button>
                </a-form-item>
            </a-form>
        </a-col>
    </a-row>
</template>
