import express from "express";
import IndexController from '../controllers/index.controller';
import articleRouter from './articles.route';
import webhookRouter from './webhook.route';
const router = express.Router();

const controller = new IndexController();
router.get("/", controller.index);

router.use('/articles', articleRouter);
router.use('/webhook', webhookRouter);

export default router;