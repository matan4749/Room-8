import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
function Users() {
  const { user } = useAuth();
  const [apartment, setApartment] = useState();
  const navigation = useNavigation();
  console.log({ apartment });
  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    let docs = await getDocs(collection(db, "users"));
    docs.forEach((doc) => {
      setApartment({ ...doc.data(), id: doc.id });
    });
  };

  const removeUsers = async () => {
    await deleteDoc(doc(db, "users", email.id));
    loadUsers();
  };

  return (
    <View>
      <Text>Users</Text>
      {apartment && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: user.photoURL }}
            style={{ height: 100, width: 100 }}
          />
          <View>
            <Text> name: {user.name}</Text>
            <Text> email: {user.email}</Text>
          </View>
          <TouchableOpacity onPress={removeUsers}>
            <Image style={tw("h-7 w-7")} source={require("../delete.png")} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default Users;
