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

    const signIn = (email, password) => {
        setloadin(true)
        return signInWithEmailAndPassword(auth, email, password)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current user', currentUser);
            setuser(currentUser)
            setloadin(false)
        })
        return () => {

            return unsubscribe();
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
        signIn,
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