import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createProject, deleteProject, getUserProjects, updateProject, getProjectById } from "../controllers/projectController";

const router = Router();

/**
 * @swagger
 * /api/project:
 *   post:
 *     summary: Créer un projet
 *     description: Crée un nouveau projet pour l'utilisateur authentifié.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouveau Projet"
 *               description:
 *                 type: string
 *                 example: "Description du projet"
 *     responses:
 *       201:
 *         description: Projet créé avec succès.
 *       401:
 *         description: Utilisateur non authentifié.
 */
router.post("/project", authenticate, createProject);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   put:
 *     summary: Mettre à jour un projet
 *     description: Met à jour les détails d'un projet spécifique.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Projet mis à jour"
 *               description:
 *                 type: string
 *                 example: "Nouvelle description"
 *     responses:
 *       200:
 *         description: Projet mis à jour avec succès.
 *       404:
 *         description: Projet introuvable.
 *       401:
 *         description: Utilisateur non authentifié.
 */
router.put("/projects/:projectId", authenticate, updateProject);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   delete:
 *     summary: Supprimer un projet
 *     description: Supprime un projet spécifique de l'utilisateur.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet à supprimer
 *     responses:
 *       200:
 *         description: Projet supprimé avec succès.
 *       404:
 *         description: Projet introuvable.
 *       401:
 *         description: Utilisateur non authentifié.
 */
router.delete("/projects/:projectId", authenticate, deleteProject);

/**
 * @swagger
 * /api/{userId}/projects:
 *   get:
 *     summary: Récupérer les projets d'un utilisateur
 *     description: Renvoie tous les projets appartenant à un utilisateur spécifique.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de l'utilisateur
 *     responses:
 *       200:
 *         description: Liste des projets récupérée avec succès.
 *       404:
 *         description: Utilisateur ou projets introuvables.
 *       401:
 *         description: Utilisateur non authentifié.
 */
router.get("/:userId/projects", authenticate, getUserProjects);

/**
 * @swagger
 * /api/projects/{projectId}:
 *   get:
 *     summary: Récupérer un projet par ID
 *     description: Récupère les détails d'un projet spécifique par son ID.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet à récupérer
 *     responses:
 *       200:
 *         description: Projet récupéré avec succès.
 *       404:
 *         description: Projet introuvable.
 *       401:
 *         description: Utilisateur non authentifié.
 */
router.get("/projects/:projectId", authenticate, getProjectById);

export default router;
