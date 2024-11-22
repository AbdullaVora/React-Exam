import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from '../api/apiInstance';

const initialState = {
    posts: [],
    loading: false,
    error: null,
};

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async (_, { rejectWithValue }) => {
        try {
            const { data } = await apiInstance.get('/posts');
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (postData, { rejectWithValue }) => {
        try {
            const { data } = await apiInstance.post('/posts', postData);
            return data;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const postSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Handle fetchPosts
            .addCase(fetchPosts.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchPosts.fulfilled, (state, action) => {
                state.loading = false;
                state.posts = action.payload;
            })
            .addCase(fetchPosts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Handle createPost
            .addCase(createPost.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.loading = false;
                state.posts.push(action.payload);
            })
            .addCase(createPost.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // Add former reducer logic as builder cases
            .addCase('posts/setPosts', (state, action) => {
                state.posts = action.payload;
            })
            .addCase('posts/addPost', (state, action) => {
                state.posts.push(action.payload);
            })
            .addCase('posts/updatePost', (state, action) => {
                const index = state.posts.findIndex(post => post.id === action.payload.id);
                if (index !== -1) {
                    state.posts[index] = action.payload;
                }
            })
            .addCase('posts/deletePost', (state, action) => {
                state.posts = state.posts.filter(post => post.id !== action.payload);
            })
            .addCase('posts/setLoading', (state, action) => {
                state.loading = action.payload;
            })
            .addCase('posts/setError', (state, action) => {
                state.error = action.payload;
            });
    },
});

// Export actions
export const setPosts = (payload) => ({ type: 'posts/setPosts', payload });
export const addPost = (payload) => ({ type: 'posts/addPost', payload });
export const updatePost = (payload) => ({ type: 'posts/updatePost', payload });
export const deletePost = (payload) => ({ type: 'posts/deletePost', payload });
export const setLoading = (payload) => ({ type: 'posts/setLoading', payload });
export const setError = (payload) => ({ type: 'posts/setError', payload });

// Export reducer
export default postSlice.reducer;
