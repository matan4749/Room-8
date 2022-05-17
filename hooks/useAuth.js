import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import SideMenu from "react-native-side-menu-updated";
import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import * as RootNavigation from "../RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, ImageBackground, Text, View, Image } from "react-native";
import { AppContext } from "../contexts/appContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { userService } from "../services/userService";
import tw from "tailwind-rn";

const AuthContext = createContext({});
const config = {
  androidClientId:
    "463366353489-rpj8e62kefof9oaam8lbs36mumdi79sq.apps.googleusercontent.com",
  iosClientId:
    // hidestream
    "69219582263-4smi599e4c5m9fq9cuskio9gff97rbaq.apps.googleusercontent.com",
  scopes: ["profile", "email"],
  permissions: ["public_profile", "email", "gender", "location"],
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const navigation = useNavigation();

  useEffect(
    () =>
      onAuthStateChanged(auth, async (user) => {
        console.log('here onAuthStateChanged ');
        if (user) {
          console.log({ user });
          const res = await userService.getByEmail(user.email);
          console.log({ res });
          setUser(res);
        } else {
          setUser(null);
        }
        setLoadingInitial(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    setLoading(true);
    console.log("rgdgdrgdr");
    await Google.logInAsync(config)
      .then(async (logInResult) => {
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          console.log('user:', logInResult.user);
          setUser(logInResult.user)
          await signInWithCredential(auth, credential);
        }
        return Promise.reject(); // Or handle user cancelation separatedly
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  };

  const logout = async () => {
    setLoading(true);

    await signOut(auth)
      .catch((error) => setError(error))
      .finally(() => {
        setLoading(false);
      });
  };

  // Make the provider update only when it should.
  // We only want to force re-renders if the user,
  // loading or error states change.
  //
  // Whenever the `value` passed into a provider changes,
  // the whole tree under the provider re-renders, and
  // that can be very costly! Even in this case, where
  // you only get re-renders when logging in and out
  // we want to keep things very performant.
  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, loading, error]
  );

  const Menu = () => {
    return (
      <View>
        <ImageBackground
          source={require("../pexels.png")}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
            תפריט
          </Text>
        </ImageBackground>
        {user && (
          <>
            <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
              שלום {user.name}❤️
              <Image
                style={tw("h-10 w-10 rounded-full")}
                source={{ uri: user.photoURL }}
              />
            </Text>
          </>
        )}

        <Text style={tw("text-justify text-xl text-gray-500 p-2 font-bold")}>
          הדירה שלי
        </Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("MyApratment")}
        >
          <Image style={tw("h-10 w-10")} source={require("../house.png")} />
        </TouchableOpacity>
        <Text style={tw("text-justify text-xl text-gray-500 p-2 font-bold")}>
          מועדפים
        </Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("Favorites")}
        >
          <Image style={tw("h-10 w-10")} source={require("../home.png")} />
        </TouchableOpacity>
        <Text style={tw("text-justify text-xl text-gray-500 p-2 font-bold")}>
          אודות
        </Text>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => navigation.navigate("aboutS")}
        >
          <Image style={tw("h-10 w-10")} source={require("../about.png")} />
        </TouchableOpacity>
        <Text style={tw("text-justify text-xl text-gray-500 p-2 font-bold")}>
          התנתקות
        </Text>
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <Image style={tw("h-10 w-10")} source={require("../logout.png")} />
        </TouchableOpacity>
      </View>
    );
  };

  const [showMenu, setShowMenu] = useState(false);
  return (
    <AppContext.Provider
      value={{
        showMenu,
        toggleMenu: setShowMenu,
      }}
    >
      <SideMenu isOpen={showMenu} disableGestures={true} menu={<Menu />}>
        <AuthContext.Provider value={memoedValue}>
          {!loadingInitial && children}
        </AuthContext.Provider>
      </SideMenu>
    </AppContext.Provider>
  );
}

// Let's only export the `useAuth` hook instead of the context.
// We only want to use the hook directly and never the context component.
export default function useAuth() {
  return useContext(AuthContext);
}

const styles = StyleSheet.create({
  menuItem: {},
  menuText: {},
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
