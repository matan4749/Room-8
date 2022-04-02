import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { db } from "../firebase";
import { onSnapshot, collection, getDocs, doc } from "@firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import tw from "tailwind-rn";

const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [Aprment, setAprment] = useState([]);
  const swipeRef = useRef(null);

  useEffect(() => {
    console.log("test1");
    getAprtments();
  }, []);

  async function getAprtments() {
    let docSnap = await getDocs(collection(db, "Aprment"));

    let newArr = Aprment;
    // docSnap.forEach((doc) => {
    //   //console.log(doc.data());
    //   newArr.push(doc.data());
    // });
    console.log(docSnap);
    setAprment(docSnap);

    // console.log("abc", newArr);

    //setAprment(newArr);
  }
  //   console.log(Aprment);
  const getLogout = () => {
    navigation.navigate("Login");

    logout;
  };

  return (
    <SafeAreaView style={tw("flex-1 relative")}>
      <View style={tw("items-center relative")}>
        {Aprment && (
          <TouchableOpacity
            onPress={logout}
            style={tw("absolute left-5 top-3")}
          >
            <Image
              style={tw("h-10 w-10 rounded-full")}
              source={{ uri: user.photoURL }}
              //source={require("../user.png")}
            />
          </TouchableOpacity>
        )}

        <TouchableOpacity onPress={() => navigation.navigate("addAprment")}>
          <Image style={tw("h-14 w-14")} source={require("../logo.png")} />
        </TouchableOpacity>

        <TouchableOpacity style={tw("absolute right-5 top-3")}>
          <Ionicons
            onPress={() => navigation.navigate("forgotPassword")}
            name="chatbubbles-sharp"
            size={30}
            color="#FF5864"
          />
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1  -mt-6")}>
        {Aprment && (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={Aprment}
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
                      <Text style={tw("text-lg font-bold")}>
                        מספר שותפים: {card?.NumberOfRooms}
                      </Text>
                      <Text> שכירות:{card?.Rent}</Text>
                      <Text>מספר חדרים:{card?.Rooms}</Text>
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

export default HomeScreen;

const styles = StyleSheet.create({
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
