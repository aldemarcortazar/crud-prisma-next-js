
export interface TasksResponse {
    ok: true;
    task: Task[] ;
}



export interface Task{
    id?: number;
    title: string;
    description: string;
    createdAt?: string;
 }