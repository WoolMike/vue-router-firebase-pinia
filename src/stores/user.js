import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { auth } from '../firebaseConfig';
import router from '../router.js';
import { useDatabaseStore } from './dataBase.js'


export const useUserStore = defineStore('userStore', {
    state: () => ({
        userData: null,
        loadingUser: false,
        loadingSession: false,
    }),
    actions: {
        async registerUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await createUserWithEmailAndPassword(auth, email, password);
                this.userData = { email: user.email, uid: user.uid };
                router.push('/');
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingUser = false;
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password);
                this.userData = { email: user.email, uid: user.uid };
                console.log("usuario registrado");
                console.log(this.userData);
                router.push('/');
            } catch (error) {
                console.log(error)
            } finally {
                this.loadingUser = false;
            }
        },
        async logoutUser() {
            const dataBaseStore = useDatabaseStore();
            dataBaseStore.$reset();
            try {
                await signOut(auth);
                this.userData = null;
                router.push('/login');
            } catch (error) {
                console.log(error)
            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                onAuthStateChanged(auth, (user) => {
                    if (user) {
                        this.userData = { email: user.email, uid: user.uid }
                    } else {
                        this.userData = null;
                        const dataBaseStore = useDatabaseStore();
                        dataBaseStore.$reset();
                    }
                    resolve(user);
                },
                    (e) => reject(e)
                );


            });
        },
    },

});