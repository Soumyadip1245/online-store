import { createSlice } from "@reduxjs/toolkit"

const infoSlice = createSlice({
    name: "info",
    initialState: {
        info: null
    },
    reducers: {
       info: (state, action) => {
        state.info = action.payload
       }
    }
})

export const {info} = infoSlice.actions
export default infoSlice.reducer