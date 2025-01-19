import express from "express"
import { createLectureController } from "../controllers/lecture.controller.js"

const router  = express.Router()

router.route("/:courseId/create").post(createLectureController)


export default router