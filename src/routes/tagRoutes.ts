import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import { createTag, deleteTag, getTags, updateTag } from "../controllers/tagController";

const router = Router();

/**
 * @swagger
 * /api/{projectId}/tags:
 *   get:
 *     summary: Récupérer les tags d'un projet
 *     description: Renvoie une liste des tags associés à un projet spécifique.
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
 *         description: Liste des tags récupérée avec succès.
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
 *                     example: "Urgent"
 *       401:
 *         description: Non authentifié.
 */
router.get("/:projectId/tags", authenticate, getTags);

/**
 * @swagger
 * /api/{projectId}/tag:
 *   post:
 *     summary: Créer un tag pour un projet
 *     description: Ajoute un nouveau tag à un projet spécifique.
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
 *                 example: "Important"
 *     responses:
 *       201:
 *         description: Tag créé avec succès.
 *       401:
 *         description: Non authentifié.
 */
router.post("/:projectId/tag", authenticate, createTag);

/**
 * @swagger
 * /api/{projectId}/tags/{tagsId}:
 *   put:
 *     summary: Mettre à jour un tag d'un projet
 *     description: Modifie les détails d'un tag spécifique associé à un projet.
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
 *         name: tagsId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du tag à mettre à jour
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Très important"
 *     responses:
 *       200:
 *         description: Tag mis à jour avec succès.
 *       404:
 *         description: Tag ou projet introuvable.
 *       401:
 *         description: Non authentifié.
 */
router.put("/:projectId/tags/:tagsId", authenticate, updateTag);

/**
 * @swagger
 * /api/{projectId}/tags/{tagsId}:
 *   delete:
 *     summary: Supprimer un tag d'un projet
 *     description: Supprime un tag spécifique associé à un projet.
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
 *         name: tagsId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID du tag à supprimer
 *     responses:
 *       200:
 *         description: Tag supprimé avec succès.
 *       404:
 *         description: Tag ou projet introuvable.
 *       401:
 *         description: Non authentifié.
 */
router.delete("/:projectId/tags/:tagsId", authenticate, deleteTag);

export default router;
