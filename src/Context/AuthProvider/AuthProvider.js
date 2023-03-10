import React, { useState } from 'react';
import {createUserWithEmailAndPassword, deleteUser, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile} from 'firebase/auth';
import app from '../../firebase/firebase.config';
import { createContext } from 'react';
import { useEffect } from 'react';
const auth = getAuth(app);
export const AuthContext = createContext();
const AuthProvider = ({children}) => {
    const [user,setUser] = useState(null);
    const [loading,setLoading] = useState(true);

    const createAccount = (email,password) =>{
        setLoading(true);
        return createUserWithEmailAndPassword(auth,email,password);
    }
    const signINWithGoole =(provider)=>{
        setLoading(true);
        return signInWithPopup(auth,provider);
    }
    const logIn = (email,password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth,email,password);
    }
    const logOut = ()=>{
        setLoading(true);
        return signOut(auth);
    }
    const removeUser=()=>{
        setLoading(true)
        return deleteUser(auth.user);
    }
    const userProfile = (userInfo)=>{
        setLoading(true);
        return updateProfile(auth.currentUser,userInfo)

    }
    useEffect(()=>{
       const unsubscribe = onAuthStateChanged(auth,currentUser =>{
             setUser(currentUser);
             setLoading(false);
        })
        return ()=> unsubscribe;
    },[])

    const authInfo ={
        loading,
        user,
        signINWithGoole,
        createAccount,
        logIn,
        logOut,
        userProfile,
        removeUser
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;