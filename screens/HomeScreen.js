import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native'
import  { useState } from 'react'
import { useNavigation } from '@react-navigation/native';


const HomeScreen = () => {
    const [Address, setAddress] = useState();
    const[Rooms,setRooms]=useState('')
    const[Rent,setRent]=useState('')
    const [NumberOfPartners, setNumberOfPartners] = useState();
   
    
   const navigation =useNavigation();
  

   async function handleBuildingPartment(){
      
        await Build(Address,Rooms,Rent,NumberOfPartners);
  }
    return (
        <KeyboardAvoidingView
        style={styles.container}
        behavior="padding"
        >
           <View style={styles.inputContainer}>
           
           <TextInput
            placeholder="Address"
            keyboardType="email-address"
            value={Address}
            onChangeText={text =>setAddress(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Rooms"
            value={Rooms}
            onChangeText={text =>setRooms(text)}
            style={styles.input}
            />
             <TextInput
            placeholder="Number Of Partners"
            value={NumberOfPartners}
            onChangeText={text =>setNumberOfPartners(text)}
            style={styles.input}
            />
            <TextInput
            placeholder="Rent"
            value={Rent}
            onChangeText={text =>setRent(text)}
            style={styles.input}
            />
            </View>
            
           <View style={styles.buttonContainer}>
          
               <TouchableOpacity
               onPress={handleBuildingPartment}
               style={styles.button}
               >
                   <Text style={styles.buttonText}>Add</Text>

               </TouchableOpacity>
               
           </View>
           
        </KeyboardAvoidingView>
    )
}


export default HomeScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent: "center",
        alignItems:'center',
    },
    
inputContainer:{
width:'80%'
},
input:{
backgroundColor:'white',
paddingHorizontal:15,
paddingVertical:10,
borderRadius:10,
marginTop:5,

},
categoryIcon: {
    borderWidth: 0,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: 70,
    height: 70,
    left: 10,
    backgroundColor: "#fdeae7" /* '#FF6347' */,
    borderRadius: 50,
    marginHorizontal: 10,
},
sliderImage: {
    height: "100%",
    width: "100%",
    alignSelf: "center",
    borderRadius: 8,
  },
buttonContainer:{
    width:'60%',
    justifyContent:'center',
    alignItems:'center',
    marginTop:40,

},
button:{
backgroundColor:'#0782F9',
width:'100%',
padding:15,
borderRadius:10,
alignItems:'center'

},
buttonOutline:{
    backgroundColor:'white',
    marginTop:5,
    borderColor:'#0782F9',
    //borderWidth:'2'
   
},
buttonText:{
color:'white',
fontWeight:'700',
fontSize:16,
},
buttonOutlineText:{
    color:'#0782F9',
    fontWeight:'700',
    fontSize:16,
    
},

    
})

    