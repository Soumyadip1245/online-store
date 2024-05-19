import { createSlice } from "@reduxjs/toolkit"

const storeSlice = createSlice({
    name: "store",
    initialState: {
        user: null,
        storeId: null
    },
    reducers: {
        storeLogin: (state,action) =>{
            state.user = action.payload;
            state.storeId = action.storeId
        },
        storeLogout: (state)=>{
            state.user = null
            state.storeId = null
        }
    }
})

export const {storeLogin,storeLogout} = storeSlice.actions
export default storeSlice.reducer