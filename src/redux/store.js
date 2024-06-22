import {configureStore} from '@reduxjs/toolkit';
import {authReducer} from './reducers/authReducer';
import {roomReducer} from './reducers/roomReducer';

const store = configureStore({
  reducer: {
    authReducer,
    roomReducer,
  },
});

export default store;
