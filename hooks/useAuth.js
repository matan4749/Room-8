 import React, {
      createContext,
       useContext,
        useEffect,
         useMemo,
          useState,
         } from 'react'
 import * as Google from 'expo-google-app-auth';
 import{
     GoogleAuthProvider,
     onAuthStateChanged,
     signInWithCredential,
     signOut,
 } from "@firebase/auth";
import { auth } from '../firebase';


 const AuthContext = createContext({});

 const config ={
     androidClientId:'69219582263-9fbgf3tlohak9pj7dmkq3rq5u55hvp4j.apps.googleusercontent.com',
     iosClinentId:'69219582263-4smi599e4c5m9fq9cuskio9gff97rbaq.apps.googleusercontent.com',
     scopes:["profile","email"],
     Permissions:["public_profile","email","gender","location"],
 }


 export const AuthProvider = ({children} ) => {
    const[error,setError]=useState(null);
    const[user,setUser] =useState(null);
    const[loadingInitial,setloadingInitial]=useState(true);
    const[loading,setloading]=useState(false);

    useEffect(() => 
       onAuthStateChanged(auth,(user)=>{
            if(user){
                setUser(user);

            }else{
               setUser(null); 
            }
            setloadingInitial(false);
        }),
     []
    );

    const logout =() =>{
        setloading(true);

        signOut(auth)
        .catch((error)=> setError(error))
        .finally(()=>setloading(false));
    };

    const signInWithGoogle =async() =>{
        setloading(true);

        await Google.logInAsync(config)
        .then(async(logInResult)=>{
             if(logInResult.type === 'success'){
                 
                const{idToken,accessToken}=logInResult;
                const credential =GoogleAuthProvider.credential(
                    idToken,
                    accessToken
                    );

                 await signInWithCredential(auth,credential);
             }
            return Promise.reject();
         }).catch(error =>setError(error))
         .finally(()=>setloading(false));

         
    }
    const memoedValue =useMemo(()=>({
        user,
        loading,
        error,
        signInWithGoogle,
        logout,
    }),[user,loading,error])

     return (
         <AuthContext.Provider value={memoedValue}>
            {!loadingInitial&& children}
        </AuthContext.Provider>
     )
 }
 export default function useAuth(){
     return useContext(AuthContext);
 }
 
 