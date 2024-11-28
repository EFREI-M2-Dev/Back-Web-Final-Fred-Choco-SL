import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {createTask, deleteTask, getProjectTasks, getTaskById, updateTask} from "../controllers/taskController";

const router = Router();

// Routes pour les tâches
router.get("/:projectId/tasks", authenticate, getProjectTasks);
router.post("/:projectId/task", authenticate, createTask);

router.put("/:projectId/tasks/:taskID", authenticate, updateTask);
router.delete("/:projectId/tasks/:taskID", authenticate, deleteTask);
router.get("/:projectId/tasks/:taskID", authenticate, getTaskById);

export default router;
