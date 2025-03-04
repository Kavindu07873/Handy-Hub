import axios from 'axios'
import ApiService from "@src/service/ApiService"

const API_URL = 'http://localhost:8080/workers/all'

// export const fetchWorkers = async (category = '', search = '', page = 1, size = 10) => {
//   try {
//     console.log(`Fetching workers with: category=${category}, search=${search}, page=${page}, size=${size}`)
//     const response = await axios.get(API_URL, { params: { category, search, page, size } })
//
//     console.log("API Response:", response.data)
//
//     if (!response || !response.data) {
//       throw new Error("API returned an invalid response")
//     }
//
//     return response.data // ✅ Corrected to return `response.data`
//   } catch (error) {
//     console.error('Error fetching workers:', error)
//     throw error
//   }
// }


export async function fetchWorkers(page = 1, size = 10) {
  const apiObject = {
    method: "GET",
    authentication: true,
    endpoint: `worker/all?page=${page}&size=${size}`
  }

  try {
    return await ApiService.callApi(apiObject)
  } catch (error) {
    console.error("fetchWorkers API Error:", error)
    throw error;
  }
}
