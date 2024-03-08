import mongoose from "mongoose";

const connection = {}

export default async function connectToDB() {
    try {
        if (connection.isConnected) {
            console.log("Using existing connection");
            return;
        } else {
            const conn = await mongoose.connect(process.env.MONGO_URI)
            connection.isConnected = conn.connections[0].readyState;
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}