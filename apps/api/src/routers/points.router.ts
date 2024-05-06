import { Router } from "express";
import * as pointsController from "./../controllers/points.controller"

const pointsRouter = Router()

pointsRouter.get("/", pointsController.fetchRowByIdAndCount)

export default pointsRouter