import { NextResponse } from "next/server";
import { prismaClient } from '@/libs/prisma';


export const GET = async  ( request: Request,  { params } ) => {
    const { id } = params;
    const task = await prismaClient.task.findUnique({
        where: {
            id: Number(id) || 1,
        }
    })
    return NextResponse.json(task);
}

export const PUT = async ( request: Request,  { params } ) => {
    const dataUpdated = await request.json();
    const { id } = params;
    const updatedDataResponse = await prismaClient.task.update({
        where: {
            id: Number(id) || 1,
        },
        data: dataUpdated,
    });
    return NextResponse.json({ message: 'tarea actualizada con exito.', task: updatedDataResponse })
}

export const DELETE = async ( request: Request,  { params } ) => {
    try {
        const { id } = params;
        const taskRemoved = prismaClient.task.delete({
            where: {
                id: Number(id),
            }
        });
        return NextResponse.json({ message: `tarea eliminada`, taskRemoved })
        
    } catch (error) {
        return NextResponse.json({ errorMessage: error.message});
    }
    
}