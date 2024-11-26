import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {createStatus, deleteStatus, getStatuses, updateStatus} from "../controllers/statusController";

const router = Router();

// Routes pour les statuts
router.get("/:projectId/statuses", authenticate, getStatuses);
router.post("/:projectId/status", authenticate, createStatus);
router.put("/:projectId/statuses/:statusesId", authenticate, updateStatus);
router.delete("/:projectId/statuses/:statusesId", authenticate, deleteStatus);

export default router;

