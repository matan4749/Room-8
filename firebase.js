import { getFirestore } from "firebase/firestore";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import "firebase/compat/auth";
import "firebase/compat/firestore";
import { userService } from "./services/userService";

const firebaseConfig = {
  apiKey: "AIzaSyAc76dqEYGhFeAkeeXvcamtSdtL5rDYnjU",
  authDomain: "room8-4a5e6.firebaseapp.com",
  databaseURL: "https://room8-4a5e6-default-rtdb.firebaseio.com",
  projectId: "room8-4a5e6",
  storageBucket: "room8-4a5e6.appspot.com",
  messagingSenderId: "69219582263",
  appId: "1:69219582263:web:8edf9fbed12bfeb5875ab2",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();
export { auth, db };

export function signUp(email, password) {
  return createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
export function SignIn(email, password) {
  return signInWithEmailAndPassword(auth, email.password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ..
    });
}
export function forgotPassword(email) {
  return sendPasswordResetEmail(auth, email);
}
export function signInWithGoogle() {
  signInWithPopup(auth, new GoogleAuthProvider()).then((data) => {
    console.log(data);
    userService.createUser(data.user);
  });
}
