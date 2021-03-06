import React, { useLayoutEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ImageBackground,
} from "react-native";
import {
  AntDesign,
  FontAwesome,
  Entypo,
  Zocial,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import {
  signUp,
  SignIn,
  forgotPassword,
  signInWithGoogleWeb,
} from "../firebase";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";
import { Platform } from "react-native";
const LoginScreen = () => {
  const { user, loading, error, logout, signInWithGoogle } = useAuth();
  const signWithGoogle =
    Platform.OS === "web" ? signInWithGoogleWeb : signInWithGoogle;
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const navigation = useNavigation();

  //const{signInWithGoogle}=useAuth();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShoen: false,
    });
  }, []);

  async function handlesignup() {
    await signUp(email, password);
  }
  async function handlesignIn() {
    await SignIn(email, password);
    navigation.navigate("Home");
  }
  async function handleforgotPassword() {
    await forgotPassword(email);
  }

  return (
    <View style={tw("flex-1")}>
      <ImageBackground
        resizeMode="cover"
        style={tw("flex-1")}
        source={{
          uri: "https://images.pexels.com/photos/974746/pexels-photo-974746.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("forgotPassword")}
          style={[
            tw("bg-white absolute bottom-5 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#FF5864" }]}>
            שכחתי סיסמה
            <MaterialCommunityIcons name="lock-reset" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={signWithGoogle}
          style={[
            tw("bg-white absolute bottom-20 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#FF5864" }]}>
            כניסה עם גוגל
            <AntDesign name="google" size={24} color="google" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("Guest")}
          style={[
            tw("bg-white absolute bottom-80 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#FF5864" }]}>
            אורח
            <Zocial name="guest" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={[
            tw("bg-white absolute bottom-40 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#FF5864" }]}>
            הרשמה
            <FontAwesome name="user-plus" size={24} color="black" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("LoginForReal")}
          style={[
            tw("bg-white absolute bottom-60 w-52 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Text style={[tw("font-semibold text-center"), { color: "#FF5864" }]}>
            התחברות
            <Entypo name="login" size={24} color="black" />
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

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
