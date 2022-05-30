import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import useAuth from "./hooks/useAuth";
import AddApartment from "./screens/AddApartment";
import forgotPasswordScreen from "./screens/forgotPasswordScreen";
import HomeScreen from "./screens/HomeScreen";
import LoginScreen from "./screens/LoginScreen";
import SignUpScreen from "./screens/SignUpScreen";
import FilterScreen from "./screens/FilterScreen";
import Favorites from "./screens/Favorites";
import MyApratment from "./screens/MyApratment";
import Users from "./Admin/Users";
import AdminHome from "./Admin/AdminHome";
import UserApartments from "./Admin/UserApartments";
import HomeGuest from "./screens/HomeGuest";
import about from "./screens/about";
import NotificationsScreen from "./screens/notificationsScreen";
import LoginForRealScreen from "./screens/LoginForReal";
import SingleApartment from "./screens/SingleApartment";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  const { user } = useAuth();
  return (
    <Stack.Navigator
      defaultScreenOptions={{
        headerShown: false,
      }}
    >
      {user ? (
        <>
          {user.email === "matan4749@gmail.com" && (
            <>
              <Stack.Group>
                <Stack.Screen name="Admin" component={AdminHome} />

                <Stack.Screen
                  name="UserApartments"
                  component={UserApartments}
                />

                <Stack.Screen name="Users" component={Users} />
              </Stack.Group>
            </>
          )}
          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="addAprment" component={AddApartment} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="MyApratment" component={MyApratment} />
            <Stack.Screen name="SingleApartment" component={SingleApartment} />
            <Stack.Screen name="aboutS" component={about} />
            <Stack.Screen
              name="notifications"
              component={NotificationsScreen}
            />
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="LoginForReal" component={LoginForRealScreen} />
          <Stack.Screen name="Guest" component={HomeGuest} />
          <Stack.Screen
            name="forgotPassword"
            component={forgotPasswordScreen}
          />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
