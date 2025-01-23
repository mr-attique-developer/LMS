import express from "express"
import isAthenicated from "../middlewares/user.middleware.js"
import { createCheckoutSession, stripeWebhook } from "../controllers/coursePurchase.controller.js"

const router = express.Router()


router.route("/checkout/create-checkout-session").post(isAthenicated, createCheckoutSession)
router.route("/webhook").post(express.raw({type: "application/json"}), stripeWebhook)


export default router