import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {
    createStatus,
    deleteStatus,
    getStatuses,
    updateStatus,
    getAllStatuses,
} from "../controllers/statusController";

const router = Router();

/**
 * @swagger
 * /api/statuses:
 *   get:
 *     summary: Récupérer tous les statuts
 *     description: Renvoie une liste de tous les statuts disponibles.
 *     responses:
 *       200:
 *         description: Liste des statuts récupérée avec succès.
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
 *                     example: "En cours"
 */
router.get("/statuses", getAllStatuses);

/**
 * @swagger
 * /api/{projectId}/statuses:
 *   get:
 *     summary: Récupérer les statuts d'un projet
 *     description: Renvoie une liste des statuts associés à un projet spécifique.
 *     parameters:
 *       - in: path
 *         name: projectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du projet
 *     responses:
 *       200:
 *         description: Liste des statuts récupérée avec succès.
 *       404:
 *         description: Projet introuvable.
 */
router.get("/:projectId/statuses", getStatuses);

/**
 * @swagger
 * /api/{projectId}/status:
 *   post:
 *     summary: Créer un statut pour un projet
 *     description: Ajoute un nouveau statut à un projet spécifique.
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
 *                 example: "En cours"
 *     responses:
 *       201:
 *         description: Statut créé avec succès.
 *       401:
 *         description: Non authentifié.
 */
router.post("/:projectId/status", authenticate, createStatus);

/**
 * @swagger
 * /api/{projectId}/statuses/{statusesId}:
 *   put:
 *     summary: Mettre à jour un statut d'un projet
 *     description: Modifie les détails d'un statut spécifique associé à un projet.
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
 *         name: statusesId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du statut à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Terminé"
 *     responses:
 *       200:
 *         description: Statut mis à jour avec succès.
 *       404:
 *         description: Statut ou projet introuvable.
 *       401:
 *         description: Non authentifié.
 */
router.put("/:projectId/statuses/:statusesId", authenticate, updateStatus);

/**
 * @swagger
 * /api/{projectId}/statuses/{statusesId}:
 *   delete:
 *     summary: Supprimer un statut d'un projet
 *     description: Supprime un statut spécifique associé à un projet.
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
 *         name: statusesId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du statut à supprimer
 *     responses:
 *       200:
 *         description: Statut supprimé avec succès.
 *       404:
 *         description: Statut ou projet introuvable.
 *       401:
 *         description: Non authentifié.
 */
router.delete("/:projectId/statuses/:statusesId", authenticate, deleteStatus);

export default router;
