import ApiService from './apiHandler'
import Cookies from "js-cookie"
import config from "@src/constants/storage"
import { userRoles } from "@src/constants/Constants"

export async function requestToken(formData) {
  const apiObject = {}
  apiObject.method = 'POST'
  apiObject.authentication = false
  apiObject.isAdminBasicAuth = true
  apiObject.msAuthentication = true
  apiObject.urlEncoded = true
  apiObject.endpoint = 'oauth/token'
  // apiObject.msToken = msToken
  apiObject.state = 'login'
  apiObject.body = formData
  return await ApiService.callApi(apiObject)
}

export async function renewToken(token) {
  const apiObject = {}
  apiObject.method = 'POST'
  apiObject.authentication = false
  apiObject.isAdminBasicAuth = (Cookies.get(config.userRole) === userRoles[0] || Cookies.get(config.userRole) === userRoles[1] || Cookies.get(config.userRole) === userRoles[2])
  apiObject.isBasicAuth = localStorage.getItem(config.userRole) === userRoles[3]
  apiObject.urlEncoded = true
  apiObject.endpoint = 'oauth/token'
  apiObject.body = token
  apiObject.state = "renewToken"
  return await ApiService.callApi(apiObject)
}