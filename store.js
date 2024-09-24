import { configureStore } from '@reduxjs/toolkit';
import addressesReducer from './addressesSlice';

export const store = configureStore({
  reducer: {
    addresses: addressesReducer,
  },
});