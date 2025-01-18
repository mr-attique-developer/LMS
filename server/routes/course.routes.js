
import express from "express"
import isAthenicated from "../middlewares/user.middleware.js"
import { createCourseController } from "../controllers/course.controller.js"

const router = express.Router()
router.route("/create").post(isAthenicated,createCourseController)


export default router