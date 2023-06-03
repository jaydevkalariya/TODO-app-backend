import mongoose from "mongoose";

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   },
  sharedusers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
   }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  deadline:{
    type:Date,
    required:true,
  }
});

export const Task = mongoose.model("Task", schema);
