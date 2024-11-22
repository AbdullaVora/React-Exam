import { configureStore } from '@reduxjs/toolkit';
import PostSlice from '../redux/PostSlice.js';

const store = configureStore({
    reducer: {
        posts: PostSlice,
    },

});

export default store;