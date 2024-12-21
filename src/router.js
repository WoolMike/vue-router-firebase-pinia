

import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from './stores/user.js';


const requiereOut = async (to, from, next) => {
    // recuerda que llevan un orden el to, from, next
    const useStore = useUserStore();
    useStore.loadingSession = true;
    const user = await useStore.currentUser();
    if (user) {
        next();
    } else {
        next('/login');
    }
    useStore.loadingSession = false;
};

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    linkActiveClass: "active",

    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../src/views/Home.vue'),
            beforeEnter: requiereOut,
        },
        {
            path: '/editar/:id',
            name: 'editar',
            component: () => import('../src/views/EditarDocumentos.vue'),
            beforeEnter: requiereOut,
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../src/views/Login.vue'),
        },
        {
            path: '/register',
            name: 'register',
            component: () => import('../src/views/Register.vue'),
        },
    ],
});

export default router;

