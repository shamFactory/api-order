import express from "express";
import { verifyKey } from '../middlewares/validations.middleware';
import WebhookController from '../controllers/webhook.controller';

const router = express.Router();

const controller = new WebhookController();
router.get("/", controller.index);
router.post("/", controller.post);

export default router;