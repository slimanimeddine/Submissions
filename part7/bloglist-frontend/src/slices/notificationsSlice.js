import {
    createSlice,
    createEntityAdapter
} from '@reduxjs/toolkit'

const notificationsAdapter = createEntityAdapter()

const initialState = notificationsAdapter.getInitialState()


const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {},
})

export default notificationsSlice.reducer

export const {
    selectAll: selectAllNotifications,
    selectById: selectNotificationById,
    selectIds: selectNotificationIds
} = notificationsAdapter.getSelectors(state => state.notifications)