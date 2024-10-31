import { combineReducers } from "@reduxjs/toolkit";
import authReducer from "../slices/authSlice.js";
import profileReducer from "../slices/profileSlice.js";
import itemReducer from "../slices/itemSlice.js";
import cartReducer from "../slices/cartSlice.js"


const rootReducer = combineReducers({

        auth: authReducer,
        profile: profileReducer,
        item: itemReducer,
        cart: cartReducer,


});

export default rootReducer;
