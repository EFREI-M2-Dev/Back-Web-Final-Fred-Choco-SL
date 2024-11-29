import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
    createTask,
    deleteTask,
    getProjectTasks,
    getTaskById,
    updateTask,
} from "../controllers/taskController";

const router = Router();

/**
 * @swagger
 * /api/{projectId}/tasks:
 *   get:
 *     summary: Récupérer les tâches d'un projet
 *     description: Renvoie une liste de toutes les tâches associées à un projet spécifique.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Liste des tâches récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "Tâche 1"
 *                   description:
 *                     type: string
 *                     example: "Description de la tâche"
 *                   status:
 *                     type: string
 *                     example: "En cours"
 *                   projectId:
 *                     type: integer
 *                     example: 123
 *       400:
 *         description: ID de projet invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid project ID is required"
 *       404:
 *         description: Aucun projet ou tâche trouvé.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "No tasks found for this project"
 *       401:
 *         description: Non authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/:projectId/tasks", authenticate, getProjectTasks);

/**
 * @swagger
 * /api/{projectId}/task:
 *   post:
 *     summary: Créer une tâche pour un projet
 *     description: Ajoute une nouvelle tâche à un projet spécifique.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Nouvelle tâche"
 *               description:
 *                 type: string
 *                 example: "Description de la tâche"
 *               statusId:
 *                 type: integer
 *                 example: 1
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *     responses:
 *       201:
 *         description: Tâche créée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 name:
 *                   type: string
 *                   example: "Nouvelle tâche"
 *                 description:
 *                   type: string
 *                   example: "Description de la tâche"
 *                 statusId:
 *                   type: integer
 *                   example: 1
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2023-12-31"
 *                 projectId:
 *                   type: integer
 *                   example: 10
 *                 userId:
 *                   type: integer
 *                   example: 5
 *       400:
 *         description: Données invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and description are required"
 *       401:
 *         description: Non authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.post("/:projectId/task", authenticate, createTask);

/**
 * @swagger
 * /api/{projectId}/tasks/{taskID}:
 *   put:
 *     summary: Mettre à jour une tâche
 *     description: Modifie les détails d'une tâche spécifique associée à un projet.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *       - in: path
 *         name: taskID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Tâche mise à jour"
 *               description:
 *                 type: string
 *                 example: "Nouvelle description"
 *               statusId:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 name:
 *                   type: string
 *                   example: "Tâche mise à jour"
 *                 description:
 *                   type: string
 *                   example: "Nouvelle description"
 *                 statusId:
 *                   type: integer
 *                   example: 2
 *                 projectId:
 *                   type: integer
 *                   example: 10
 *       400:
 *         description: Données invalides ou ID incorrects.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid projectId and taskID are required"
 *       404:
 *         description: Tâche ou projet introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task or project not found"
 *       401:
 *         description: Non authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.put("/:projectId/tasks/:taskID", authenticate, updateTask);

/**
 * @swagger
 * /api/{projectId}/tasks/{taskID}:
 *   delete:
 *     summary: Supprimer une tâche
 *     description: Supprime une tâche spécifique associée à un projet.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *       - in: path
 *         name: taskID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche
 *     responses:
 *       200:
 *         description: Tâche supprimée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Task deleted successfully"
 *       400:
 *         description: Paramètres invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid projectId and taskID are required"
 *       404:
 *         description: Tâche ou projet introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task or project not found"
 *       401:
 *         description: Non authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.delete("/:projectId/tasks/:taskID", authenticate, deleteTask);

/**
 * @swagger
 * /api/{projectId}/tasks/{taskID}:
 *   get:
 *     summary: Récupérer une tâche par ID
 *     description: Renvoie les détails d'une tâche spécifique par son ID, associée à un projet.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *       - in: path
 *         name: taskID
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la tâche
 *     responses:
 *       200:
 *         description: Tâche récupérée avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 101
 *                 name:
 *                   type: string
 *                   example: "Tâche Exemple"
 *                 description:
 *                   type: string
 *                   example: "Description de la tâche exemple"
 *                 statusId:
 *                   type: integer
 *                   example: 1
 *                 projectId:
 *                   type: integer
 *                   example: 10
 *                 dueDate:
 *                   type: string
 *                   format: date
 *                   example: "2023-12-31"
 *       400:
 *         description: Paramètres invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid projectId and taskID are required"
 *       404:
 *         description: Tâche ou projet introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Task or project not found"
 *       401:
 *         description: Non authentifié.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Unauthorized"
 *       500:
 *         description: Erreur serveur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal Server Error"
 */
router.get("/:projectId/tasks/:taskID", authenticate, getTaskById);

export default router;
