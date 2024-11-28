import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createProject, deleteProject, getUserProjects, updateProject, getProjectById } from "../controllers/projectController";

const router = Router();

// Route protégée : créer un projet
router.post("/project", authenticate, createProject);
router.put("/projects/:projectId", authenticate, updateProject);
router.delete("/projects/:projectId", authenticate, deleteProject);

// Route protégée : récupérer les projets de l'utilisateur
router.get("/:userId/projects", authenticate, getUserProjects);
router.get("/projects/:projectId", authenticate, getProjectById);

export default router;
