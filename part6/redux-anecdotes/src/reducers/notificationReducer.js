import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        setNotification (state, action) {
            return action.payload
        },
        removeNotification (state, action) {
            return ''
        }
    }
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const displayNotification = (notification, time) => {
    return async dispatch => {
        dispatch(setNotification(notification))
        setTimeout(() => {
            dispatch(removeNotification(undefined))
        }, time * 1000)
    }
} 
export default notificationSlice.reducer