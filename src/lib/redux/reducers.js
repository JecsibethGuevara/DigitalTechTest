import { createSlice } from '@reduxjs/toolkit';

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'all',
  reducers:{
    setFilter: (state, action) => action.payload,
    clearFilter: () => null
  }
})

  
export const { setFilter, clearFilter } = filterSlice.actions;
export  const filterReducer = filterSlice.reducer