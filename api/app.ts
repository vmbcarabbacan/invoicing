
import express, { Request, Response } from "express"
import dotenv  from "dotenv"
import cors from "cors"
import corsOption from "./middleware/corsOption"
import cookieParser from "cookie-parser"
// import Product from "./models/products"
import routes from './routes/index'
// import { createServer } from "http"
// import mongoose from "mongoose"

dotenv.config()

const { NODE_PORT } = process.env

const app = express()
// const httpServer = createServer(app);

app.use(cors(corsOption))
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(cookieParser())

app.get('/', (req: Request, res: Response) => {
    res.send('Hello Node Api')
})

routes.map((x) => {
    app.use(x.location, x.dir);
  });

app.listen(NODE_PORT, () => {
    console.log(`Node Api app is running on port ${NODE_PORT}`)
})


