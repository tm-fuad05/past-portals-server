import express from "express";
import { JwtController } from "../controllers/jwt.controller.js";

const router = express.Router();

router.post("/jwt", JwtController.tokenCreate);
router.post("/logout", JwtController.tokenRemove);

export const JwtRouter = router;
