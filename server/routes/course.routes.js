
import express from "express"
import isAthenicated from "../middlewares/user.middleware.js"
import { createCourseController, getCreaterCoursesController } from "../controllers/course.controller.js"

const router = express.Router()
router.route("/create").post(isAthenicated,createCourseController)
router.route("/get").get(isAthenicated , getCreaterCoursesController)


export default router