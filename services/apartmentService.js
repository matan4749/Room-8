import { db } from "../firebase";
import { collection, setDoc, doc, getDocs } from "firebase/firestore";
export const apartmentService = {
    getApartments
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

