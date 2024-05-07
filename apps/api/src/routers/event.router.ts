import { Router } from "express"
import * as eventController from "../controllers/event.controller"

const eventRouter = Router()

eventRouter.get("/", eventController.getAllEvents)
eventRouter.get("/org", eventController.getOrgEvents)
eventRouter.post("/", eventController.createEvents)

export default eventRouter