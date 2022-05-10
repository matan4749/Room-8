import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, FlatList, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import tw from "tailwind-rn";
function UserApartments() {
  const { user } = useAuth();
  const [apartments, setApartments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    loadApratments()
  }, [])


  const loadApratments = async () => {
    let docSnap = await getDocs(collection(db, "apartments"));
    let newArr = [];
    console.log({ docSnap });
    docSnap.forEach((doc) => {
      newArr.push({ ...doc.data(), id: doc.id });
    });
    setApartments(newArr);
  }

  const removeApartment = async (apartment) => {
    await deleteDoc(doc(db, "apartments", apartment.id));
    loadApratments();
  };
  const editApartment = async (apartment) => {
    navigation.navigate("addAprment",{apartment});
  };



  return (
    <View>
      <Text>User Apartments</Text>
      <FlatList
        data={apartments}
        renderItem={({ item }) => {
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={item.photoURL}
                style={{ height: 100, width: 100 }}
              />
              <View>
                <Text> address:{item.Address}</Text>
                <Text> rooms:{item.Rooms}</Text>
                <Text> rent:{item.Rent}</Text>
                <Text> animals:{item.isAnimals ? "yes" : "no"}</Text>
              </View>
              <TouchableOpacity onPress={() => removeApartment(item)}>
                <Image style={tw("h-7 w-7")} source={require("../delete.png")} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => editApartment(item)}>
                <Image style={tw("h-7 w-7")} source={require("../edit.png")} />
              </TouchableOpacity>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

export default UserApartments;
