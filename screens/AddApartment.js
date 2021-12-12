
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Button, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from "firebase/firestore";
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';

const AddApartment = () => {
    const [Address, setAddress] = useState(null);
    const [Rooms, setRooms] = useState(null)
    const [Rent, setRent] = useState(null)
    const [NumberOfPartners, setNumberOfPartners] = useState(null);
    const [Apartment, setApartment] = useState([]);
    const [image, setImage] = useState(null);


    const navigation = useNavigation();

    async function handleBuildingPartment() {


    }
    const BuildAprtment = () => {
        addDoc(collection(db, 'Aprment'), {

            Address: Address,
            Rooms: Rooms,
            Rent: Rent,
            NumberOfPartners: NumberOfPartners,
            photoURL: image,

        }).then(() => {
            navigation.navigate('Home');
        })
            .catch((error) => {
                alert(eror.message);
            })
    }
    useEffect(() => {
        (async () => {
            if (Platform.OS !== 'web') {
                const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
                if (status !== 'granted') {
                    alert('Sorry, we need camera roll permissions to make this work!');
                }
            }
        })();
    }, []);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        console.log(result);

        if (!result.cancelled) {
            setImage(result.uri);
        }
    };



    const { logout } = useAuth()
    return (

        <KeyboardAvoidingView

            style={styles.container}
            behavior="padding"
        >
            <View>
                <TouchableOpacity>

                </TouchableOpacity>
            </View>
            <View style={styles.inputContainer}>
                <View><Text>Adding an apartment</Text></View>

                <TextInput
                    placeholder="Address"
                    keyboardType="email-address"
                    value={Address}
                    onChangeText={text => setAddress(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Rooms"
                    value={Rooms}
                    onChangeText={text => setRooms(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Number Of Partners"
                    value={NumberOfPartners}
                    onChangeText={text => setNumberOfPartners(text)}
                    style={styles.input}
                />
                <TextInput
                    placeholder="Rent"
                    value={Rent}
                    onChangeText={text => setRent(text)}
                    style={styles.input}
                />

            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="בחר תמונה מהגלריה" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View>
            <View style={styles.buttonContainer}>

                <TouchableOpacity
                    onPress={BuildAprtment}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Add</Text>

                </TouchableOpacity>

            </View>

        </KeyboardAvoidingView>
    )
}


export default AddApartment

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

