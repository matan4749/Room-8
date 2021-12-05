import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'
import forgotPasswordScreen from './screens/forgotPasswordScreen';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';

const Stack =createNativeStackNavigator();
const StackNavigator = () => {
    return (
        
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="forgotPassword" component={forgotPasswordScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
      </Stack.Navigator>
    
    )
}

export default StackNavigator
