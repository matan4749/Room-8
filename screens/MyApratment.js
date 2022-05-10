import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-web";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { apartmentService } from "../services/apartmentService";
function MyApratment() {
  const { user } = useAuth();
  const [apartment, setApartment] = useState();
  const navigation = useNavigation();
  console.log({ apartment });
  useEffect(() => {
    loadApartment();
  }, []);

  const loadApartment = async () => {
    const myApratment = await apartmentService.getMyApartment(user)
    setApartment(myApratment)
  };

  const removeApartment = async () => {
    await deleteDoc(doc(db, "apartments", apartment.id));
    loadApartment();
  };
  const editApartment = async () => {
    navigation.navigate("addAprment", {
      apartment
    });
  };
  return (
    <View>
      <Text>MyApratments</Text>
      {apartment && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: apartment.photoURL }}
            style={{ height: 100, width: 100 }}
          />
          <View>
            <Text> address:{apartment.Address}</Text>
            <Text> rooms:{apartment.Rooms}</Text>
            <Text> rent:{apartment.Rent}</Text>
            <Text> animals:{apartment.isAnimals ? "yes" : "no"}</Text>
          </View>
          <TouchableOpacity onPress={editApartment}>
            <Image style={tw("h-7 w-7")} source={require("../edit.png")} />
          </TouchableOpacity>
          <TouchableOpacity onPress={removeApartment}>
            <Image style={tw("h-7 w-7")} source={require("../delete.png")} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default MyApratment;
