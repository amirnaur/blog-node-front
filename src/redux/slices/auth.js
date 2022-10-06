import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/api";

export const fetchAuth = createAsyncThunk("auth/fetchAuth", async (params) => {
    const { data } = await instance.post("auth/login", params);
    return data; 
})

const initialState = {
        data: null,
        status: "loading"     
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data=null;
        }
    },
    extraReducers: {
        [fetchAuth.pending]: (state) => {
            state.status = "loading";
            state.data = null;
        },
        [fetchAuth.fulfilled]: (state, action) => {
            state.status = "loaded";
            state.data = action.payload;
        },
        [fetchAuth.rejected]: (state) => {
            state.status = "error";
            state.data = null;
        },
    }
});
export const authStatus = (state) => !!state.auth.data
export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;

