import { db } from "../firebase";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
import { apartmentService } from "./apartmentService";
import { notificationService } from "./notificationService";
export const userService = {
  createUser, addFav, getByEmail,
};

async function createUser(user) {
  const users = await getUsers()
  const userExist = users.find(u => u.email === user.email)

  // const allApartmments = await apartmentService.getApartments()
  if (userExist) {
    // userExist.favs.forEach(fav => {
    // const apartment=  allApartmments.find(ap=>ap.id===fav.id)
    // if(!apartment)
    // })
    return userExist
  }
  setDoc(doc(db, "users", user.email), {
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

async function getByEmail(email) {
  const users = await getUsers()
  return users.find(u => u.email === email)
}


async function getUsers() {
  let docs = await getDocs(collection(db, "users"));
  const users = []
  docs.forEach(doc => {
    users.push(doc.data())
  })
  console.log({ users });
  return users
}


function addFav(user, fav) {
  console.log({ user, fav });
  if (user.favs) {
    user.favs.push(fav)
  } else {
    user.favs = [fav]
  }
  console.log({ user })
  setDoc(doc(db, "users", user.email), JSON.parse(JSON.stringify(user)))
  notificationService.create(user.email, fav)
}


