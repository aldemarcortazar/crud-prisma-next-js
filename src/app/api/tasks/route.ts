import { NextResponse } from "next/server";
import { prismaClient } from '@/libs/prisma';

export const GET = async () => {
    const tasksDB =  await prismaClient.task.findMany();
    console.log('pase por acaaa');
    console.log('server server', tasksDB);
    return NextResponse.json({
        ok: true,
        tasks: tasksDB,
    });
}

export const POST = async (request: Request) => {

    const { title, description  } = await request.json();
    if( !title || !description ){
        return NextResponse.json({
            status: '400'
        });
    }
    const responseCreated = await prismaClient.task.create({
        data: {
            title,
            description
        }
    })

    return NextResponse.json({ newTask: responseCreated });
}