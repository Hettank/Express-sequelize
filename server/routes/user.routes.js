import express from "express"
import userController from "../controller/user.controller.js"
import upload from "../fileUpload/multerStorage.js"

const router = express.Router()

router.get("/", userController.getUsers)
router.post("/", upload.single("cover"), userController.createUser)
router.put("/updateUser/:userID", upload.single("cover"), userController.updateUser)
router.delete("/deleteUser/:userID", userController.deleteUser)

export default router