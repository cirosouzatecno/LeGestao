'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'
import {
  User,
  onAuthStateChanged,
  signInWithPopup,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signOut as fbSignOut,
} from 'firebase/auth'
import { auth, validateFirestoreConnection } from '@/lib/firebase'

interface FirebaseContextType {
  user: User | null
  loading: boolean
  connected: boolean
  signInWithEmail: (email: string, password: string) => Promise<void>
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const FirebaseContext = createContext<FirebaseContextType>({
  user: null,
  loading: true,
  connected: false,
  signInWithEmail: async () => {},
  signInWithGoogle: async () => {},
  signOut: async () => {},
})

export function FirebaseProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    validateFirestoreConnection().then(setConnected)

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
  }

  const signInWithEmail = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email.trim(), password)
  }

  const signOut = async () => {
    try {
      await fbSignOut(auth)
    } catch (err) {
      console.error('Falha ao desconectar:', err)
    }
  }

  return (
    <FirebaseContext.Provider
      value={{
        user,
        loading,
        connected,
        signInWithEmail,
        signInWithGoogle,
        signOut,
      }}
    >
      {children}
    </FirebaseContext.Provider>
  )
}

export function useFirebase() {
  return useContext(FirebaseContext)
}
