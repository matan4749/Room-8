import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import useAuth from './hooks/useAuth';
import AddApartment from './screens/AddApartment';
import forgotPasswordScreen from './screens/forgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack =createNativeStackNavigator();
const StackNavigator = () => {
  const {user} = useAuth();

    return (
      <Stack.Navigator>
        screenOptions ={{
          headerShown:false,
        }}
        
          
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="addAprment" component={AddApartment} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="forgotPassword" component={forgotPasswordScreen} />
        
      </Stack.Navigator>
    
    )
}

export default StackNavigator
