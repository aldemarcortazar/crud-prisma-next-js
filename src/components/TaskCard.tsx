'use client';
import {  useRouter } from "next/navigation";
import { Task } from "@/app/interfaces/tasks"

interface TaskCardProps{
    task: Task
}

const TaskCard: React.FunctionComponent<TaskCardProps> = ({ task }) => {
    const router = useRouter();

    const redirectToForm = () => {
        router.push('/tasks/edit/' + task.id)
    }

  return (
    <div 
        onClick={ redirectToForm }
        className='bg-slate-900 p-3 hover:bg-slate-800 hover:cursor-pointer'
    >
        <h3 className='font-bold text-2xl mb-2'>{ task.title }</h3>
        <p> { task.description } </p>
        <h2> { `${ new Date( task?.createdAt || '' ).toLocaleDateString()} `} </h2>
    </div>
  )
}

export default TaskCard;
