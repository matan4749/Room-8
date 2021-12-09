
import React, { useLayoutEffect, useRef, useState,useEffect } from 'react'
import { View,StyleSheet,Image, Text,TouchableOpacity,SafeAreaView } from 'react-native'
import Swiper from 'react-native-deck-swiper'
import { db  } from '../firebase'
import { onSnapshot,collection,doc } from '@firebase/firestore'
import useAuth from '../hooks/useAuth'
import { useNavigation } from '@react-navigation/native'
import tw from "tailwind-rn";
  const DUMMY_DATA =[
      {
          firstName:"Matan",
          lastName:"Amar",
          id:123,
          PotoURL:"https://img.mako.co.il/2019/10/29/Partners_App_1019_9_c.jpg"
      },
      {
        firstName:"Matan",
        lastName:"Amar",
        id:123,
        PotoURL:"https://medias.timeout.co.il/www/uploads/2020/03/1-750x500.jpg"
    },{
        firstName:"Matan",
        lastName:"Amar",
        id:23,
        PotoURL:"https://img.mako.co.il/2021/02/08/minkoffNight_autoOrient_i.jpg"
    },{
        firstName:"Matan",
        lastName:"Amar",
        id:13,
        PotoURL:"https://medias.timeout.co.il/www/uploads/2020/05/2-750x500.jpg"
    } 
  ];

const HomeScreen = () => {
    const navigation=useNavigation();
    const {logout,user} =useAuth();
    const[Aprment,setAprment]=useState([]);
    const swipeRef=useRef(null);
   
    useLayoutEffect(() => 
        onSnapshot(collection(db,"Aprment"),(snapshot) =>{
                
                navigation.navigate('addAprment')
            
        }),
     []
     );
     useEffect(() => {
        
         const BuildAp = async ()=>{
             onSnapshot(collection(db,"Aprtment"),(snapshot)=>{
                 setAprment(
                     snapshot.docs.map((doc) =>({
                         id:doc.id,
                         ...doc.data(),
                     }))
                 );

             });

         };
          return()=> BuildAp();
         
     }, []);
     
    return (
<SafeAreaView>
    <View>
       <TouchableOpacity>


        </TouchableOpacity> 
    </View>
</SafeAreaView>
    );

 }
 export default HomeScreen;