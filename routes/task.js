import express from "express";
import {
  deleteTask,
  getMyTask,
  newTask,
  updateTask,
  shareTask,
  getSharedTask
} from "../controllers/task.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", isAuthenticated, newTask);

router.post("/share/:id", isAuthenticated, shareTask);

router.get("/my", isAuthenticated, getMyTask);

router.get("/sharedtasks", isAuthenticated, getSharedTask);

router
  .route("/:id")
  .put(isAuthenticated, updateTask)
  .delete(isAuthenticated, deleteTask);

export default router;
