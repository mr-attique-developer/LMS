import express from "express"
import { createLectureController, getListOfLecturesController } from "../controllers/lecture.controller.js"

const router  = express.Router()

router.route("/create/:courseId").post(createLectureController)
router.route("/get/:courseId").get(getListOfLecturesController)


export default router