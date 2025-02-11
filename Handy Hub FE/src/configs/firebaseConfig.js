// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// Import Firebase SDK
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import axios from "axios";
// Add GoogleAuthProvider, signInWithPopup, signOut


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBaPYDRu5jUrlLR8BYR6FSWEDEDVmwyBCU",
  authDomain: "handy-hub-d7766.firebaseapp.com",
  projectId: "handy-hub-d7766",
  storageBucket: "handy-hub-d7766.firebasestorage.app",
  messagingSenderId: "338631165780",
  appId: "1:338631165780:web:5cace281a0944736586ac1",
  measurementId: "G-H2DW69FLWQ"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const googleProvider = new GoogleAuthProvider()

// Function for Google Login
const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    console.log("User Info:", result.user)
    return result.user
  } catch (error) {
    console.error("Google Sign-In Error:", error)
    return null
  }
}

// Function for Logout
const logout = async () => {
  try {
    await signOut(auth)
    console.log("User logged out")
  } catch (error) {
    console.error("Logout Error:", error)
  }
}

// normal Login Process
const API_URL = "http://localhost:8080/api/oauth/"

const BasicLogin = async () => {
  try {
    const response = await axios.post(API_URL + "token" ,{username,password})
    localStorage.setItem("token", response.data.token)
    console.log("User Logged In: ", response.data)
    return response.data
  } catch (error) {
    console.error("Google Sign-In Error: ", error)
    return null
  }
}


export { auth, signInWithGoogle, logout ,BasicLogin }
export default app