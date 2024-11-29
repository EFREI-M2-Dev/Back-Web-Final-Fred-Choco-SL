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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project created successfully"
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "12345"
 *                     name:
 *                       type: string
 *                       example: "Nouveau Projet"
 *                     description:
 *                       type: string
 *                       example: "Description du projet"
 *                     userId:
 *                       type: string
 *                       example: "67890"
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
 *         description: Utilisateur non authentifié.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project updated successfully"
 *                 project:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     name:
 *                       type: string
 *                       example: "Projet mis à jour"
 *                     description:
 *                       type: string
 *                       example: "Nouvelle description"
 *       400:
 *         description: Requête invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Name and description are required"
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
 *       401:
 *         description: Utilisateur non authentifié.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project deleted successfully"
 *       400:
 *         description: ID du projet invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid project ID is required"
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
 *       401:
 *         description: Utilisateur non authentifié.
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
 *                     example: "Mon projet"
 *                   description:
 *                     type: string
 *                     example: "Description du projet"
 *                   userId:
 *                     type: integer
 *                     example: 123
 *       400:
 *         description: ID utilisateur invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid user ID is required"
 *       404:
 *         description: Aucun projet trouvé pour cet utilisateur.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error
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
 *                   example: "Projet Exemple"
 *                 description:
 *                   type: string
 *                   example: "Description du projet exemple"
 *                 userId:
 *                   type: integer
 *                   example: 123
 *       400:
 *         description: ID du projet invalide.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Valid project ID is required"
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
 *       401:
 *         description: Utilisateur non authentifié.
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
router.get("/projects/:projectId", authenticate, getProjectById);

export default router;
