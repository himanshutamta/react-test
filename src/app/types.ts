export interface Members {
    id: number;
    name: string;
}

export interface TaskState {
    title: string;
    taskId: number;
    status: Status;
    members: Members[];
    dueDate: Date;
    isAssigned: boolean;
    estimatedHour: number;
    priority: Priority;
}

export enum Status {
    inProgress,
    unInitiated,
    completed
}

export enum Priority  {
    low,
    medium,
    high
}