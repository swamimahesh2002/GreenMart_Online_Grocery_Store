import { createSlice } from "@reduxjs/toolkit";

// create an auth slice to maintain the user signin status
const authSlice = createSlice({
  name: "auth",
  initialState: {
    // user is not logged in
    status: false,
  },
  reducers: {
    signin: (state, action) => {
      state.status = true;
      sessionStorage["token"] = action.payload["token"];
      sessionStorage["username"] = action.payload["name"];
      sessionStorage["id"] = action.payload["id"];
    },
    signout: (state, action) => {
      state.status = false;
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
      sessionStorage.removeItem("id");
    },
  },
});

// export the reducer for authSlice
export default authSlice.reducer;

// export the actions
export const { signin, signout } = authSlice.actions;
