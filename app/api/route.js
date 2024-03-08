import connectToDB from "@/lib/db";
import { Todo } from "@/lib/model";

export async function GET() {
    try {
        connectToDB();
        const todos = await Todo.find();
        return Response.json(todos);
    } catch (error) {
        console.log(error)
        throw new Error('error request')
    }
}

export async function POST(request) {
    const { title, type, status, detail } = await request.json()
    try {
        connectToDB();
        const newTodo = new Todo({
            title, 
            type, 
            status, 
            detail
        })
        await newTodo.save()
        return Response.json({message:'success'});
    } catch (error) {
        console.log(error)
        throw new Error('error request')
    }
}