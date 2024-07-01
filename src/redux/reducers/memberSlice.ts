import { createSlice } from '@reduxjs/toolkit';
import { Members } from '../../app/types';

const initialState  = [
    {
        id: 1,
        name: "Himanshu"
    },
    {
        id: 26,
        name: "Rakesh"
    },
    {
        id: 3,
        name: "Martin"
    },
    {
        id: 4,
        name: "jone"
    }
] as Members[]

const memberSlice = createSlice({
    name: 'members',
    initialState,
    reducers: {}
})

export default memberSlice.reducer