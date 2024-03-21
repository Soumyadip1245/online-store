import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        user: null,
        isStaff: false,
        roles: [],
        isFace: false,
        staffMobile: null,
        staffEmail: null
    },
    reducers: {
        login: (state,action) =>{
            state.status = true;
            state.user = action.payload;
            state.isStaff = action.payload
            state.roles = action.payload
            state.isFace = action.payload
            state.staffName = action.payload
            state.staffMobile = action.payload
        },
        logout: (state)=>{
            state.status = false
            state.user = null
            state.isStaff = false
            state.roles = []
            state.isFace = false
            state.staffName = null
            state.staffMobile = null
        }
    }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer