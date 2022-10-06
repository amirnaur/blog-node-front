import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import instance from "../../api/api";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
    const { data } = await instance.get("posts");
    return data; 
})
export const fetchTags = createAsyncThunk("tags/fetchTags", async () => {
    const { data } = await instance.get("tags");
    return data; 
})
const initialState = {
    posts: {
        items: [],
        status: 'loading'
    },
    tags: {
        items: [],
        status: 'loading'
    },
     
}

const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducer: {},
    extraReducers: {
        [fetchPosts.pending]: (state) => {
            state.posts.status = "loading";
            state.posts.items = [];
        },
        [fetchPosts.fulfilled]: (state, action) => {
            state.posts.status = "loaded";
            state.posts.items = action.payload;
        },
        [fetchPosts.rejected]: (state) => {
            state.posts.status = "error";
            state.posts.items = []
        },
        [fetchTags.pending]: (state) => {
            state.tags.status = "loading";
            state.tags.items = [];
        },
        [fetchTags.fulfilled]: (state, action) => {
            state.tags.status = "loaded";
            state.tags.items = action.payload;
        },
        [fetchTags.rejected]: (state) => {
            state.tags.status = "error";
            state.tags.items = []
        }
    }
})
export const postsReducer = postsSlice.reducer;