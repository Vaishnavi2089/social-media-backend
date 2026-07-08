import { Router } from "express";
import { createPlaylist, getPlaylistById, getUserPlaylists , addVideoToPlaylist} from "../controllers/playlist.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router()
router.use(verifyJWT)

router
    .route("/")
    .post(createPlaylist)

router
    .route("/user/:userId")
    .get(getUserPlaylists)

router
    .route("/:playlistId")
    .get(getPlaylistById)

router
    .route("/:playlistId/add/:videoId")
    .patch(addVideoToPlaylist)
export default router

