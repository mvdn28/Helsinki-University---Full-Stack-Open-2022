import { createSlice } from "@reduxjs/toolkit";

const initialState = {value:''}

const filterSlice = createSlice({
    name:'filter',
    initialState,
    reducers:{
        filterAnecdote(state,action){
            return {value:action.payload}
        }
    }
})

export const { filterAnecdote } = filterSlice.actions
export default filterSlice.reducer