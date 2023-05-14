import React, { createContext, useEffect, useState } from 'react';
import { GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../firebase/firebase.config';
export const Authcontext = createContext()
const auth = getAuth(app)
const Authprovider = ({ children }) => {
    const [user, setuser] = useState(null)
    const [loading, setloading] = useState(true)
    const googleprovider = new GoogleAuthProvider()
    const createuser = (email, password) => {
        setloading(true)
        return createUserWithEmailAndPassword(auth, email, password)

    }

    const signIn = (email, password) => {
        setloading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    const googleSignIN = () => {
        setloading(true)
        return signInWithPopup(auth, googleprovider)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            console.log('current user', currentUser);
            setuser(currentUser)
            setloading(false)

            if (currentUser && currentUser.email) {
                const loggeduser = {
                    email: currentUser.email
                }
                console.log(loggeduser);

                fetch('http://localhost:4000/jwt', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(loggeduser),
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log('jwt response', data);
                        // warning : Local storage is not the best (second best place) to store the access token 
                        localStorage.setItem('car-access-token', data.token)

                    })
            }
            else {
                localStorage.removeItem('car-access-token')
            }

        })
        return () => {

            return unsubscribe();
        }

    }, [])
    const logOut = () => {
        setloading(true)
        return signOut(auth)
    }
    const update = (name, photo) => {
        setloading(true)
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
        googleSignIN,
    }
    return (
        <Authcontext.Provider value={authinfo}>
            {children}
        </Authcontext.Provider>
    );
};

export default Authprovider;