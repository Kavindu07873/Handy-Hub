// ** Redux Imports
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

// ** Axios Imports
import axios from 'axios'

// export const getProducts = createAsyncThunk('appEcommerce/getProducts', async params => {
//   const response = await axios.get('/apps/ecommerce/products', { params })
//   return { params, data: response.data }
// })

export const getProducts = createAsyncThunk('ecommerce/getProducts', async (params, { rejectWithValue }) => {
  try {
    const response = await axios.get('http://localhost:8080/worker/all', { params })  // Replace with actual API URL
    return {params , data:response.data}
  } catch (error) {
    return rejectWithValue(error.response.data)
  }
})
console.log("getProducts  : ",getProducts().length)

export const addToCart = createAsyncThunk('appEcommerce/addToCart', async (id, { dispatch, getState }) => {
  const response = await axios.post('/apps/ecommerce/cart', { productId: id })
  await dispatch(getProducts(getState().ecommerce.params))
  return response.data
})

export const getWishlistItems = createAsyncThunk('appEcommerce/getWishlistItems', async () => {
  const response = await axios.get('/apps/ecommerce/wishlist')
  return response.data
})

export const deleteWishlistItem = createAsyncThunk('appEcommerce/deleteWishlistItem', async (id, { dispatch }) => {
  const response = await axios.delete(`/apps/ecommerce/wishlist/${id}`)
  dispatch(getWishlistItems())
  return response.data
})

export const getCartItems = createAsyncThunk('appEcommerce/getCartItems', async () => {
  const response = await axios.get('/apps/ecommerce/cart')
  return response.data
})

export const getProduct = createAsyncThunk('appEcommerce/getProduct', async slug => {
  const response = await axios.get(`/apps/ecommerce/products/${slug}`)
  return response.data
})

export const addToWishlist = createAsyncThunk('appEcommerce/addToWishlist', async id => {
  await axios.post('/apps/ecommerce/wishlist', { productId: id })
  return id
})

export const deleteCartItem = createAsyncThunk('appEcommerce/deleteCartItem', async (id, { dispatch }) => {
  await axios.delete(`/apps/ecommerce/cart/${id}`)
  dispatch(getCartItems())
  return id
})

export const appEcommerceSlice = createSlice({
  name: 'appEcommerce',
  initialState: {
    cart: [],
    params: {},
    products: [],
    wishlist: [],
    totalProducts: 0,
    productDetail: {}
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getProducts.fulfilled, (state, action) => {
        state.status = 'succeeded'

        if (action.payload.success) {
          state.products = action.payload.body.content // Extract products array
          state.totalProducts = action.payload.body.totalElements // Extract total number of products
        } else {
          state.products = []
          state.totalProducts = 0
        }
      })

      .addCase(getWishlistItems.fulfilled, (state, action) => {
        state.wishlist = action.payload.products
      })
      .addCase(getCartItems.fulfilled, (state, action) => {
        state.cart = action.payload.products
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.productDetail = action.payload.product
      })
  }
})

export default appEcommerceSlice.reducer
