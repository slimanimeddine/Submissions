import {
    createSlice,
    createAsyncThunk,
    createEntityAdapter
} from '@reduxjs/toolkit'

import blogService from '../services/blogs'

const blogsAdapter = createEntityAdapter({
    sortComparer: (a, b) => a.likes - b.likes
})

const initialState = blogsAdapter.getInitialState({
    status: 'idle',
    error: null
})

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', blogService.getAll)

export const addNewBlog = createAsyncThunk('blogs/addNewBlog', async initialBlog => {
    await blogService.create(initialBlog)
})

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (id, initialBlog) => {
    await blogService.update(id, initialBlog)
})

export const removeBlog = createAsyncThunk('blogs/removeBlog', async id => {
    await blogService.remove(id)
})

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers (builder) {
        builder
            .addCase(fetchBlogs.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(fetchBlogs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                blogsAdapter.upsertMany(state, action.payload)
            })
            .addCase(fetchBlogs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
            })
            .addCase(addNewBlog.fulfilled, blogsAdapter.addOne)
            .addCase(updateBlog.fulfilled, (state, action) => {
                blogsAdapter.updateOne(state, action.payload)
            })
            .addCase(removeBlog.fulfilled, blogsAdapter.removeOne)
    }
})

export default blogsSlice.reducer

export const {
    selectAll: selectAllBlogs,
    selectById: selectBlogById,
    selectIds: selectBlogIds
} = blogsAdapter.getSelectors(state => state.blogs)