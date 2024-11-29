import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createTag, deleteTag, getTags, updateTag } from "../controllers/tagController";

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
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "En cours"
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
router.get("/:projectId/tags", authenticate, getTags);

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
 *           type: integer
 *         description: ID du projet
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
 *                     type: integer
 *                     example: 1
 *                   name:
 *                     type: string
 *                     example: "En cours"
 *                   projectId:
 *                     type: integer
 *                     example: 101
 *       404:
 *         description: Projet introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project not found"
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
router.post("/:projectId/tag", authenticate, createTag);

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
 *           type: integer
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                   example: 1
 *                 name:
 *                   type: string
 *                   example: "En cours"
 *                 projectId:
 *                   type: integer
 *                   example: 101
 *       400:
 *         description: Données invalides.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Status name is required"
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
 */
router.put("/:projectId/tags/:tagsId", authenticate, updateTag);

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
 *           type: integer
 *         description: ID du projet
 *       - in: path
 *         name: statusesId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID du statut à supprimer
 *     responses:
 *       200:
 *         description: Statut supprimé avec succès.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Status deleted successfully"
 *       404:
 *         description: Statut ou projet introuvable.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Status or project not found"
 *       500:
 *         description: Erreur serveur.
 */
router.delete("/:projectId/tags/:tagsId", authenticate, deleteTag);

export default router;
