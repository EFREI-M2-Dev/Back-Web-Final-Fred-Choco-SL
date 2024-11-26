import { Request, Response } from "express";
import {
    getTasksByProjectId,
    createTask as addTask,
    updateTask as modifyTask,
    deleteTask as removeTask,
    getTask,
} from "../services/taskService";

export const getProjectTasks = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;

        const tasks = await getTasksByProjectId(Number(projectId));
        res.status(200).json(tasks);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;
        const { name, description, statusId } = req.body;

        const task = await addTask(Number(projectId), name, description, statusId);
        res.status(201).json(task);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskID } = req.params;
        const { name, description, statusId } = req.body;

        const task = await modifyTask(Number(taskID), name, description, statusId);
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteTask = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskID } = req.params;

        await removeTask(Number(taskID));
        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getTaskById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { taskID } = req.params;

        const task = await getTask(Number(taskID));
        res.status(200).json(task);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
