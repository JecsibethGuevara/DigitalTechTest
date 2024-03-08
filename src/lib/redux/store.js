import { configureStore } from '@reduxjs/toolkit';
import {filterReducer} from '@/lib/redux/reducers.js';
import {userReducer} from '@/lib/redux/user.js';
import {loadState, saveState} from "@/lib/localStorage/saveUser";

const persistedState = loadState();
const store = configureStore({
  reducer: {
    filter: filterReducer,
    user: userReducer,
    // Add more reducers here if needed
  },
  preloadedState: persistedState, // Set the preloaded state
});

// Subscribe to store changes and save state to localStorage
store.subscribe(() => {
  saveState(store.getState());
});

export default store;