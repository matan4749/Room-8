import { db } from "../firebase";
import { collection, addDoc, setDoc, doc, updateDoc } from "firebase/firestore";
export const userService = {
  createUser, addFav
};

function createUser(user) {
  setDoc(collection(db, "users"), {
    uid: user.uid,
    email: user.email,
    photoURL: user.photoURL,
    name: user.displayName,
    favs: []
  })
    .then(() => {
      console.log("user created");
    })
    .catch((error) => {
      alert(eror.message);
    });
}


function addFav(user, fav) {
  console.log({ user, fav });
  if (user.favs) {
    user.favs.push(fav)
  } else {
    user.favs = [fav]
  }
  console.log({ user });
  setDoc(doc(db, "users", user.id), { favs: user.favs })
}


