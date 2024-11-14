import express from "express"
import userRoutes from "./user.routes.js"
import packageRoutes from "./package.routes.js"
import authRoutes from "./auth.routes.js"

const router = express.Router()

router.use("/users", userRoutes)
router.use("/packages", packageRoutes)
router.use("/auth", authRoutes)

export default router