import { Router } from "express";
import { createPlaylist, getPlaylistById, getUserPlaylists , addVideoToPlaylist,removeVideoFromPlaylist, updatePlaylist, deletePlaylist} from "../controllers/playlist.controller.js";
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
    .delete(deletePlaylist)

router
    .route("/:playlistId/add/:videoId")
    .patch(addVideoToPlaylist)
    .delete(removeVideoFromPlaylist)


export default router

