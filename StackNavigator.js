import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import useAuth from './hooks/useAuth';
import AddApartment from './screens/AddApartment';
import forgotPasswordScreen from './screens/forgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

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


          <Stack.Group>
            <Stack.Screen name="Home" component={HomeScreen} />

            <Stack.Screen name="forgotPassword" component={forgotPasswordScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{ presentation: "modal" }}>
            <Stack.Screen name="addAprment" component={AddApartment} />

          </Stack.Group>
        </>
      ) : (
        <Stack.Group>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Group>
      )}
    </Stack.Navigator>

  )
}

export default StackNavigator
