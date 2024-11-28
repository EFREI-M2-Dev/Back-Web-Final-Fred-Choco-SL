import { Router } from "express";
import { authenticate } from "../middlewares/authMiddleware";
import {createStatus, deleteStatus, getStatuses, updateStatus, getAllStatuses} from "../controllers/statusController";

const router = Router();

// Routes pour les statuts

router.get("/statuses", getAllStatuses);

// pour la suite
router.get("/:projectId/statuses", getStatuses);
router.post("/:projectId/status", authenticate, createStatus);
router.put("/:projectId/statuses/:statusesId", authenticate, updateStatus);
router.delete("/:projectId/statuses/:statusesId", authenticate, deleteStatus);

export default router;

