import { configureStore } from '@reduxjs/toolkit';
import phoneReducer from './reducers/phoneReducer';
import addressReducer from './reducers/addressReducer';

const store = configureStore({
  reducer: {
    phone: phoneReducer,
    addresses: addressReducer,
  },
});

export default store;