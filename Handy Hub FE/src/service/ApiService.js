class ApiService {
  static async callApi({ method, endpoint, body = null, headers = {} }) {
    const apiUrl = `http://localhost:8080/user/${endpoint}`
    console.log("Calling API:", apiUrl, method)

    // Default headers
    const defaultHeaders = {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers
    }

    const options = {
      method,
      headers: defaultHeaders
    }

    // Only attach body if method is not GET
    if (body && method !== "GET") {
      options.body = JSON.stringify(body)
    }

    try {
      const response = await fetch(apiUrl, options)

      // Check for response errors
      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`API Error ${response.status}: ${errorText}`)
      }

      return await response.json()
    } catch (error) {
      console.error("API Call Failed:", error.message)
      throw error
    }
  }
}

export default ApiService
