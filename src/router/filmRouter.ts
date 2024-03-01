import { Router } from "express";

import filmController from "../controller/filmController";

const filmRouter = Router();

filmRouter.get('/:key', filmController.searchFilms);
filmRouter.post('/migration', filmController.migrationFilms);

export default filmRouter;