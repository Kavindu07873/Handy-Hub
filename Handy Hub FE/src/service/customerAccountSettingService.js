export async function getAllCustomerDetails(customerId) {
  const apiObject = {}
  apiObject.method = "GET"
  apiObject.authentication = true
  apiObject.endpoint = `customer/${customerId}`
  // apiObject.body = obj;
  return await ApiService.callApi(apiObject)
}