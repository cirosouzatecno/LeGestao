import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore, doc, getDocFromServer } from 'firebase/firestore'

import firebaseAppletConfig from '@/firebase-applet-config.json'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || firebaseAppletConfig.apiKey,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || firebaseAppletConfig.authDomain,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || firebaseAppletConfig.projectId,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || firebaseAppletConfig.storageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || firebaseAppletConfig.messagingSenderId,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || firebaseAppletConfig.appId,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || firebaseAppletConfig.measurementId,
  firestoreDatabaseId: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID || firebaseAppletConfig.firestoreDatabaseId,
}

const firestoreDatabaseId = firebaseConfig.firestoreDatabaseId

let appInstance: FirebaseApp | null = null
let authInstance: Auth | null = null
let dbInstance: Firestore | null = null

function getFirebaseApp(): FirebaseApp {
  if (typeof window === 'undefined') {
    throw new Error('Firebase initialization only available client-side')
  }
  if (!appInstance) {
    appInstance = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
  }
  return appInstance
}

export function getAuthInstance(): Auth {
  if (!authInstance) {
    authInstance = getAuth(getFirebaseApp())
  }
  return authInstance
}

export function getDbInstance(): Firestore {
  if (!dbInstance) {
    const app = getFirebaseApp()
    dbInstance = firestoreDatabaseId ? getFirestore(app, firestoreDatabaseId) : getFirestore(app)
  }
  return dbInstance
}

export const auth = new Proxy({} as Auth, {
  get(_target, prop, receiver) {
    return Reflect.get(getAuthInstance(), prop, receiver)
  }
})

export const db = new Proxy({} as Firestore, {
  get(_target, prop, receiver) {
    return Reflect.get(getDbInstance(), prop, receiver)
  }
})

export async function validateFirestoreConnection(): Promise<boolean> {
  try {
    const db = getDbInstance()
    await getDocFromServer(doc(db, 'test', 'connection'))
    return true
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase client is offline. Verify network or credentials.')
    }
    return false
  }
}

if (typeof window !== 'undefined') {
  const app = getFirebaseApp()
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: Auth; firebaseDb?: Firestore; firebaseConfig?: typeof firebaseConfig }).firebaseApp = app
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: Auth; firebaseDb?: Firestore; firebaseConfig?: typeof firebaseConfig }).firebaseAuth = getAuthInstance()
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: Auth; firebaseDb?: Firestore; firebaseConfig?: typeof firebaseConfig }).firebaseDb = getDbInstance()
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: Auth; firebaseDb?: Firestore; firebaseConfig?: typeof firebaseConfig }).firebaseConfig = firebaseConfig
}

export default getFirebaseApp
