import { Router } from "express";
import peopleController from "../controller/peopleController";


const peopleRouter = Router();

peopleRouter.get('/:key', peopleController.searchPeople);

export default peopleRouter;