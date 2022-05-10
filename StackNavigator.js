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

            <Stack.Screen
              name="forgotPassword"
              component={forgotPasswordScreen}
            />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="addAprment" component={AddApartment} />
            <Stack.Screen name="FilterScreen" component={FilterScreen} />
            <Stack.Screen name="Favorites" component={Favorites} />
            <Stack.Screen name="MyApratment" component={MyApratment} />
          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
