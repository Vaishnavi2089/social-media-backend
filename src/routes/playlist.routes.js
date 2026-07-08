import { Router } from "express";
import { createPlaylist, getUserPlaylists } from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)

router
    .route("/")
    .post(createPlaylist)

router
    .route("/user/:userId")
    .get(getUserPlaylists)

export default router

