
import React, { useLayoutEffect, useRef, useState, useEffect } from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Button, Image } from 'react-native'

import { useNavigation } from '@react-navigation/native';
import { collection, addDoc, setDoc, doc } from "firebase/firestore";
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';
import * as ImagePicker from 'expo-image-picker';
import tw from "tailwind-rn";


const AddApartment = () => {
    const [Address, setAddress] = useState(null);
    const [Rooms, setRooms] = useState(null)
    const [Rent, setRent] = useState(null)
    const [NumberOfPartners, setNumberOfPartners] = useState(null);
    const [Apartment, setApartment] = useState([]);
    const [image, setImage] = useState(null);
    const { user } = useAuth();
    const incompleteForm = !Address || !Rooms || !Rent;

    const navigation = useNavigation();

    async function handleBuildingPartment() {


    }
    const BuildAprtment = () => {
        setDoc(doc(db, 'apartments', user.email), {
            Address: Address,
            Rooms: Rooms,
            Rent: Rent,
            NumberOfPartners: NumberOfPartners,
            photoURL: image,
        }).then(() => {
            navigation.navigate('Home');
        })
            .catch((error) => {
                console.log({ error });
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
                <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
                    שלום {user.displayName}❤️
                </Text>
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 1: Location of the apartment
                </Text>
                <TextInput
                    value={Address}
                    onChangeText={setAddress}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter an address of the apartment "
                />
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 1: Number of rooms
                </Text>
                <TextInput
                    value={Rooms}
                    onChangeText={setRooms}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter the number of rooms in the apartment "
                />
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 1: Number of partners
                </Text>
                <TextInput
                    value={NumberOfPartners}
                    onChangeText={setNumberOfPartners}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter the number of partners in the apartment "
                />
                <Text style={tw("text-center p-4 font-bold text-red-400")}>
                    Step 1: The cost of rent
                </Text>
                <TextInput
                    value={Rent}
                    onChangeText={setRent}
                    style={tw("text-center text-xl pb-2")}
                    placeholder="Enter the cost of renting the apartment "
                />








            </View>
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Button title="Select image" onPress={pickImage} />
                {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
            </View >
            <View style={styles.buttonContainer}>


                <TouchableOpacity
                    disabled={incompleteForm}
                    style={[
                        tw("w-64 p-3 rounded-xl absolute bottom-10"),
                        incompleteForm ? tw("bg-gray-400") : tw("bg-red-400"),
                    ]}
                    onPress={BuildAprtment}
                >
                    <Text style={tw("text-center text-white text-xl")}>Update Aprtment</Text>
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

