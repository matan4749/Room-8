import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { Text, View, Image } from 'react-native'
import { TouchableOpacity } from 'react-native-web';
import { db } from '../firebase';
import useAuth from '../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
function MyApratment() {

    const { user } = useAuth()
    const [apartment, setApartment] = useState()
    const navigation = useNavigation()
    console.log({ apartment });
    useEffect(() => {
        loadApartment()

    }, [])

    const loadApartment = async () => {
        let docs = await getDocs(collection(db, "apartments"));
        docs.forEach(doc => {
            if (user.email === doc.id) {
                setApartment({ ...doc.data(), id: doc.id })
            } else {
                setApartment(null)
            }
        })
    }


    const removeApartment = async () => {
        await deleteDoc(doc(db, "apartments", apartment.id));
        loadApartment()
    }
    const editApartment = async () => {
        navigation.navigate('addAprment')
    }
    return (
        < View>

            <Text>MyApratments</Text>
            {
                apartment &&
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Image source={{ uri: apartment.photoURL }} style={{ height: 100, width: 100 }} />
                    <View>
                        <Text> address:{apartment.Address}</Text>
                        <Text> rooms:{apartment.Rooms}</Text>
                        <Text> rent:{apartment.Rent}</Text>
                        <Text> animals:{apartment.isAnimals ? 'yes' : 'no'}</Text>
                    </View>
                    <TouchableOpacity onPress={removeApartment}>
                        <Text> X</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={editApartment}>
                        <Text> Edit</Text>
                    </TouchableOpacity>
                </View>
            }

        </ View>
    )
}

export default MyApratment