import * as customerAcountSettingService from "../../service/customerAccountSettingService";


export const getAllCustomerDetails = async (customerId) => {
  let completedTasks = []
  await customerAcountSettingService.getAllCustomerDetails(customerId)
    .then(res => {
      if (res.success) {
        completedTasks = res.body
      }
    })
  return completedTasks
}