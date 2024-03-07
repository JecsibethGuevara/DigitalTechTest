import { configureStore } from '@reduxjs/toolkit';
import {filterReducer} from '@/lib/redux/reducers.js';
import {userReducer} from '@/lib/redux/user.js';


const store = configureStore({
    reducer: {
      filter: filterReducer,
      user: userReducer
      // Add more reducers here if needed
    },
  });

export default store;