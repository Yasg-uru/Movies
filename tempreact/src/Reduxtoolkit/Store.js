import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Authslice.js";
export const store=configureStore({
    reducer:{
        auth:AuthReducer
    }
    
})