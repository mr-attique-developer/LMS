
import express from "express"
import isAthenicated from "../middlewares/user.middleware.js"
import { createCourseController, getCreaterCoursesController, updateCreaterCourseController } from "../controllers/course.controller.js"
import multerUpload from "../utils/multer.js"
const router = express.Router()
router.route("/create").post(isAthenicated,createCourseController)
router.route("/get").get(isAthenicated , getCreaterCoursesController)
router.route("/update/:courseId").put(isAthenicated ,multerUpload.single("courseThumbnail"), updateCreaterCourseController)


export default router