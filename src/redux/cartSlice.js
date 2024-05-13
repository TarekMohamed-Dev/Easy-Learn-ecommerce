import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  products:[]
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
      addToCart: (state , action) => {
        const productId = state.products.find(item => item.id === action.payload.id)
          !productId && state.products.push(action.payload)
    },
      removeFromCart: (state,action) => {
        const idToRemove = action.payload.id;
    state.products = state.products.filter(item => item.id !== idToRemove);
      },
      reset:(state ) => {
        state.products =[]
      }
  },
})

export const { addToCart , removeFromCart , reset } = cartSlice.actions

export default cartSlice.reducer