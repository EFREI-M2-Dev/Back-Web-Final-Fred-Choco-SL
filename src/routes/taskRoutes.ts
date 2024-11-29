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
 *                     type: string
 *                     example: "1"
 *                   name:
 *                     type: string
 *                     example: "Tâche 1"
 *                   status:
 *                     type: string
 *                     example: "En cours"
 *       401:
 *         description: Non authentifié.
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
 *               dueDate:
 *                 type: string
 *                 format: date
 *                 example: "2023-12-31"
 *     responses:
 *       201:
 *         description: Tâche créée avec succès.
 *       401:
 *         description: Non authentifié.
 */
router.post("/:projectId/task", authenticate, createTask);

/**
 * @swagger
 * /api/{projectId}/tasks/{taskID}:
 *   put:
 *     summary: Mettre à jour une tâche
 *     description: Modifie les détails d'une tâche spécifique.
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
 *               status:
 *                 type: string
 *                 example: "Terminé"
 *     responses:
 *       200:
 *         description: Tâche mise à jour avec succès.
 *       404:
 *         description: Tâche ou projet introuvable.
 *       401:
 *         description: Non authentifié.
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
 *       404:
 *         description: Tâche ou projet introuvable.
 *       401:
 *         description: Non authentifié.
 */
router.delete("/:projectId/tasks/:taskID", authenticate, deleteTask);

/**
 * @swagger
 * /api/{projectId}/tasks/{taskID}:
 *   get:
 *     summary: Récupérer une tâche par ID
 *     description: Renvoie les détails d'une tâche spécifique par son ID.
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
 *       404:
 *         description: Tâche ou projet introuvable.
 *       401:
 *         description: Non authentifié.
 */
router.get("/:projectId/tasks/:taskID", authenticate, getTaskById);

export default router;
