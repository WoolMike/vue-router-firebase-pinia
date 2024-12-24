import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { defineStore } from 'pinia'
import { ref } from 'vue';
import { auth } from '../firebaseConfig';
import router from '../router.js';
import { useDatabaseStore } from './dataBase.js'
import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
import { db } from "../firebaseConfig";


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
                console.log(error.code)
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async setUser(user)
        {
            try {
                const docRef=doc(db,"users",user.uid)
                const docSpan=await getDoc(docRef);
                if(docSpan.exists()){
                    this.userData = { ...docSpan.data()};
                }else{
                    await setDoc(docRef,{
                        email:user.email,
                        uid:user.uid,
                        displayname: user.displayName,
                        photoUrl:user.photoURL,
                    })
                }
                this.userData={
                    email:user.email,
                    uid:user.uid,displayName:user.displayName,photoURL:user.photoURL
                }

            } catch (error) {
                console.log(error.code)
            }
        },
        async loginUser(email, password) {
            this.loadingUser = true;
            try {
                const { user } = await signInWithEmailAndPassword(auth, email, password);
                 await this.setUser(user);
                router.push('/');
            } catch (error) {
                console.log(error.code)
                return error.code;
            } finally {
                this.loadingUser = false;
            }
        },
        async logoutUser() {
            const dataBaseStore = useDatabaseStore();
            dataBaseStore.$reset();
            try {
                router.push('/login');
                await signOut(auth);
                
            } catch (error) {
                console.log(error)
            }
        },
        currentUser() {
            return new Promise((resolve, reject) => {
                onAuthStateChanged(auth, async (user) => {
                    if (user) {
                        console.log(user)
                        //await this.setUser(user);
                        this.userData = {
                            email:user.email,
                            uid:user.uid,
                            displayName:user.displayName,
                            photoURL:user.photoURL,
                        };
                    } else {
                        this.userData=null;
                        const dataBaseStore = useDatabaseStore();
                        dataBaseStore.$reset();
                    }
                    resolve(user);
                },
                    (e) => reject(e)
                );


            });
        },
        async updateImgUrl(imagen){
            try {
                console.log("dentro del update imgurl")
                console.log(imagen)
            } catch (error) {
                console.log(error.code)
                return error.code
            }
        },
        async updateUser(displayName){
            try {
                await updateProfile(auth.currentUser,{
                displayName
            })
            this.setUser(auth.currentUser);
            } catch (error) {
                console.log(error.code)
                return error.code
            }
            
        },
    },

});