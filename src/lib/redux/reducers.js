import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all',
  reducers:{
    setFilter: (state, action) => action.payload,
    clearFilter: () => null
  }
})
const userSlice = createSlice({
  name: 'user',
  initialState: [],
  reducers:{
    setUser: (state, action) => action.payload,
    clearUser: () => null
  }
})

  
export const { setFilter, clearFilter } = filterSlice.actions;
export  const filterReducer = filterSlice.reducer
export const { setUser, clearUser } = userSlice.actions;
export  const userReducer = userSlice.reducer