import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Google from "expo-google-app-auth";
import SideMenu from 'react-native-side-menu-updated'

import { auth } from "../firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from "@firebase/auth";
import * as RootNavigation from "../RootNavigation";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native-web";
import { AppContext } from "../contexts/appContext";
import { TouchableOpacity } from "react-native-gesture-handler";
import { userService } from "../services/userService";

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
        if (user) {
          console.log({ user });
          const res = await userService.getByEmail(user.email)
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
        console.log({ logInResult });
        if (logInResult.type === "success") {
          const { idToken, accessToken } = logInResult;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );

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
    console.log({ navigation });
    return <View>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('MyApratment')}>
        <Text style={styles.menuText}>my apartments</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
        onPress={() => navigation.navigate('Favorites')}>
        <Text style={styles.menuText}>favorites</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.menuItem}
      onPress={logout}
      >
        <Text style={styles.menuText}>logout</Text>
      </TouchableOpacity>
    </View>
  }

  const [showMenu, setShowMenu] = useState(false)
  return (
    <AppContext.Provider value={{
      showMenu, toggleMenu: setShowMenu
    }}>
      <SideMenu
        isOpen={showMenu}
        disableGestures={true}
        menu={<Menu />}>

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
  menuItem: {

  },
  menuText: {

  }
})
