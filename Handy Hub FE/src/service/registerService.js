import { toast } from "react-toastify"
import ApiService from "@src/service/ApiService";

export const registerUserService = async (obj) => {
  console.log("Calling registerUserService")

  const token = localStorage.getItem("token")
  console.log(token)
  const apiObject = {
    method: "POST",
    endpoint: "register", // Correct endpoint for user registration
    body: obj,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }

  try {
    console.log("ApiService.callApi(apiObject)")
    const response = await ApiService.callApi(apiObject)
    if (response.success) {
      console.log("User Registered:", obj.username)
      toast.success(response.msg, { position: "top-right" })
    } else {
      toast.error(response.msg, { position: "top-right" })
    }
    return response.success
  } catch (error) {
    toast.error("Something went wrong. Please try again!", {
      position: "top-right",
    })
    return false
  }
}