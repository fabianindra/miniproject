import { Router } from "express";
import * as transactionController from "../controllers/transaction.controller"

const transactionRouter = Router()

transactionRouter.post("/", transactionController.buyTicket)

export default transactionRouter