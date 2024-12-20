<script setup>
import { useUserStore } from '../stores/user';
import { storeToRefs } from 'pinia';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';

  onAuthStateChanged(auth,(user)=>{
      console.log(user)
  }) 

const useStore = useUserStore();

</script>

<template>
    <div>
        <h1>Home</h1>
        <p>{{ useStore.userData?.email }}</p>
    </div>
</template>