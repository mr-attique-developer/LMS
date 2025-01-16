import {createSlice} from "@reduxjs/toolkit"


const initialState={
    user: null,
    isAuthticated: false,
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
        isLoggedIn: (state, action) => {
            state.user = action.payload.user
            state.isAuthticated = true
        },
        isLoggedOut: (state) => {
            state.user = null
            state.isAuthticated = false
        }
    }

})

export const {isLoggedIn, isLoggedOut} = authSlice.actions
export default authSlice.reducer

