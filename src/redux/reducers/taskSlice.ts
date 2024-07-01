import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskState } from '../../app/types';

interface AllTasksData {
    alltask: TaskState[]
  }


const initialState: AllTasksData = {
    alltask :[
    
]}

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<any>) => {
            state.alltask.push(action.payload)
         },
        
        removeTask: (state, action: PayloadAction<number>) => {
            state.alltask = state.alltask.filter(task => task.taskId !== action.payload)
        },

        editSelectTask: (state, action: PayloadAction<any>) => {
            state.alltask = state.alltask.map((item) => item.taskId === action.payload.taskId ? action.payload : item)
        }
        
    }
})


export const {addTask, removeTask, editSelectTask } = taskSlice.actions;
export default taskSlice.reducer