import { requireAuth } from "@clerk/express"
import express from "express"
import { syncUser } from "../controllers/user.controller"

   

const router = express.Router()


router.post("/sync", requireAuth, syncUser)




export default router