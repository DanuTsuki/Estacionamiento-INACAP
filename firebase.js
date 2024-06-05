import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js"
import { addDoc, collection, deleteDoc, doc, getDoc, getFirestore, onSnapshot, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js"

const firebaseConfig = {
    apiKey: "AIzaSyC86r2uGYFaoPDjH0SPaN4qdwA_0ghyUsw",
    authDomain: "proyectosueldo-b73a0.firebaseapp.com",
    projectId: "proyectosueldo-b73a0",
    storageBucket: "proyectosueldo-b73a0.appspot.com",
    messagingSenderId: "235250086326",
    appId: "1:235250086326:web:a2b50e24eb6e44c4aa1117"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export const save = (estacionamiento) => {
    addDoc(collection(db, 'Estacionamiento'), estacionamiento)
}

export const getData = (callback) => {
    onSnapshot(collection(db, 'Estacionamiento'), callback)
}

export const remove = (id) => {
    deleteDoc(doc(db, 'Estacionamiento', id))
}

export const getDocumento = (id) => getDoc(doc(db, 'Estacionamiento', id))

export const update = (id, estacionamiento) => {
    updateDoc(doc(db, 'Estacionamiento', id), estacionamiento)
}