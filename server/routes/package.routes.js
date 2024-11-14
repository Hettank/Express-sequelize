import express from "express"
import packageController from "../controller/package.controller.js"

const router = express.Router()

router.get("/", packageController.getPackages)
router.post("/", packageController.createPackage)
router.post("/update-package/:packageId", packageController.updatePackage)
router.post("/buy-package", packageController.buyPackage)

export default router