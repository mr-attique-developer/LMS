
import express from "express"
import isAthenicated from "../middlewares/user.middleware.js"
import { createCourseController, getCourseById, getCreaterCoursesController, togglePublishedCourseController, updateCreaterCourseController } from "../controllers/course.controller.js"
import multerUpload from "../utils/multer.js"
const router = express.Router()
router.route("/create").post(isAthenicated,createCourseController)
router.route("/get").get(isAthenicated , getCreaterCoursesController)
router.route("/update/:courseId").put(isAthenicated ,multerUpload.single("courseThumbnail"), updateCreaterCourseController)
router.route("/get/:courseId").get(isAthenicated, getCourseById)
router.route("/publishCourse/:courseId").put(isAthenicated, togglePublishedCourseController)


export default router