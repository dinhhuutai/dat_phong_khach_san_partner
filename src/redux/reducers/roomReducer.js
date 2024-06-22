import {createSlice} from '@reduxjs/toolkit';

const roomSlice = createSlice({
  name: 'room',
  initialState: {
    roomsData: [],
  },
  reducers: {
    addRoom: (state, action) => {
      state.roomsData = action.payload;
    },
  },
});

export const roomReducer = roomSlice.reducer;
export const {addRoom} = roomSlice.actions;

export const roomSelector = state => state.roomReducer.roomsData;
