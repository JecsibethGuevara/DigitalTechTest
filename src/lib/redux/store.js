import { configureStore } from '@reduxjs/toolkit';
import {filterReducer} from '@/lib/redux/reducers.js';


const store = configureStore({
    reducer: {
      filter: filterReducer
      // Add more reducers here if needed
    },
  });

export default store;