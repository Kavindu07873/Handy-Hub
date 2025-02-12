// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
// Import Firebase SDK
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"
import axios from "axios"
import { loginWithOAuth} from "@configs/AuthConfig"

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

// const BasicLogin = async () => {
//   try {
//     let username
//     let password
//     const response = await axios.post(`${API_URL  }token` ,{username,password})
//     localStorage.setItem("token", response.data.token)
//     console.log("User Logged In: ", response.data)
//     return response.data
//   } catch (error) {
//     console.error("Google Sign-In Error: ", error)
//     return null
//   }
// }
// Function for Google Login
const signInWithGoogle = async () => {
  try {
    
    const result = await signInWithPopup(auth, googleProvider)
    console.log("User Info:", result.user)
    console.log("User email:", result.user.email)
    console.log("User uid:", result.user.uid)

    const username = result.user.email
     const password = result.user.uid
    console.log("User Password:", password)
    console.log("User Email:", username)
    // Correctly structured object
    // const response = await axios.post(`${API_URL  }token`, {username,password})
    const response = await loginWithOAuth(username, password)

    // localStorage.setItem("token", response.data.token)
    console.log("User Logged In:", response)
    return response
  } catch (error) {
    console.error("Google Sign-In Error:", error)
    return null
  }
  // try {
  //   const result = await signInWithPopup(auth, googleProvider)
  //   const idToken = await result.user.getIdToken() // Get Firebase ID token
  //
  //   console.log("User Info:", result.user)
  //   console.log("Google ID Token:", idToken)
  //
  //   // Send the Google ID token to the backend
  //   const response = await axios.post(API_URL + "token", {
  //     token: idToken.
  //   })
  //
  //   localStorage.setItem("token", response.data.token)
  //   console.log("User Logged In:", response.data)
  //   return response.data
  // } catch (error) {
  //   console.error("Google Sign-In Error:", error)
  //   return null
  // }
}


export { auth, signInWithGoogle }
export default app