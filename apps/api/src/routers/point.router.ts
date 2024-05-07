import { Router } from "express";
import * as pointController from "../controllers/point.controller"

const pointsRouter = Router()

pointsRouter.get("/:id", pointController.fetchRowByIdAndCount)

export default pointsRouter