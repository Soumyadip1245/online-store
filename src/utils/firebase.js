import { getFirestore, collection, doc, getDocs, addDoc, setDoc, deleteDoc, where, orderBy, query, limit, getDoc, Firestore, onSnapshot } from "firebase/firestore"
import { nanoid } from "nanoid"
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage"
import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_CONFIG_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_CONFIG_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_CONFIG_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_CONFIG_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_CONFIG_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_CONFIG_APP_ID,
}
const storeConfig = {
  apiKey: process.env.REACT_APP_STORE_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_STORE_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_STORE_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_STORE_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_STORE_FIREBASE_APP_ID,
}

const provider = new GoogleAuthProvider()
const app = initializeApp(firebaseConfig, "main")
const appStore = initializeApp(storeConfig, "store")
const db = getFirestore(app)
const auth = getAuth(app)
const authStore = getAuth(appStore)
const storage = getStorage(app)
export const Table = {
  STORE: "store",
  SELLER: "seller",
  PRODUCT: "product",
  RENTAL: "rentals",
  ACCESS: "access",
  BUYER: "buyer",
  ORDER: "order",
  MESSAGE: "messages",
}
class FirebaseService {
  async create(obj, table) {
    const c = collection(db, table)
    const ref = await addDoc(c, obj)
    obj._id = ref.id
    return obj._id
  }

  async update(id, obj, table) {
    const d = doc(db, table, id)
    await setDoc(d, obj, { merge: true })
  }

  async delete(id, table) {
    const d = doc(db, table, id)
    await deleteDoc(d)
  }

  async selectFirst(table, id) {
    const d = doc(db, table, id)
    const docSnap = await getDoc(d)
    if (docSnap.exists()) {
      return { ...docSnap.data(), _id: docSnap.id }
    } else {
      return null
    }
  }
  where(fieldPath, opStr, value) {
    return where(fieldPath, opStr, value)
  }

  orderBy(fieldPath, directionStr) {
    return orderBy(fieldPath, directionStr)
  }

  limit(number) {
    return limit(number)
  }
  async select(table, ...wheres) {
    const q = query(collection(db, table), ...wheres)
    const snap = await getDocs(q)
    const objs = snap.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
    return objs
  }
  async uploadFile(file) {
    const uniqueName = nanoid() + "-" + file.name
    const storageRef = ref(storage, `projectfiles/${uniqueName}`)
    await uploadBytes(storageRef, file)
    return uniqueName
  }
  async uploadPDF(file, orderNumber) {
    const uniqueName = orderNumber
    const storageRef = ref(storage, `projectfiles/${uniqueName}`)
    const meta = { contentType: "application/pdf" }
    const buffer = Uint8Array.from(atob(file), (c) => c.charCodeAt(0))
    const fileBlob = new Blob([buffer], { type: "application/pdf" })
    await uploadBytes(storageRef, fileBlob, meta)
    return uniqueName
  }
  imageUrl(fileId) {
    if (!fileId) return null
    const fileRef = ref(storage, `projectfiles/${fileId}`)
    return getDownloadURL(fileRef)
  }
  async realSelect(table, ...wheres) {
    const q = query(collection(db, table), ...wheres)
    return new Promise((resolve, reject) => {
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const objs = querySnapshot.docs.map((doc) => ({ ...doc.data(), _id: doc.id }))
        console.log("Updated data:", objs)
        resolve(objs)
      })
      console.log(unsubscribe)
    })
  }
}
export default FirebaseService
export { auth, provider, authStore }
