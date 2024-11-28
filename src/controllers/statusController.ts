import { Request, Response } from "express";
import {
    getStatusesByProjectId,
    getAllStatuses as readAllStatuses,
    createStatus as addStatus,
    updateStatus as modifyStatus,
    deleteStatus as removeStatus,
} from "../services/statusService";


export const getAllStatuses = async (req: Request, res: Response): Promise<void> => {
    try {
        const statuses = await readAllStatuses();
        res.status(200).json(statuses);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
}

export const getStatuses = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;

        const statuses = await getStatusesByProjectId(Number(projectId));
        res.status(200).json(statuses);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const createStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;
        const { name } = req.body;

        const status = await addStatus(Number(projectId), name);
        res.status(201).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId, statusesId } = req.params;
        const { name } = req.body;

        const status = await modifyStatus(Number(projectId), Number(statusesId), name);
        res.status(200).json(status);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId, statusesId } = req.params;

        await removeStatus(Number(projectId), Number(statusesId));
        res.status(200).json({ message: "Status deleted successfully" });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};
