import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import storeSlice from "./storeSlice";
import infoSlice from "./infoSlice";

const store = configureStore({
    reducer : {
        auth: authSlice,
        store: storeSlice,
        info: infoSlice
    }
})
export default store