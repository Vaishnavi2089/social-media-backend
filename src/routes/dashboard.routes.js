import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middlewar.js";
import { getChannelStats } from "../controllers/dashboard.controller.js";

const router = Router()
router.use(verifyJWT)

router
    .route("/stats")
    .get(getChannelStats)

export default router