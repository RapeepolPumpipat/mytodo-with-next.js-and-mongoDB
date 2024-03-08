import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    title:{type:String,require:true},
    type:{
        type:String,
        enum:['FIX BUG','STYLE','NEW FUNCTION','PERMISSION'],
        require:true
    },
    status:{
        type:String,
        enum:['Not Start','On Process','Done'],
        require:true
    },
    detail:{type:String},
},{timestamps:true})

export const Todo = mongoose.models?.Todo || mongoose.model("Todo", todoSchema);