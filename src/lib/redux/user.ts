
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers: {
    setUser: (state, action: PayloadAction<any>) => action.payload,
    clearUser: (state) => [],
  },
});

export const { setUser, clearUser } = userSlice.actions;
export const userReducer = userSlice.reducer;