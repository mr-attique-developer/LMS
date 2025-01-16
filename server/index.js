import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import "dotenv/config"
import { connectDB } from "./db/connectDB.js"
import userRoutes from "./routes/user.routes.js"

const app = express()


app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use("/api/v1/auth", userRoutes)


app.get("/", (req, res) => {
    res.send("Hello World form backend")
})

connectDB()

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})