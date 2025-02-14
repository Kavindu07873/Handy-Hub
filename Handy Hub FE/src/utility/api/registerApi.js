import { toast } from "react-toastify"
import * as registerService from '../../service/registerService'
// import * as registerService from "@src/utility/api/register";

export const registerUserService = async (obj) => {
  let result = false
  await registerService.registerUserService(obj)
    .then(res => {
      if (res.success) {
        console.log("registerUserService API ",obj.username)
        toast.success(res.msg, { icon: true, hideProgressBar: false })
      } else {
        toast.error(res.msg, { icon: true, hideProgressBar: false })
      }
      result = res.success
    })
    .catch(error => {
      toast.error("Something went wrong.Please try again!", { icon: true, hideProgressBar: false })
    })
  return result
}