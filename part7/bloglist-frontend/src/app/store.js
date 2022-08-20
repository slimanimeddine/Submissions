import { configureStore } from '@reduxjs/toolkit'

import blogsReducer from '../slices/blogsSlice'

export default configureStore({
    reducer: {
        blogs: blogsReducer
    }
})