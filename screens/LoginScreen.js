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
import { auth } from "../firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signUp, SignIn, forgotPassword, signInWithGoogle } from "../firebase";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../hooks/useAuth";
import tw from "tailwind-rn";

const LoginScreen = () => {
  const { user, loading, error, logout } = useAuth();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState();
  const navigation = useNavigation();

  async function handlesignInWithGoogle() {
    await signInWithGoogle();
  }
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
          uri: "https://sites.education.gov.il/cloud/home/tikshuv/PublishingImages/shituf_peula.jpg",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>guest</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => navigation.navigate("SignUp")}
          style={styles.button}
        >
          <Text style={styles.buttonText}>signUp</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handlesignInWithGoogle}
          style={[
            tw("bg-white absolute bottom-20 w-32 rounded-2xl p-4"),
            { marginHorizontal: "25%" },
          ]}
        >
          <Image style={tw("h-14 w-40")} source={require("../google.png")} />
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    left: 10,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
    marginHorizontal: 10,
  },
  sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
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
});
