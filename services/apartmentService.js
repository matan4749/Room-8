import { db } from "../firebase";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
export const apartmentService = {
    getApartments, getMyApartment
};


async function getApartments() {
    let docs = await getDocs(collection(db, "apartments"));
    const apartments = []
    docs.forEach(doc => {
        apartments.push({ ...doc.data(), id: doc.id })
    })
    console.log({ apartments });
    return apartments
}

async function getMyApartment(user) {
    let docs = await getDocs(collection(db, "apartments"));
    let myApratment = null
    docs.forEach((doc) => {
        console.log('doc');
        if (user.email === doc.id) {
            myApratment = { ...doc.data(), id: doc.id }
        }
    });
    console.log({myApratment});
    return myApratment || null
}

