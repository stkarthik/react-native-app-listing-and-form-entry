import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'addresses',
  initialState: [],
  reducers: {
    addAddress: (state, action) => {
      state.push(action.payload);
    },
    deleteAddress: (state, action) => {
      return state.filter((address) => address.id !== action.payload);
    },
    updateAddress: (state, action) => {
      const index = state.findIndex((address) => address.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
  },
});

export const { addAddress, deleteAddress, updateAddress } = addressSlice.actions;
export default addressSlice.reducer;