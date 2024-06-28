import { createSlice } from '@reduxjs/toolkit';
import { Priority, Status, TaskState } from '../../app/types';


const initialState: TaskState[] = [
    {   title: "react task",
        taskId: 1,
        status: Status.inProgress,
        members: [{id:1, name: "himanshu"}],
        dueDate: new Date(),
        isAssigned: true,
        estimatedHour: 2,
        priority: Priority.high
    },
    {   title: "react task2",
        taskId: 2,
        status: Status.completed,
        members: [{id:1, name: "himanshu"},{id:2, name: "Rocky"}],
        dueDate: new Date(),
        isAssigned: true,
        estimatedHour: 2,
        priority: Priority.low
    },
    {   title: "react task3",
        taskId: 3,
        status: Status.unInitiated,
        members: [{id:1, name: "himanshu"}],
        dueDate: new Date(),
        isAssigned: true,
        estimatedHour: 2,
        priority: Priority.medium
    }
]

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {}
})

export default taskSlice.reducer