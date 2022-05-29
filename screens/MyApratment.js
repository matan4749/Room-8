import { collection, deleteDoc, doc, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import { TouchableOpacity } from "react-native";
import { db } from "../firebase";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { useNavigation } from "@react-navigation/native";
import { apartmentService } from "../services/apartmentService";
import { Feather, AntDesign } from "@expo/vector-icons";
function MyApratment() {
  const { user } = useAuth();
  const [apartment, setApartment] = useState();
  const navigation = useNavigation();
  console.log({ apartment });
  useEffect(() => {
    loadApartment();
  }, []);

  const loadApartment = async () => {
    const myApratment = await apartmentService.getMyApartment(user);
    setApartment(myApratment);
  };

  const removeApartment = async () => {
    await deleteDoc(doc(db, "apartments", apartment.id));
    loadApartment();
  };
  const editApartment = async () => {
    console.log(apartment);
    navigation.navigate("addAprment", {
      apartment,
    });
  };
  return (
    <View>
      <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
        הדירה של {user.name}❤️
      </Text>

      {apartment && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: apartment.photoURL }}
            style={{ height: 200, width: 200 }}
          />

          <View>
            <Text style={tw("text-center text-black text-xl")}>
              כתובת:{apartment.Address}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              מספר חדרים:{apartment.Rooms}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              שכירות:{apartment.Rent}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              מספר שותפים:{apartment.NumberOfPartners}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              שומרים שבת:{apartment.Sabbath ? "✅" : "❎"}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              סטודנטים:{apartment.isstudent ? "✅" : "❎"}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              בעלי חיים:{apartment.isAnimals ? "✅" : "❎"}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              כשר:{apartment.iskosher ? "✅" : "❎"}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              מעשנים:{apartment.isSmokers ? "✅" : "❎"}
            </Text>
          </View>
          <TouchableOpacity onPress={editApartment}>
            <Feather name="edit" size={40} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={removeApartment}>
            <AntDesign name="delete" size={40} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

export default MyApratment;
