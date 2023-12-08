import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    name:String,
    phone:String,
    password:String,
    email:String
});

export const admin = mongoose.model("admin", adminSchema)