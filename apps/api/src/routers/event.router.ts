import { Router } from "express"
import * as eventController from "../controllers/event.controller"
import { adminGuard, verifyToken } from "../middleware/auth.middleware"

const eventRouter = Router()

eventRouter.get("/", eventController.getAllEvents)
eventRouter.get("/:id", verifyToken, eventController.getDetailEvents)
eventRouter.post("/", verifyToken, adminGuard, eventController.createEvents)

export default eventRouter