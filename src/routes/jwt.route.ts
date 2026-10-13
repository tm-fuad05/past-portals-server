import express from "express";
import { tokenCreate, tokenRemove } from "../controllers/jwt.controller.js";

const router = express.Router();

router.post("/jwt", tokenCreate);
router.post("/logout", tokenRemove);

export const JwtRouter = router;
