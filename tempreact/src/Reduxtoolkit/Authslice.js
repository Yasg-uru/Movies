// import { createSlice } from "@reduxjs/toolkit";
// const initialState = {
//   user: null,
//   isAuthenticated: false,
// };
// const Authslice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     loginsuccess: (state, action) => {
//       (state.user = action.payload), (state.isAuthenticated = true);
//     },
//     logout: (state, action) => {
//       (state.user = null), (state.isAuthenticated = false);
//     },
//   },
// });
// export const { loginsuccess, logout } = Authslice.actions;
// export const selectAuth = (state) => state.auth;
// export default Authslice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState, // Corrected variable name
  reducers: {
    loginsuccess: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state, action) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { loginsuccess, logout } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;
