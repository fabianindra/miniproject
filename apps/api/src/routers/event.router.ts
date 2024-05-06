import { Router } from "express"
import * as eventController from "../controllers/event.controller"
import { adminGuard, verifyToken } from "../middleware/auth.middleware"

const eventRouter = Router()

eventRouter.get("/", eventController.getAllEvents)
eventRouter.post("/", eventController.createEvents)

export default eventRouter