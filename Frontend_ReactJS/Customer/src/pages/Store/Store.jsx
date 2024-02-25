import { configureStore } from "@reduxjs/toolkit";

// get the slice for auth
import AuthSlice from "./AuthSlice";

// create a store with required reducers
const store = configureStore({
  reducer: {
    AuthSlice,
  },
});

export default store;
