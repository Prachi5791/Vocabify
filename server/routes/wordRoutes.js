import express from "express";
import { fetchWordDetails } from "../controllers/wordcontroller.js"; // Ensure the correct path

const router = express.Router();

router.get("/:word", fetchWordDetails);

export default router;
