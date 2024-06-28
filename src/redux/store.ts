import { configureStore } from "@reduxjs/toolkit";
import memberReducer from "./reducers/memberSlice";
import taskReducer from "./reducers/taskSlice";


export const store = configureStore({
    reducer: {
        members: memberReducer,
        tasks : taskReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;