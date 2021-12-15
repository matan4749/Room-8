import React from 'react'
import { useState } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { forgotPassword } from '../firebase';
import { useNavigation } from '@react-navigation/native';

const forgotPasswordScreen = () => {

    const navigation = useNavigation();
    const [email, setEmail] = useState('')


    async function handleforgotPassword() {

        await forgotPassword(email)
            .then(() => {
                console.log(email);
                alert("קישור להזנת סיסמא חדשה נשלח למייל בהצלחה!");
                navigation.navigate('SignUp');
                setEmail("");
            })

    }


    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
        >
            <View style={styles.inputContainer}>

                <TextInput
                    placeholder="Email"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={text => setEmail(text)}
                    style={styles.input}
                />
                <TouchableOpacity
                    onPress={handleforgotPassword}
                    style={[styles.button, styles.buttonOutline]}
                >
                    <Text style={styles.buttonOutlineText}>Send</Text>

                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>

    )
}


export default forgotPasswordScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: 'center',
    },

    inputContainer: {
        width: '80%'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,

    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,

    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'

    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 5,
        borderColor: '#0782F9',
        //borderWidth:'2'

    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16,
    },
    buttonOutlineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16,

    },


})

