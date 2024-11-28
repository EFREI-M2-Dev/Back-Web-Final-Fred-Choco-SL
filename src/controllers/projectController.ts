import { Request, Response } from "express";
import {
    getUserProjects as fetchProjects,
    getProjectById as fetchProjectById,
    createProject as addProject,
    updateProject as modifyProject,
    deleteProject as removeProject,
} from "../services/projectService";

export const getUserProjects = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraire et valider l'ID utilisateur
        const { userId } = req.params;
        const parsedUserId = Number(userId);

        if (!userId || isNaN(parsedUserId)) {
            res.status(400).json({ error: "Valid user ID is required" });
            return;
        }

        // Récupérer les projets
        const projects = await fetchProjects(parsedUserId);

        // Réponse avec les projets récupérés
        res.status(200).json(projects);
    } catch (error: any) {
        // Gestion des erreurs
        res.status(500).json({ error: error.message });
    }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, description } = req.body;

        // Récupérer l'utilisateur connecté via le middleware
        const userId = req.user?.id;

        if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
        }

        if (!name || !description) {
            res.status(400).json({ error: "Name and description are required" });
            return;
        }

        // Créer le projet pour l'utilisateur connecté
        const project = await addProject(name, description, userId);

        res.status(201).json({
            message: "Project created successfully",
            project,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;
        const { name, description } = req.body;

        if (!name || !description) {
            res.status(400).json({ error: "Name and description are required" });
            return;
        }

        const parsedProjectId = Number(projectId);

        if (isNaN(parsedProjectId)) {
            res.status(400).json({ error: "Valid project ID is required" });
            return;
        }

        const updatedProject = await modifyProject(parsedProjectId, name, description);

        res.status(200).json({
            message: "Project updated successfully",
            project: updatedProject,
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;

        const parsedProjectId = Number(projectId);

        if (isNaN(parsedProjectId)) {
            res.status(400).json({ error: "Valid project ID is required" });
            return;
        }

        await removeProject(parsedProjectId);

        res.status(200).json({
            message: "Project deleted successfully",
        });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

export const getProjectById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { projectId } = req.params;

        const parsedProjectId = Number(projectId);

        if (isNaN(parsedProjectId)) {
            res.status(400).json({ error: "Valid project ID is required" });
            return;
        }

        const project = await fetchProjectById(parsedProjectId);

        res.status(200).json(project);
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};