import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import Swiper from "react-native-deck-swiper";
import { db } from "../firebase";
import { onSnapshot, collection, getDocs, doc } from "@firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import tw from "tailwind-rn";
import FilterScreen from "./FilterScreen";
import { AppContext } from "../contexts/appContext";
import { userService } from "../services/userService";
import { apartmentService } from "../services/apartmentService";
const HomeGuest = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [apartments, setApartments] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const swipeRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    loadApratments();
  }, []);

  const filterItems = (filterBy) => {
    let copy = [...Aprment];
    if (filterBy.Rooms) {
      copy = copy.filter((item) => item.Rooms == filterBy.Rooms);
    }
    if (filterBy.roomates) {
      copy = copy.filter((item) => item.roomates == filterBy.roomates);
    }
    if (filterBy.isAnimals === "yes") {
      copy = copy.filter((item) => item.isAnimals);
    } else if (filterBy.isAnimals === "no") {
      copy = copy.filter((item) => !item.isAnimals);
    }
    if (filterBy.isSmokers === "yes") {
      copy = copy.filter((item) => item.isSmokers);
    } else if (filterBy.isSmokers === "no") {
      copy = copy.filter((item) => !item.isSmokers);
    }
    if (filterBy.Sabbath === "yes") {
      copy = copy.filter((item) => item.Sabbath);
    } else if (filterBy.Sabbath === "no") {
      copy = copy.filter((item) => !item.Sabbath);
    }
    if (filterBy.isstudent === "yes") {
      copy = copy.filter((item) => item.isstudent);
    } else if (filterBy.isstudent === "no") {
      copy = copy.filter((item) => !item.isstudent);
    }
    setFilteredItems(copy);
  };

  const loadApratments = async () => {
    let docSnap = await getDocs(collection(db, "apartments"));
    let newArr = apartments;
    console.log({ docSnap });
    docSnap.forEach((doc) => {
      newArr.push({ ...doc.data(), id: doc.id });
    });
    setApartments(newArr);
    setFilteredItems(newArr);
  };

  return (
    <SafeAreaView style={tw("flex-1 relative")}>
      <View style={styles.header}>
        {apartments && <View style={{ position: "relative" }}></View>}

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <FontAwesome5 name="user-plus" size={50} color="black" />
          <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
            הרשמה
          </Text>
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1  -mt-6")}>
        {apartments && (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={filteredItems}
            overlayLabels={{
              left: {
                title: "לא אהבתי",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "אהבתי",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) => {
              return card ? (
                <View
                  key={card.id}
                  style={[
                    tw("relative bg-white h-3/4 rounded-xl"),
                    styles.cardShadow,
                  ]}
                >
                  <Image
                    style={tw("absolute top-0 h-full w-full rounded-xl ")}
                    source={{
                      uri: card?.photoURL,
                    }}
                  />
                  <View
                    style={tw(
                      "flex-row justify-between items-center absolute bottom-0 flex h-20 w-full text-center px-6 py-2 rounded-b-xl bg-white"
                    )}
                  >
                    <View>
                      <Text>מספר שותפים: {card?.NumberOfPartners}</Text>
                      <Text> בעלי חיים: {card?.isAnimals ? "✅" : "❎"}</Text>
                    </View>

                    <View>
                      <Text> חדרים: {card?.Rooms}</Text>
                      <Text> שבת: {card?.Sabbath ? "✅" : "❎"}</Text>
                    </View>
                    <View>
                      <Text> מעשנים: {card?.isSmokers ? "✅" : "❎"}</Text>
                      <Text> סטודרנטים: {card?.isstudent ? "✅" : "❎"}</Text>
                    </View>
                    <Text style={tw("text-2xl font-bold")}>
                      {card?.Address}
                    </Text>
                  </View>
                </View>
              ) : (
                <View
                  style={[
                    tw(
                      "relative bg-white h-3/4 rounded-xl justify-center items-center"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <Text style={tw("font-bold pb-5")}>No more profiles</Text>

                  <Image
                    style={tw("h-20 w-full")}
                    height={100}
                    width={100}
                    source={{ uri: "https://links.papareact.com/6gb" }}
                  />
                </View>
              );
            }}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              console.log("Swipe PASS--", cardIndex);
              // swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe MATCH", cardIndex);

              //swipeRight(cardIndex);
              //userService.addFav(user, filteredItems[cardIndex]);
            }}
            cardIndex={0}
            backgroundColor={"#4FD0E9"}
            stackSize={5}
          ></Swiper>
        )}
      </View>
      <View style={tw("flex flex-row justify-evenly")}>
        <TouchableOpacity
          onPress={() => swipeRef.current.swipeLeft()}
          style={[
            tw("items-center justify-center rounded-full w-16 h-16 bg-red-200"),
          ]}
        >
          <Entypo name="cross" size={24} color="red" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => swipeRef.current.swipeRight()}
          style={[
            tw(
              "items-center justify-center rounded-full w-16 h-16 bg-green-200"
            ),
          ]}
        >
          <AntDesign name="heart" size={24} color="green" />
        </TouchableOpacity>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeGuest;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderWidth: 1,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
