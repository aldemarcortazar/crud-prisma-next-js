'use client';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { NewTask } from '../interfaces/state';
import { useRouter } from 'next/navigation';
import { Task } from '../interfaces/tasks';
import { helpHttp } from '../helpers/helpHttp';

const initialData: NewTask = {
  title: '',
  description: ''
}

const NewTaskPage = ({ params }) => {
  const router = useRouter();
  const [ task, setTask ] = useState<Task>(initialData);

  const handleChange = ( e: ChangeEvent<HTMLInputElement| HTMLTextAreaElement> ) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    })
  }

  const handleDelete =  async () => {
    const confirmDelete: boolean = confirm('deseas eliminar: ');
    if( !confirmDelete ) return;
    const response: Response = await fetch(`/api/tasks/${params.id}`);
    router.refresh();
    router.push('/');
  }

  useEffect(() => {
    if( params.id ){
      const getTaskById = async () => {
        const response = await fetch(`/api/tasks/${params.id}`)
        const dataParsed: Task = await response.json();
        setTask(dataParsed);
      }
      getTaskById();
    }
  }, []);

  const handleSubmit = async ( e: FormEvent ) => {
    e.preventDefault();
    const headers = {
      "Content-Type": "application/json",
    };

    if( !Object.keys( task ).includes('id') ){
      const createdPost = await helpHttp( `/api/tasks`, {
        method: 'POST',
        body: JSON.stringify({ title: task?.title,  description: task.description }),
        headers,
      });
      router.refresh();
      router.push('/');
      return;
    }
    
    const updated = await helpHttp( `/api/tasks/${ task.id }`, {
      method: 'PUT',
      body: JSON.stringify({ title: task?.title,  description: task.description }),
      headers,
    });
    router.refresh();
    router.push('/');
  }

  return (
    <div className='h-screen flex flex-column justify-center items-center'>
        <form  
          className=' bg-slate-800 p-10 w-1/2 lg:w-1/4'
          onSubmit={ handleSubmit }
        >
          <label htmlFor="title" className='font-bold text-sm'>
            Titulo de la tarea
          </label>
          <input 
            type="text" 
            name="title" 
            id="title"
            onChange={ handleChange }
            value={ task.title }
            className='border-gray-400 p-5 mb-4 w-full text-black'
            placeholder='Escribe el titulo de la tarea aca ....' 
          />

          <label 
            htmlFor="description" 
            className='font-bold text-sm '
          >
            Titulo de la tarea
          </label>
          <textarea 
            id='description'
            name='description'
            className='border-gray-400 p-5 mb-4 w-full text-black '  
            rows={3}
            placeholder='describe tu tarea'
            onChange={ handleChange }
            value={ task.description }
          ></textarea>

  
          <div className='flex justify-between'>
            <button
              className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
            >
              Agregar
            </button>

            {
              task.id && (
                <button
                   onClick={ handleDelete } 
                  className='bg-red-500 hover:bg-red-300 hover:cursor-pointer rounded py-2 px-4 '
                >
                  Delete
                </button>
              )
            }
          </div>
          
        </form>
    </div>
  )
}

export default NewTaskPage;
