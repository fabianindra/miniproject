import express, { Application, Response, Request } from "express";
import bodyParser from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from 'cookie-parser';


import authRouter from "./routers/auth.router"
import userRouter from "./routers/user.router"
import eventRouter from "./routers/event.router"
import pointRouter from "./routers/point.router";
import verifyRouter from "./routers/verify.router";
import transactionRouter from "./routers/transaction.router";
import commentRouter from "./routers/comment.router";

dotenv.config()

const app: Application = express()

app.use(cors())
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true}))
app.use(bodyParser.json())

app.use("/api/auth", authRouter)
app.use("/api/users", userRouter)
app.use("/api/events", eventRouter)
app.use("/api/points", pointRouter)
app.use("/api/transaction", transactionRouter)
app.use("/api/verify-token", verifyRouter)
app.use("/api/comment", commentRouter)

const PORT = 6570

app.get("/", (req: Request, res: Response) => {
  res.send({
    message: "REST API running"
  })
})

app.listen(PORT, () => {
  console.log("application run on port : ", PORT)
})