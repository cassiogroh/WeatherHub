import { Router } from 'express';

import HomeController from '../controllers/HomeController';

const homeRouter = Router();
const homeController = new HomeController();

homeRouter.get('/', homeController.index)

export default homeRouter;