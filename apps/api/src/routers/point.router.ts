import { Router } from "express";
import * as pointController from "../controllers/point.controller"

const pointRouter = Router()

pointRouter.get("/:id", pointController.fetchRowByIdAndCount)
pointRouter.post("/submit_rupiah", pointController.inputRupiah)

export default pointRouter