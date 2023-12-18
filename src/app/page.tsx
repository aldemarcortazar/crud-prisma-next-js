import Image from 'next/image';
import { Task, TasksResponse } from './interfaces/tasks';
import TaskCard from '@/components/TaskCard';
import { Suspense } from 'react';
import Loading from '@/components/Loading';

async function loadTasks(): Promise<TasksResponse>{
  const response: Response = await fetch('http://localhost:3000/api/tasks'); 
  const tasksParsed: TasksResponse = await response.json();
  console.log('task Server interface: ', tasksParsed);
  return tasksParsed;
}

async function HomePage() {

  const { task } = await loadTasks();
  return (
    <section>
      <div className='grid grid-cols-3 gap-3 mt-10'>
        {
          task.map(( task: Task ) => (
            <Suspense key={ task.id } fallback={<Loading />}>
              <TaskCard 
                task={task} 
              />

            </Suspense>
            
          ))
        } 
      </div>
    </section>
  )
}

export default HomePage;