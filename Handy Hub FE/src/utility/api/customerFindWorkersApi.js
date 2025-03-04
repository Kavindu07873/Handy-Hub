import { createSlice } from '@reduxjs/toolkit'
import * as workerService from '../../service/workerService'

// Async thunk to load workers
// export const fetchWorkers = createAsyncThunk(
//   'workers/getWorkers',
//   async ({ category, search, page, size }, { rejectWithValue }) => {
//     try {
//       console.log("Calling workerService.fetchWorkers...")
//       const response = await workerService.fetchWorkers(category, search, page, size)
//
//       console.log("API Response:", response)
//
//       return response || {}// ✅ Ensuring safe return
//     } catch (error) {
//       console.error("Error fetching workers:", error)
//       return rejectWithValue(error.response?.data || 'Error fetching workers')
//     }
//   }
// )

export const fetchWorkers = async (page, size) => {
  let workers = []
  await workerService.fetchWorkers(page, size)
    .then(res => {
      console.log(res)
      if (res.success) {

        workers = res.body

      }
    })
  return workers
}


const workerSlice = createSlice({
  name: 'workers',
  initialState: {
    workers: [],
    totalWorkers: 0,
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchWorkers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchWorkers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.workers = action.payload?.content || [] // ✅ Ensure `content` exists
        state.totalWorkers = action.payload?.totalElements || 0
      })
      .addCase(fetchWorkers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})


export default workerSlice.reducer
