import express from "express"
import { createLectureController } from "../controllers/lecture.controller.js"

const router  = express.Router()

router.route("/create/:courseId").post(createLectureController)


export default router