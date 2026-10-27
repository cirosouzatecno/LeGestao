import { initializeApp, getApps, getApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore, doc, getDocFromServer } from 'firebase/firestore'
import firebaseConfig from '../firebase-applet-config.json'

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId)
export const auth = getAuth(app)

export async function validateFirestoreConnection(): Promise<boolean> {
  try {
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
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: typeof auth; firebaseDb?: typeof db; firebaseConfig?: typeof firebaseConfig }).firebaseApp = app
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: typeof auth; firebaseDb?: typeof db; firebaseConfig?: typeof firebaseConfig }).firebaseAuth = auth
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: typeof auth; firebaseDb?: typeof db; firebaseConfig?: typeof firebaseConfig }).firebaseDb = db
  ;(window as unknown as { firebaseApp?: typeof app; firebaseAuth?: typeof auth; firebaseDb?: typeof db; firebaseConfig?: typeof firebaseConfig }).firebaseConfig = firebaseConfig
}

export default app
