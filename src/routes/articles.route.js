import express from "express";
import { verifyKey } from '../middlewares/validations.middleware';
import ArticlesController from '../controllers/articles.controller';

const router = express.Router();

const controller = new ArticlesController();
router.get("/", controller.index);
router.get('/:id', verifyKey, controller.detail);

export default router;