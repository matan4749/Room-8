import { db } from "../firebase";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
export const userService = {
  createUser,
};

function createUser(user) {
  addDoc(collection(db, "users"), {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    name: user.displayName,
  })
    .then(() => {
      console.log("user created");
    })
    .catch((error) => {
      alert(eror.message);
    });
}
