import React, { useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Platform,
  Button,
  ScrollView,
  Image,
} from "react-native";
import { Fontisto } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { setDoc, doc } from "firebase/firestore";
import useAuth from "../hooks/useAuth";
import { db } from "../firebase";
import * as ImagePicker from "expo-image-picker";
import tw from "tailwind-rn";

const AddApartment = ({ route }) => {
  const [Address, setAddress] = useState(null);
  const [Rooms, setRooms] = useState(null);
  const [Rent, setRent] = useState(null);
  const [PhoneNumber, setPhoneNumber] = useState(null);
  const [NumberOfPartners, setNumberOfPartners] = useState(null);
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const incompleteForm = !Address || !Rooms || !Rent || !image;
  const [isAnimals, setIsAnimals] = useState(false);
  const [isstudent, setIsStudent] = useState(false);
  const [isSmokers, setIsSmokers] = useState(false);
  const [Sabbath, setSabbath] = useState(false);
  const [iskosher, setiskosher] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    const newAprtment = route?.params?.apartment;
    console.log({ newAprtment });
    if (newAprtment) {
      setRent(newAprtment.Rent);
      setRooms(newAprtment.Rooms);
      setNumberOfPartners(newAprtment.NumberOfPartners);
      setAddress(newAprtment.Address);
      setImage(newAprtment.photoURL);
    }
  }, []);

  const BuildAprtment = () => {
    setDoc(doc(db, "apartments", route.params?.apartment?.id || user.email), {
      Address: Address,
      Rooms: Rooms,
      Rent: Rent,
      PhoneNumber: PhoneNumber,
      NumberOfPartners: NumberOfPartners,
      photoURL: image,
      Sabbath: Sabbath,
      isSmokers: isSmokers,
      isstudent: isstudent,
      isAnimals: isAnimals,
      iskosher: iskosher,
    })
      .then(() => {
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log({ error });
        alert(eror.message);
      });
  };
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } =
          await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== "granted") {
          alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const { logout } = useAuth();
  return (
    <ScrollView behavior="padding">
      <View style={styles.inputContainer}>
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          שלום {user.name}❤️
        </Text>
        <Text style={tw("text-center p-4 font-bold text-red-400")}></Text>
        <TextInput
          value={Address}
          onChangeText={setAddress}
          style={tw("text-center text-xl pb-2")}
          placeholder="הכנס בבקשה את כתובת הדירה "
        />
        <Text style={tw("text-center p-4 font-bold text-red-400")}></Text>
        <TextInput
          value={Rooms}
          onChangeText={setRooms}
          style={tw("text-center text-xl pb-2")}
          placeholder="הכנס בבקשה את מספר החדרים "
        />
        <Text style={tw("text-center p-4 font-bold text-red-400")}></Text>
        <TextInput
          value={NumberOfPartners}
          onChangeText={setNumberOfPartners}
          style={tw("text-center text-xl pb-2")}
          placeholder="הכנס בבקשה את מספר השותפים "
        />
        <Text style={tw("text-center p-4 font-bold text-red-400")}></Text>
        <TextInput
          value={Rent}
          onChangeText={setRent}
          style={tw("text-center text-xl pb-2")}
          placeholder="הכנס בבקשה את עלות השכירות "
        />
        <Text style={tw("text-center p-4 font-bold text-red-400")}></Text>
        <TextInput
          value={PhoneNumber}
          onChangeText={setPhoneNumber}
          style={tw("text-center text-xl pb-2")}
          placeholder="הכנס בבקשה את מספר הפלאפון "
        />
      </View>

      <View style={styles.container}>
        <View>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={{ width: 20, height: 20 }}
              onPress={() => {
                console.log("TouchableOpacityTouchableOpacity");
                setIsAnimals(!isAnimals);
              }}
            >
              {isAnimals ? (
                <Fontisto name="checkbox-active" size={24} color="black" />
              ) : (
                <Fontisto name="checkbox-passive" size={24} color="black" />
              )}
            </TouchableOpacity>

            <Text style={tw("text-center p-4 font-bold text-red-400")}>
              בעלי חיים בדירה
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={{ width: 20, height: 20 }}
              onPress={() => {
                console.log("TouchableOpacityTouchableOpacity");
                setIsSmokers(!isSmokers);
              }}
            >
              {isSmokers ? (
                <Fontisto name="checkbox-active" size={24} color="black" />
              ) : (
                <Fontisto name="checkbox-passive" size={24} color="black" />
              )}
            </TouchableOpacity>
            <Text style={tw("text-center p-4 font-bold text-red-400")}>
              מעשנים בדירה
            </Text>
          </View>
        </View>
      </View>
      <View>
        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={{ width: 20, height: 20 }}
              onPress={() => {
                console.log("TouchableOpacityTouchableOpacity");
                setIsStudent(!isstudent);
              }}
            >
              {isstudent ? (
                <Fontisto name="checkbox-active" size={24} color="black" />
              ) : (
                <Fontisto name="checkbox-passive" size={24} color="black" />
              )}
            </TouchableOpacity>
            <Text style={tw("text-center p-4 font-bold text-red-400")}>
              סטודנטים
            </Text>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.checkboxContainer}>
            <TouchableOpacity
              style={{ width: 20, height: 20 }}
              onPress={() => {
                console.log("TouchableOpacityTouchableOpacity");
                setSabbath(!Sabbath);
              }}
            >
              {Sabbath ? (
                <Fontisto name="checkbox-active" size={24} color="black" />
              ) : (
                <Fontisto name="checkbox-passive" size={24} color="black" />
              )}
            </TouchableOpacity>
            <Text style={tw("text-center p-4 font-bold text-red-400")}>
              שומרים שבת
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity
            style={{ width: 20, height: 20 }}
            onPress={() => {
              console.log("TouchableOpacityTouchableOpacity");
              setiskosher(!iskosher);
            }}
          >
            {iskosher ? (
              <Fontisto name="checkbox-active" size={24} color="black" />
            ) : (
              <Fontisto name="checkbox-passive" size={24} color="black" />
            )}
          </TouchableOpacity>
          <Text style={tw("text-center p-4 font-bold text-red-400")}>כשר</Text>
        </View>
      </View>
      <View style={styles.container}></View>
      <View style={styles.buttonContainer}>
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Button title="הוספת תמונה" onPress={pickImage} />
          {image && (
            <Image
              source={{ uri: image }}
              style={{ width: 200, height: 200 }}
            />
          )}
        </View>
        <TouchableOpacity
          disabled={incompleteForm}
          style={[
            tw("w-64 p-3 rounded-xl absolute bottom-10"),
            incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
          ]}
          onPress={BuildAprtment}
        >
          <Text style={tw("text-center text-white text-xl")}>עדכון דירה </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default AddApartment;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    //borderWidth:'2'
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
  label: {
    margin: 8,
  },
});
