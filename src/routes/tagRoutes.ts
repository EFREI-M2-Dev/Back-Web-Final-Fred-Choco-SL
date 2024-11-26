import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {createTag, deleteTag, getTags, updateTag} from "../controllers/tagController";

const router = Router();

// Routes pour les tags
router.get("/:projectId/tags", authenticate, getTags);
router.post("/:projectId/tag", authenticate, createTag);
router.put("/:projectId/tags/:tagsId", authenticate, updateTag);
router.delete("/:projectId/tags/:tagsId", authenticate, deleteTag);

export default router;



