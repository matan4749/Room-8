import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { db } from "../firebase";
import tw from "tailwind-rn";
function Users() {
  const [users, setUsers] = useState();
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let docs = await getDocs(collection(db, "users"));
    let users = []
    docs.forEach((doc) => {
      users.push({ ...doc.data(), id: doc.id })
    });
    setUsers(users)
  };


  // function getUser(uid) {
  //   getAuth()
  //     .getUser(uid)
  //     .then((userRecord) => {
  //       // See the UserRecord reference doc for the contents of userRecord.
  //       console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
  //     })
  //     .catch((error) => {
  //       console.log('Error fetching user data:', error);
  //     });
  // }
  const removeUsers = async (user) => {
    console.log({ user });
    // getUser(user.uid)
    await deleteDoc(doc(db, "users", user.email));
    // deleteUser(user).then(() => {
    //   console.log('deleteddd');
    // }).catch((err => {
    //   console.log({ err });
    // }))
    loadUsers();
  };

  return (
    <View>
      <Text>Users</Text>
      {users && (
        users.map(u => {
          return <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Image
              source={{ uri: u.photoURL }}
              style={{ height: 100, width: 100 }}
            />
            <View>
              <Text> name: {u.name}</Text>
              <Text> email: {u.email}</Text>
            </View>
            <TouchableOpacity onPress={() => removeUsers(u)}>
              <Image style={tw("h-7 w-7")} source={require("../delete.png")} />
            </TouchableOpacity>
          </View>
        })
      )}
    </View>
  );
}

export default Users;
