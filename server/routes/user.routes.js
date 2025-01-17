import express  from "express"
import { getUserProfile, login, logout, register } from "../controllers/user.controller.js"
import isAthenicated from "../middlewares/user.middleware.js"

const router = express.Router()
router.route("/register").post(register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile").get(isAthenicated,getUserProfile)


export default router