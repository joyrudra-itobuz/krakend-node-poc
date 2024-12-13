import express from "express";
import PublicController from "../controller/public.controller.js";

const router = express.Router();
const publicController = new PublicController();

router.get("/users", publicController.getPublicData);

export default router;
