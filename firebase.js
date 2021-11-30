
import { initializeApp } from "firebase/app";
import { getAuth,createUserWithEmailAndPassword,onAuthStateChanged,signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
  apiKey: "AIzaSyAc76dqEYGhFeAkeeXvcamtSdtL5rDYnjU",
  authDomain: "room8-4a5e6.firebaseapp.com",
  databaseURL: "https://room8-4a5e6-default-rtdb.firebaseio.com",
  projectId: "room8-4a5e6",
  storageBucket: "room8-4a5e6.appspot.com",
  messagingSenderId: "69219582263",
  appId: "1:69219582263:web:8edf9fbed12bfeb5875ab2"
};


const app = initializeApp(firebaseConfig);
 export const auth = getAuth();
 

 export function signUp(email,password){
    return createUserWithEmailAndPassword(auth,email,password);
}
export function Login(email,password){
    return signInWithEmailAndPassword(auth,email.password);
}
