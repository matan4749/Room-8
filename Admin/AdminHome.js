import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  StyleSheet,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { db } from "../firebase";
import { onSnapshot, collection, getDocs, doc } from "@firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import tw from "tailwind-rn";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";

import { AppContext } from "../contexts/appContext";
import { userService } from "../services/userService";
const AdminHome = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [Aprment, setAprment] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const swipeRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const context = useContext(AppContext);

  return (
    <SafeAreaView style={tw("flex-1 relative")}>
      <ImageBackground
        source={require("../pexels.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          מנהל
        </Text>
      </ImageBackground>
      <View style={styles.header}>
        {Aprment && (
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              onPress={() => context.toggleMenu(!context.showMenu)}
            >
              <Image
                style={tw("h-10 w-10 rounded-full")}
                source={{ uri: user.photoURL }}
                //source={require("../user.png")}
              />
            </TouchableOpacity>
            <Text
              style={tw("text-justify text-xl text-gray-500 p-2 font-bold")}
            >
              התנתקות
            </Text>
            <TouchableOpacity style={styles.menuItem} onPress={logout}>
              <Entypo name="log-out" size={60} color="black" />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => navigation.navigate("Users")}>
          <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
            משתמשים
          </Text>
          <FontAwesome name="users" size={60} color="black" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("UserApartments")}>
          <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
            דירות
          </Text>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={60}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={require("../pexels.png")}
        resizeMode="cover"
        style={styles.image}
      >
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          מנהל
        </Text>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default AdminHome;

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
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 42,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0",
  },
});
