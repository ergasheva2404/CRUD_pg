import { Router } from "express";
import { bookController } from "../controllers/index.js";

const router = Router();

router.post("/", bookController.create);
router.get("/available", bookController.getAvailable);
router.get("/", bookController.getAll);
router.get("/:id", bookController.getOne);
router.put("/:id", bookController.update);
router.delete("/:id", bookController.remove);

export default router;