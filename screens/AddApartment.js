import React from 'react'
import { KeyboardAvoidingView, StyleSheet, Text, TextInput,  TouchableOpacity, View } from 'react-native'
import  { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { collection, addDoc } from "firebase/firestore";
import useAuth from '../hooks/useAuth';
import { db } from '../firebase';


const AddApartment = () => {
    const [Address, setAddress] = useState(null);
    const[Rooms,setRooms]=useState(null)
    const[Rent,setRent]=useState(null)
    const [NumberOfPartners, setNumberOfPartners] = useState(null);
    const[Apartment,setApartment]=useState([]);
    const[image,setimage]=useState(null);
    
    
   const navigation =useNavigation();

   async function handleBuildingPartment () {
      
    /*await BuildingPartment(Address,Rooms,Rent,NumberOfPartners)
    .then(()=>{
        
    alert("הדירה נוספה בהצלחה!");
     
setRooms("");
setRent("");
setNumberOfPartners("");
setAddress("");
    })

*/
  }
  const BuildAprtment =()=>{
addDoc(collection(db,'Aprment', user.uid),{
    
    Address:Address,
    Rooms:Rooms,
    Rent:Rent,
    NumberOfPartners:NumberOfPartners,
    photoURL:image,
    
}).then(()=>{
    navigation.navigate('Home');
})
.catch((error) =>{
    alert(eror.message);
})
  }



  const {logout}=useAuth()
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
             <TextInput
            placeholder="photoURL"
            value={image}
            onChangeText={text =>setimage(text)}
            style={styles.input}
            />
            </View>
            
           <View style={styles.buttonContainer}>
          
               <TouchableOpacity
               onPress={BuildAprtment}
               style={styles.button}
               >
                   <Text style={styles.buttonText}>Add</Text>

               </TouchableOpacity>
               <TouchableOpacity
               onPress={logout}
               style={styles.button}
               >
                   <Text style={styles.buttonText}>LogOut</Text>

               </TouchableOpacity>
               
           </View>
           
        </KeyboardAvoidingView>
    )
}


export default AddApartment

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

    