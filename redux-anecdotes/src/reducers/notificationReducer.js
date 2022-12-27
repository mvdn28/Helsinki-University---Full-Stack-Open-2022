import { createSlice } from '@reduxjs/toolkit'

const initialState = {notification:'test',display:'none'}
const notificationSlice = createSlice({
    name:'notification',
    initialState,
    reducers:{
        showNotification(state,action) {
            const notification = `You voted '${action.payload}'`
            return {notification,display:'block'}
        },
        hideNotification(state,action) {
            return {notification:'',display:'none'}
        }
    }
})

export const { showNotification,hideNotification } = notificationSlice.actions
export default notificationSlice.reducer