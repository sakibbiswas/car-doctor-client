import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
export const Authcontext = createContext()
const auth = getAuth(app)
const Authprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloadin] = useState(true)
    const createuser = (email, password) => {
        setloadin(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const signin = (email, password) => {
        setloadin(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsuccribe = onAuthStateChanged(auth, currentuser => {
            console.log('current user', currentuser);
            setuser(currentuser)
            setloadin(false)
        })
        return () => {
            return unsuccribe()
        }
    }, [])
    const logOut = () => {
        setloadin(true)
        signOut(auth)
    }
    const update = (name, photo) => {
        setloadin(true)
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        })
    }
    const authinfo = {
        user,
        loading,
        createuser,
        signin,
        logOut,
        update,
    }
    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;