import express from "express";
import { tokenCreate, tokenRemove } from "../controllers/jwt.controllers.js";

const router = express.Router();

router.post("/jwt", tokenCreate);
router.post("/logout", tokenRemove);

export default router;
