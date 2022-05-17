import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";


export const notificationService = {
    create,
    getAllById
}

function create(loggedUserEmail, apatment) {
    console.log({ loggedUserEmail, apatment });
    setDoc(doc(db, "notifications", `${Math.random()}`), {
        title: 'like',
        desc: ` user email: ${loggedUserEmail} like your apratment`,
        userFavEmail: loggedUserEmail,
        ownerId: apatment.id,
        isRead: false
    })
        .then(() => {
            console.log("not created");
        })
        .catch((error) => {
            alert(error.message);
        });
}


async function getAllById(userId) {
    let docs = await getDocs(collection(db, "notifications"));
    const notifications = []
    docs.forEach(doc => {
        const not = doc.data()
        if (not.ownerId === userId) {
            notifications.push({ ...not, id: doc.id })
        }
    })
    console.log({ notifications });
    return notifications
}
