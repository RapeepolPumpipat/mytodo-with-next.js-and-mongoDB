import connectToDB from "@/lib/db";
import { Todo } from "@/lib/model";

export async function GET(request, { params }) {
    try {
        connectToDB();
        const { id } = params
        const todo = await Todo.findById(id)
        return Response.json(todo)
    } catch (error) {
        console.log(error)
        throw new Error('failed get')
    }
}

export async function DELETE(request, { params }) {
    try {
        connectToDB();
        const { id } = params
        await Todo.findByIdAndDelete(id)
        const data = await Todo.find()
        return Response.json(data)
    } catch (error) {
        console.log(error)
        throw new Error('failed delete')
    }
}

export async function PUT(request, { params }) {
    const { title, type, status, detail } = await request.json()
    const { id } = params
    try {
        connectToDB();
        const res = await Todo.findByIdAndUpdate(
            id,
            { title, type, status, detail },
            { new: true }
        )
        return Response.json({message:res});
    } catch (error) {
        console.log(error)
        throw new Error('error request')
    }
}