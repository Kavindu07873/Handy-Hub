import ApiService from "@src/service/ApiService";

export async function fetchCustomers(page = 1, size = 10) {
    const apiObject = {
        method: "GET",
        authentication: true,
        endpoint: `customer/all?page=${page}&size=${size}`
    }

    try {
        return await ApiService.callApi(apiObject)
    } catch (error) {
        console.error("fetchCustomers API Error:", error)
        throw error
    }
}
