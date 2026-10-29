import { initializeApp, getApps, getApp, type FirebaseApp } from 'firebase/app'
import { getAuth, type Auth } from 'firebase/auth'
import { getFirestore, type Firestore, doc, getDocFromServer } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  firestoreDatabaseId: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_ID,
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
