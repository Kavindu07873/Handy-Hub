import axios from "axios"

const API_URL = "http://localhost:8080/v1/oauth/token"

export const loginWithOAuth = async (username, password) => {
  const params = new URLSearchParams()
  params.append("username", username)
  params.append("password", password)
  params.append("grant_type", "password")

  try {
    const response = await axios.post(API_URL, params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: "Basic Y2V5ZW50cmE6Y2V5ZW50cmE=" // Base64 encoded client_id:client_secret
      }
    })

    console.log("Access Token:", response.data.access_token)
    localStorage.setItem("token", response.data.access_token)
    return response.data
  } catch (error) {
    console.error("OAuth Login Error:", error.response ? error.response.data : error)
    return null
  }
}


export const getTokenData = () => {
  const token = localStorage.getItem("token")
  if (!token) return null // Return null if no token

  try {
    const payload = token.split(".")[1] // Extract payload (Base64)
    const decodedPayload = JSON.parse(atob(payload))// Decode Base64
    return decodedPayload // Return decoded object
  } catch (error) {
    console.error("Invalid token:", error)
    return null
  }
}

export const getUserRole = () => {
  const tokenData = getTokenData()
  console.log("userRole authorities " ,tokenData?.authorities?.[0])
  return tokenData?.authorities?.[0] || "GUEST" // Default role: GUEST
}

export const logout = (navigate) => {
  localStorage.removeItem("token") // Clear token
  navigate("/login")// Redirect to login page
}

