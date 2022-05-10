import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, FlatList, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
function UserApartments() {
  const { user } = useAuth();
  const [apartment, setApartment] = useState();
  const navigation = useNavigation();
  console.log({ apartment });

  const removeApartment = async () => {
    await deleteDoc(doc(db, "apartments", apartment.id));
    loadApartment();
  };
  const editApartment = async () => {
    navigation.navigate("addAprment");
  };

  return (
    <View>
      <Text>User Apartments</Text>
      <FlatList
        data={user.favs || []}
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
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

export default UserApartments;
