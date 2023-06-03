import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";
import { User } from "../models/user.js";

import nodemailer from "nodemailer";

import cron from "node-cron";

export const newTask = async (req, res, next) => {
  try {
    const { title, description,deadline } = req.body;

    await Task.create({
      title,
      description,
      user: req.user,
      deadline,
    });

    res.status(201).json({
      success: true,
      message: "Task added Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMyTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ user: userid });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
     const {title,description,deadline}=req.body;
    if (!task) return next(new ErrorHandler("Task not found", 404));

    task.title = title;
    task.description=description;
    task.deadline=deadline;
    await task.save();

    res.status(200).json({
      success: true,
      message: "Task Updated!",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) return next(new ErrorHandler("Task not found", 404));
    await task.deleteOne();

    res.status(200).json({
      message: "Task Deleted!",
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const shareTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return next(new ErrorHandler("Task not found", 404));
    
    const {email}=req.body;
   
    const user=  await User.findOne({email:email});
     if(!User) return next(new ErrorHandler("User not found, 404"));
     
    task.sharedusers.push(user);
    await task.save();

    res.status(200).json({
      message: `Task Shared to ${email} succesfully`,
      success: true,
    });
  } catch (error) {
    next(error);
  }
};

export const getSharedTask = async (req, res, next) => {
  try {
    const userid = req.user._id;

    const tasks = await Task.find({ sharedusers: userid });
    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};


