//create course schema and model
import mongoose from "mongoose";

const courseSchema = new mongoose.Schema({
    name: String,
    price: Number,
    buyers: Number,
  });

export const Course = mongoose.model('Course', courseSchema);